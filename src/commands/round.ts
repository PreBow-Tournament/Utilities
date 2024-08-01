import { Command, parseOptions} from '../utils';
import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export const round: Command = {
    data: new SlashCommandBuilder()
        .setName('round')
        .setDescription('Announces the result of a game')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option => 
            option
                .setName('bracket')
                .setDescription('The bracket the round happened')
                .setChoices({
                    name: 'Winners',
                    value: 'W'
                }, {
                    name: 'Losers',
                    value: 'L'
                })
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('player1')
                .setDescription('The first player')
                .setRequired(true)
        )
        .addNumberOption(option =>
            option
                .setName('score1')
                .setDescription('The first player\'s scores')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('player2')
                .setDescription('The second player')
                .setRequired(true)
        )
        .addNumberOption(option =>
            option
                .setName('score2')
                .setDescription('The second player\'s scores')
                .setRequired(true)
        ),
    async execute(interaction) {
        const options = parseOptions(interaction);

        await interaction.channel.send(`[${options[0]}] **${options[1]}** ${options[2]}-${options[4]} **${options[3]}**`);
        await interaction.reply({ content: 'Successfully sent message.', ephemeral: true });
    }
};