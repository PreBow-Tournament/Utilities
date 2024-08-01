import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { Command, parseOptions} from '../utils';
import { maps, rawMaps, Map, RawMap } from '../maps';

function capitalise(text: string): string {
    return text[0].toUpperCase() + text.slice(1);
}

function choose(array: Map[]): string {
    let rand = array[Math.floor(Math.random() * array.length)];
    if (Array.isArray(rand)) rand = rand[Math.floor(Math.random() * 2)];
    return rand;
}

interface Choice {
    name: string,
    value: RawMap
}

const choices: Choice[] = [];
for (const map of rawMaps) {
    choices.push({ name: capitalise(map), value: map });
}

export const map: Command = {
    data: new SlashCommandBuilder()
        .setName('map')
        .setDescription('Chooses a map.')
        .setDMPermission(false)
        .addStringOption(option =>
            option
                .setName('veto1')
                .setDescription('A map to veto')
                .setChoices(choices)
                .setRequired(false)
        )
        .addStringOption(option =>
            option
                .setName('veto2')
                .setDescription('A map to veto')
                .setChoices(choices)
                .setRequired(false)
        ),
    async execute(interaction) {
        const options = parseOptions(interaction);
        if (options.length > 0 && options[0] === options[1]) return await interaction.reply('Two of the same vetos have been provided.');

        const clone = maps.slice(0);
        for (const map of options) {
            let element = map as Map;
            if (!maps.includes(element)) element = clone.find(value => value.includes(element as RawMap)) ?? 'aquatica'; // will always be defined
            clone.splice(maps.indexOf(element), 1);
        }

        const choice = new EmbedBuilder()
            .addFields({
                name: 'You will play on:',
                value: capitalise(choose(clone))
            })
            .setColor('Red');

        if (options.length > 0) {
            choice.addFields({
                name: 'Vetoed maps:',
                value: options.map(capitalise).join(', ')
            });
        }

        await interaction.reply({ embeds: [choice] });
    }
};