export interface MoviesSearchDTO {
    title: string;
    genreId: number;
    inTheaters: boolean;
    upcomingReleases: boolean;
    page: number;
    recordsPerPage: number;
}