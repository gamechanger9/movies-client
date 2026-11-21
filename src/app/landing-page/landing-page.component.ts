import { Component, inject } from '@angular/core';
import { MoviesListComponent } from '../movies/movies-list/movies-list.component';
import { MoviesService } from '../movies/movies.service';

@Component({
  selector: 'app-landing-page',
  imports: [MoviesListComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  upcomingReleasesMovies: any;
  inTheatersMovies: any;
  moviesService = inject(MoviesService);

  constructor(){
    this.loadMovies();
  }

  loadMovies(){
    // Here you would typically call a service to fetch the landing page data
    this.moviesService.getLanding().subscribe(landingData => {
      this.upcomingReleasesMovies = landingData.upcomingReleases;
      this.inTheatersMovies = landingData.inTheaters;
    });
  }

  handleDelete(){
    this.loadMovies();
  }
}
