import 'isomorphic-fetch';
import { AuthenticationProvider, Client } from '@microsoft/microsoft-graph-client';
import qs from 'querystring';

class InternalAuthenticationProvider implements AuthenticationProvider {
  public async getAccessToken() {
    const body = {
      client_id: process.env.MICROSOFT_CLIENT_ID,
      scope: 'https://graph.microsoft.com/.default',
      client_secret: process.env.MICROSOFT_CLIENT_SECRET,
      grant_type: 'client_credentials',
    };

    const rawRes = await fetch(
      `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}/oauth2/v2.0/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs.stringify(body),
      },
    );
    const response: { access_token: string } = await rawRes.json();
    return response.access_token;
  }
}

class Calendar {
  private readonly authProvider: InternalAuthenticationProvider;
  private readonly client: Client;

  public constructor() {
    this.authProvider = new InternalAuthenticationProvider();
    this.client = Client.initWithMiddleware({
      authProvider: this.authProvider,
    });
  }

  public async getCalendarEvents(): Promise<CalendarEventsResponse> {
    try {
      const events = await this.client.api(`/users/${process.env.MICROSOFT_PRINCIPLE_NAME}/calendar/events`).get();
      return events;
    } catch (error) {
      throw error;
    }
  }
}

export default Calendar;
