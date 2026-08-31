import { Component, Input, numberAttribute} from '@angular/core';
import { GenresFormComponent } from "../genres-form/genres-form.component";
import { GenresService } from '../genres.service';
import { CRUD_SERVICE_TOKEN } from '../../shared/providers/providers';
import { EditEntityComponent } from "../../shared/components/edit-entity/edit-entity.component";

@Component({
  selector: 'app-edit-genre',
  imports: [EditEntityComponent],
  templateUrl: './edit-genre.component.html',
  styleUrl: './edit-genre.component.css',
  providers: [
    {
      provide: CRUD_SERVICE_TOKEN,
      useClass: GenresService,
    }
  ]
})
export class EditGenreComponent {
  @Input({transform: numberAttribute})
  id!: number;
  genresForm = GenresFormComponent;
}
