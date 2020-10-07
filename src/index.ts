import './configEnv';
import Calendar from './services/calendar';
import { DateTime } from 'luxon';
import { updateChannelName } from './services/discord';

const calendar = new Calendar();

export const update = async (): Promise<void> => {
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

let intervalId: NodeJS.Timeout;

const reset = () => {
  if (intervalId) {
    clearInterval(intervalId);
  }

  const now = new Date();
  const interval = 60 * 1000;
  const delay = interval - (now.valueOf() % interval);

  const start = () => {
    update();
    intervalId = setInterval(update, interval);
  };

  setTimeout(start, delay);
};

setInterval(reset, 4 * 60 * 60 * 1000);

reset();
