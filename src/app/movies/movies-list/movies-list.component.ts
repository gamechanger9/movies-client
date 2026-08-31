import { Component, Input } from '@angular/core';
import { GenericListComponent } from '../../shared/components/generic-list/generic-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-movies-list',
  imports: [GenericListComponent, MatButtonModule, MatIconModule],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.css'
})
export class MoviesListComponent {
  
  @Input({ required: true})
  movies?: any[]; 

  addMovie(){
    this.movies?.push({
      title: 'Inception', releaseDate: 1999, rating: 8.7, price: 25,
    });
  }

  removeMovie(movie: any){
    let index = this.movies?.findIndex((m: any) => m.title === movie.title);
    if(index !== undefined && index !== -1){
      this.movies?.splice(index, 1);
    }
  }
}
