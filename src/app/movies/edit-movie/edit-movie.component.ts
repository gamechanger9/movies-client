import { Component, Input , numberAttribute } from '@angular/core';
import { MoviesFormComponent } from '../movies-form/movies-form.component';
import { MoviesCreationDTO, MoviesDTO } from '../movies.model';
import { MultipleSelectorDTO } from '../../shared/components/multiple-selector/multiple-selector.models';
import { ActorAutoCompleteDTO } from '../../actors/actors.models';

@Component({
  selector: 'app-edit-movie',
  imports: [MoviesFormComponent],
  templateUrl: './edit-movie.component.html',
  styleUrl: './edit-movie.component.css'
})
export class EditMovieComponent {
  @Input({transform: numberAttribute})
  id!: number;


  nonSelectedGenres: MultipleSelectorDTO[] = [
    {key: 1, description: 'Drama'},
    {key: 3, description: 'Action'}
  ]

  selectedGenres: MultipleSelectorDTO[] = [
    {key: 2, description: 'Comedy'}
  ]

  nonSelectedTheaters: MultipleSelectorDTO[] = [
    {key: 1, description: 'Nueplex'},
    {key: 3, description: 'Atrium'}
  ]

  selectedTheaters: MultipleSelectorDTO[] = [
    {key: 2, description: 'Bahria'}
  ]

  selectedActors: ActorAutoCompleteDTO[] = [
    {id: 1, name: 'Tom Holland', character: 'Peter Parker', picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_by_Gage_Skidmore.jpg/330px-Tom_Holland_by_Gage_Skidmore.jpg'},
  ]


  model: MoviesDTO = {id: 1, title: 'Spiderman', releaseDate: new Date("2026-5-5"), trailer: 'www.trailer.com', poster: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/00/Spider-Man_No_Way_Home_poster.jpg/250px-Spider-Man_No_Way_Home_poster.jpg' };
  saveChanges(movie: MoviesCreationDTO){
    console.log('editing a movie', movie);
  }
}
