type CalendarEventsResponse = {
  value: Array<{
    subject: string;
    start: {
      dateTime: string;
      timeZone: string;
    };
    end: {
      dateTime: string;
      timeZone: string;
    };
  }>;
};
