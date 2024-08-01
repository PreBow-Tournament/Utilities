import { Event } from '../utils';

export const messageCreate: Event<'messageCreate'> = {
    name: 'messageCreate',
    async execute(message) {
        if (message.content.startsWith('/say') && message.author.id === '1141186769035989045') {
            message.channel.send(message.content.replace('/say', ''));
        }
    }
};