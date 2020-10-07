import './configEnv';
import Calendar from './services/calendar';
import { DateTime } from 'luxon';
import { updateChannelName } from './services/discord';

const calendar = new Calendar();

const update = async () => {
  try {
    const now = DateTime.local();
    const nextEvent = await calendar.getNextEvent();
    if (!nextEvent) {
      await updateChannelName(process.env.DISCORD_CHANNEL_NAME as string);
      return;
    }

    if (nextEvent.start < now) {
      await updateChannelName(process.env.DISCORD_CHANNEL_NAME + ' (Meeting in progress)');
      return;
    }

    const diff = nextEvent.start.diffNow();

    if (diff.as('minutes') < 60) {
      await updateChannelName(
        process.env.DISCORD_CHANNEL_NAME +
          ' (Meeting at ' +
          nextEvent.start.setZone('Europe/London').toLocaleString(DateTime.TIME_24_SIMPLE) +
          ')',
      );
      return;
    }

    if (diff.as('minutes') > 60) {
      await updateChannelName(process.env.DISCORD_CHANNEL_NAME as string);
      return;
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};
update();
setInterval(update, 1 * 60 * 1000);
