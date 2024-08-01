import { Event } from '../utils';

export const ready: Event<'ready'> = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`${client.user.tag} now logged on!`);
    }
};