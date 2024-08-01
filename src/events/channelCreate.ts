import { Event } from '../utils';
import { TextChannel } from 'discord.js';

export const channelCreate: Event<'channelCreate'> = {
    name: 'channelCreate',
    execute(channel) {
        if (channel.parentId !== '1255673928479936512') return;
        (channel as TextChannel).send('@everyone \nUse this channel to discuss which maps to veto (you may veto up to two in total), and send screenshots of the games after they have been completed.');
    }
};