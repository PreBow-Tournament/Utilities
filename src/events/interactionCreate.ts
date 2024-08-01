import client from '..';
import { Event } from '../utils';

export const interactionCreate: Event<'interactionCreate'> = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if (!command) return console.error(`No command matching ${interaction.commandName} was found.`);

        if (command.data.dm_permission && !interaction.guild) return interaction.reply('This command cannot be ran in DMs!');

        try {
            command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
};