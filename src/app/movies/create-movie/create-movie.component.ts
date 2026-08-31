import { Component, inject } from '@angular/core';
import { MoviesFormComponent } from '../movies-form/movies-form.component';
import { Router } from '@angular/router';
import { MoviesCreationDTO } from '../movies.model';
import { MultipleSelectorDTO } from '../../shared/components/multiple-selector/multiple-selector.models';
import { ActorAutoCompleteDTO } from '../../actors/actors.models';

@Component({
  selector: 'app-create-movie',
  imports: [MoviesFormComponent],
  templateUrl: './create-movie.component.html',
  styleUrl: './create-movie.component.css'
})
export class CreateMovieComponent {

  nonSelectedGenres: MultipleSelectorDTO[] = [
    {key: 1, description: 'Drama'},
    {key: 2, description: 'Comedy'},
    {key: 3, description: 'Action'}
  ]

  selectedGenres: MultipleSelectorDTO[] = []

  nonSelectedTheaters: MultipleSelectorDTO[] = [
    {key: 1, description: 'Nueplex'},
    {key: 2, description: 'Bahria'},
    {key: 3, description: 'Atrium'}
  ]

  selectedTheaters: MultipleSelectorDTO[] = [];

  selectedActors: ActorAutoCompleteDTO[] = [];

  router = inject(Router);

  saveChanges(movie: MoviesCreationDTO){
    console.log(movie);
    this.router.navigate(['/movies']);
  }
}
