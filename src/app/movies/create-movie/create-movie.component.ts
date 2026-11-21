import { Component, inject } from '@angular/core';
import { MoviesFormComponent } from '../movies-form/movies-form.component';
import { Router } from '@angular/router';
import { MovieCreationDTO } from '../movies.model';
import { MultipleSelectorDTO } from '../../shared/components/multiple-selector/multiple-selector.models';
import { ActorAutoCompleteDTO } from '../../actors/actors.models';
import { MoviesService } from '../movies.service';
import { extractErrors } from '../../shared/components/functions/extractErrors';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-create-movie',
  imports: [MoviesFormComponent, LoadingComponent],
  templateUrl: './create-movie.component.html',
  styleUrl: './create-movie.component.css'
})
export class CreateMovieComponent {

  nonSelectedGenres: MultipleSelectorDTO[] = []

  selectedGenres: MultipleSelectorDTO[] = []

  nonSelectedTheaters: MultipleSelectorDTO[] = []

  selectedTheaters: MultipleSelectorDTO[] = [];

  selectedActors: ActorAutoCompleteDTO[] = [];

  moviesService = inject(MoviesService);
  errors: string[] = [];
  router = inject(Router);

  constructor() {
    this.moviesService.postGet().subscribe(model => {
      this.nonSelectedGenres = model.genres.map(genre => {
        return <MultipleSelectorDTO>{ key: genre.id, description: genre.name }
      });
      this.nonSelectedTheaters = model.theaters.map(theater => {
        return <MultipleSelectorDTO>{ key: theater.id, description: theater.name }
      });
    });
  }

  saveChanges(movie: MovieCreationDTO){
    this.moviesService.create(movie).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: err => {
        const errors = extractErrors(err);
        this.errors = errors;
      }
    })
  }
}
