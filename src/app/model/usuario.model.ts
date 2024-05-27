import { Character } from "../components/interfaces/character.interface";

export class Usuario {
    id: string | undefined;
    email: string | undefined;
    password: string | undefined;
    nombre : string | undefined;
    favoritos:  Character[] | undefined;
    puntuacionMax: number | undefined ;

}