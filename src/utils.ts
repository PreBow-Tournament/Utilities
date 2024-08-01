import { SlashCommandBuilder, SlashCommandOptionsOnlyBuilder, ChatInputCommandInteraction, Collection, RESTPostAPIApplicationCommandsJSONBody, ClientEvents } from 'discord.js';
import fs from 'fs';
import path from 'path';

interface Command {
    data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
    execute: (interaction: ChatInputCommandInteraction) => void;
}

interface BaseEvent {
    name: string;
    once?: boolean;
    execute: (...args: any[]) => void;
}

interface Event<ClientEvent extends keyof ClientEvents> extends BaseEvent {
    name: ClientEvent;
    execute: (...args: ClientEvents[ClientEvent]) => void;
}

function getCommands(slash: true): RESTPostAPIApplicationCommandsJSONBody[];
function getCommands(): Collection<string, Command>;
function getCommands(slash?: boolean): Collection<string, Command> | RESTPostAPIApplicationCommandsJSONBody[] {
    let results: Collection<string, Command> | RESTPostAPIApplicationCommandsJSONBody[];
    if (slash) {
        results = [];
    } else results = new Collection();

    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command: Command = require(filePath)[file.replace('.ts', '')];
        if ('data' in command && 'execute' in command) {
            if (slash) {
                (results as RESTPostAPIApplicationCommandsJSONBody[]).push(command.data.toJSON());
            } else (results as Collection<string, Command>).set(command.data.name, command);
        } else console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
    }

    return results;
}

function parseOptions(interaction: ChatInputCommandInteraction): (string | boolean | number | undefined)[] {
    return interaction.options.data.map(value => value.value);
}

export { Command, BaseEvent, Event, getCommands, parseOptions };