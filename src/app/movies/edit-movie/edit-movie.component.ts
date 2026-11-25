import {
  Component,
  inject,
  Input,
  numberAttribute,
  OnInit,
} from '@angular/core';
import { MoviesFormComponent } from '../movies-form/movies-form.component';
import { MovieCreationDTO, MovieDTO } from '../movies.model';
import { MultipleSelectorDTO } from '../../shared/components/multiple-selector/multiple-selector.models';
import { ActorAutoCompleteDTO } from '../../actors/actors.models';
import { MoviesService } from '../movies.service';
import { extractErrors } from '../../shared/functions/extractErrors';
import { Router } from '@angular/router';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-edit-movie',
  imports: [MoviesFormComponent, LoadingComponent],
  templateUrl: './edit-movie.component.html',
  styleUrl: './edit-movie.component.css',
})
export class EditMovieComponent implements OnInit {
  ngOnInit(): void {
    this.moviesService.putGet(this.id).subscribe((response) => {
      this.model = response.movie;
      this.selectedGenres = response.selectedGenres.map((genre) => {
        return <MultipleSelectorDTO>{ key: genre.id, description: genre.name };
      });
      this.nonSelectedGenres = response.nonSelectedGenres.map((genre) => {
        return <MultipleSelectorDTO>{ key: genre.id, description: genre.name };
      });
      this.selectedTheaters = response.selectedTheaters.map((theater) => {
        return <MultipleSelectorDTO>{
          key: theater.id,
          description: theater.name,
        };
      });
      this.nonSelectedTheaters = response.nonSelectedTheaters.map((theater) => {
        return <MultipleSelectorDTO>{
          key: theater.id,
          description: theater.name,
        };
      });
      this.selectedActors = response.actors;
    });
  }

  @Input({ transform: numberAttribute })
  id!: number;
  model?: MovieDTO;
  nonSelectedGenres: MultipleSelectorDTO[] = [];
  selectedGenres: MultipleSelectorDTO[] = [];
  nonSelectedTheaters: MultipleSelectorDTO[] = [];
  selectedTheaters: MultipleSelectorDTO[] = [];
  selectedActors: ActorAutoCompleteDTO[] = [];
  moviesService = inject(MoviesService);
  router = inject(Router);
  errors: string[] = [];

  saveChanges(movie: MovieCreationDTO) {
    this.moviesService.update(this.id, movie).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        const errors = extractErrors(err);
        this.errors = errors;
      },
    });
  }
}
