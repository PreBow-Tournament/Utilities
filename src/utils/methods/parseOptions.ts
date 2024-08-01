import { ChatInputCommandInteraction } from 'discord.js';

export function parseOptions(interaction: ChatInputCommandInteraction): (string | boolean | number | undefined)[] {
    return interaction.options.data.map(value => value.value);
}
