// interfaz para el personaje

export interface Character {
    id?: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin?: object;
    location?: object;
    image: string;
    episode?: any[];
    url?: string;
    created: string;
    isFavorite : boolean,

}