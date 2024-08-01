import { Client, ClientEvents, Collection, GatewayIntentBits } from 'discord.js';
import { token } from '../bot-config.json';
import { Command, Event, BaseEvent, getCommands } from './utils';
import path from 'path';
import fs from 'fs';

class App extends Client {
    public commands: Collection<string, Command> = new Collection();
    public events: Collection<string, Event<keyof ClientEvents>> = new Collection();
    
    public init(): App {
        this.login(token);
        this.commands = getCommands();

        const eventsPath = path.join(__dirname, 'events');
        const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.ts'));

        for (const file of eventFiles) {
            const filePath = path.join(eventsPath, file);
            const event: BaseEvent | Array<BaseEvent> = require(filePath)[file.replace('.ts', '')];
            const run = (event: BaseEvent) => {
                if (event.once) {
                    this.once(event.name, (...args) => event.execute(...args));
                } else this.on(event.name, (...args) => event.execute(...args));
            };

            if (event instanceof Array) {
                for (const e of event) {
                    run(e);
                }
            } else run(event);
        }

        return this;
    }
}

const client = new App({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] }).init();
export default client;