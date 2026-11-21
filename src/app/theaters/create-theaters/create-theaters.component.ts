import { Component } from '@angular/core';
import { TheatersFormComponent } from "../theaters-form/theaters-form.component";
import { TheatersService } from '../theaters.service';
import { CRUD_SERVICE_TOKEN } from '../../shared/providers/providers';
import { CreateEntityComponent } from "../../shared/components/create-entity/create-entity.component";

@Component({
  selector: 'app-create-theaters',
  imports: [CreateEntityComponent],
  templateUrl: './create-theaters.component.html',
  styleUrl: './create-theaters.component.css',
  providers: [
    {
      provide: CRUD_SERVICE_TOKEN,
      useClass: TheatersService,
    }
  ]
})
export class CreateTheatersComponent {

  theatersForm = TheatersFormComponent;
}
