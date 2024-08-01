import { ClientEvents } from 'discord.js';

export interface BaseEvent {
    name: string;
    once?: boolean;
    execute: (...args: any[]) => void;
}

export interface Event<ClientEvent extends keyof ClientEvents> extends BaseEvent {
    name: ClientEvent;
    execute: (...args: ClientEvents[ClientEvent]) => void;
}