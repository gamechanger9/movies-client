import { Component } from '@angular/core';
import { TheaterCreationDTO } from '../theaters.model';
import { TheatersFormComponent } from "../theaters-form/theaters-form.component";

@Component({
  selector: 'app-create-theaters',
  imports: [TheatersFormComponent],
  templateUrl: './create-theaters.component.html',
  styleUrl: './create-theaters.component.css'
})
export class CreateTheatersComponent {
  saveChanges(theater: TheaterCreationDTO){
    console.log(theater);
  }
}
