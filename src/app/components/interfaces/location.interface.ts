import { Character } from "./character.interface";

export interface Location{
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: Character[];
    url: string;
    created: string;
    img?: string;
    
}