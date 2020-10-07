# Discord Rooms

![Build, Lint, and Test](https://github.com/HackSocNotts/discord-rooms/workflows/Build,%20Lint,%20and%20Test/badge.svg?event=push)
![License](https://img.shields.io/badge/license-MIT-green)

Discord Bot Microservice for updating discord voice channel names based on an outlook resource calendar.

## Required environment variables

```bash
# Bot token for Discord bot with manage channel permission
DISCORD_BOT_TOKEN=
# ID of the channel being edited/monitored
DISCORD_CHANNEL_ID=
# Name of channel
DISCORD_CHANNEL_NAME=
# Azure AD App Registration Client Secret
MICROSOFT_CLIENT_SECRET=
# Principle Name of Exchange User
MICROSOFT_PRINCIPLE_NAME=
# Azure AD Tenant ID
MICROSOFT_TENANT_ID=
# Azure AD App Registration Client ID
MICROSOFT_CLIENT_ID=
```

## Azure AD Configuration

App registration requires the `https://graph.microsoft.com/Calendars.Read` scope with Application access.

It is recommended you restrict app registration to a mail enabled security group that only has access to your resources. See: https://techcommunity.microsoft.com/t5/exchange-team-blog/scoping-microsoft-graph-application-permissions-to-specific/ba-p/671881

## Timezone

At the moment the bot will format times in 24hr time for `Europe/London`
