import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { GenericListComponent } from '../../shared/components/generic-list/generic-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MoviesService } from '../movies.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movies-list',
  imports: [GenericListComponent, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.css'
})
export class MoviesListComponent {
  
  @Input({ required: true})
  movies?: any[]; 
  moviesService = inject(MoviesService);

  @Output()
  deleted = new EventEmitter<void>();

  delete(id: number){
    Swal.fire({
          title: 'Are you sure you want to delete this movie?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Deleted!',
              text: 'Movie has been deleted.',
              icon: 'success',
            });
            this.moviesService.delete(id).subscribe({
              next: () => {
                this.deleted.emit();
              },
            });
          }
        }); 
      }
}
