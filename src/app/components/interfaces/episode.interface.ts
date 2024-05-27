import { Character } from "./character.interface";

export interface Episodes{
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: Character[];
    url: string;
    created: string;
}