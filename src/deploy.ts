import { REST, Routes } from 'discord.js';
import { getCommands } from './utils';
import { token, clientId } from '../bot-config.json';

const slashCommands = getCommands(true);

(async () => {
    try {
        const rest = new REST().setToken(token);
        const data = await rest.put(
            Routes.applicationCommands(clientId),
            { body: slashCommands }
        );

        console.log(`Successfully reloaded ${(data as any).length} commands.`);
    } catch (err) {
        console.error(err);
    }
})();