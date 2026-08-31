import { Component, Input, numberAttribute } from '@angular/core';
import { TheaterCreationDTO, TheaterDTO } from '../theaters.model';
import { TheatersFormComponent } from "../theaters-form/theaters-form.component";

@Component({
  selector: 'app-edit-theater',
  imports: [TheatersFormComponent],
  templateUrl: './edit-theater.component.html',
  styleUrl: './edit-theater.component.css'
})
export class EditTheaterComponent {
 @Input({transform: numberAttribute})
  id!: number;

  model: TheaterDTO = {name: 'Nueplex', id: 1, latitude: 45, longitude: -112};

  saveChanges(theater: TheaterCreationDTO){
    console.log('editing the theater', theater);
  }
}
