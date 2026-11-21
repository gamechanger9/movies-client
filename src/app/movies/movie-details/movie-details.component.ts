import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { MovieDTO } from '../movies.model';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Coordinate } from '../../shared/components/map/coordinate.model';
import { MapComponent } from '../../shared/components/map/map.component';


@Component({
  selector: 'app-movie-details',
  imports: [LoadingComponent, MatChipsModule, RouterLink, MapComponent],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {

  @Input({transform: numberAttribute})
  id!: number;
  movie!: MovieDTO;
  trailerUrl!: SafeResourceUrl | string;
  coordinates: Coordinate[] = [];
  sanitizer = inject(DomSanitizer);

  moviesService = inject(MoviesService);

  ngOnInit(): void {
    this.moviesService.getById(this.id).subscribe(movie => {
      // Handle the movie details here
      this.movie = movie;
      this.movie.releaseDate = new Date(movie.releaseDate);
      this.trailerUrl = this.transformYoutubeURLToEmber(movie.trailer);
      if(movie.theaters){        
        this.coordinates = movie.theaters.map(theater => {
          return {
            latitude: theater.latitude,
            longitude: theater.longitude,
            text: theater.name
          }
        });
      }
    });
  }

  transformYoutubeURLToEmber(url: string): SafeResourceUrl | string {
    if(!url){
      return '';
    }

    let videoId = url.split('v=')[1];
    let ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }
}
