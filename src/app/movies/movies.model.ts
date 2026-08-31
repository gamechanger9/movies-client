import { ActorAutoCompleteDTO } from "../actors/actors.models"

export interface MoviesDTO {
    id: number,
    title: string,
    trailer: string,
    releaseDate: Date,
    poster?: string,
    genresIds?: number[],
    theatersIds?: number[]
}

export interface MoviesCreationDTO{
    title: string;
    trailer: string;
    releaseDate: Date;
    poster?: File;
    genresIds?: number[];
    theatersIds?: number[];
    actors?: ActorAutoCompleteDTO[];
}