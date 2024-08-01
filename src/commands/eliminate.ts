import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { Command, parseOptions } from '../utils';

export const eliminate: Command = {
    data: new SlashCommandBuilder()
        .setName('eliminate')
        .setDescription('Sends an elimination message')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false)
        .addStringOption(option => 
            option
                .setName('player')
                .setDescription('The player to eliminate')
                .setRequired(true)
        ),
    async execute(interaction) {
        if (interaction.channelId !== '1255698952184004711') return await interaction.reply({ content: 'This can only be ran in the #rounds channel.', ephemeral: true })

        await interaction.reply({ content: 'Message has been sent', ephemeral: true });
        await interaction.channel.send(`**${parseOptions(interaction)[0]}** has been eliminated!`);
    }
};
