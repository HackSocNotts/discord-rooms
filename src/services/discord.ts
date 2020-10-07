import { Client, ClientUser, VoiceChannel } from 'discord.js';

const client = new Client();

export const updateChannelName = async (newName: string): Promise<void> => {
  try {
    await client.login(process.env.DISCORD_BOT_TOKEN);
    const channel = (await client.channels.fetch(process.env.DISCORD_CHANNEL_ID as string)) as VoiceChannel;
    if (channel.type != 'voice') {
      throw new Error('Channel is not a voice channel');
    }

    if (channel.name === newName) {
      console.log('Channel name not set');
      return;
    }

    await channel.setName(newName);
    console.log('Channel name set to', newName);
    return;
  } catch (e) {
    throw e;
  }
};

client.on('ready', () => {
  console.log(`Logged in as ${(client.user as ClientUser).tag}!`);
});

client.on('rateLimit', (info) => {
  console.log(
    `Rate limit hit ${info.timeDifference ? info.timeDifference : info.timeout ? info.timeout : 'Unknown timeout '}`,
  );
});
