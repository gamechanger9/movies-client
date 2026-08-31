import { AfterViewInit, Component, ComponentRef, inject, Input, ViewChild, viewChild, ViewContainerRef } from '@angular/core';
import { DisplayErrorsComponent } from "../display-errors/display-errors.component";
import { ActorsFormComponent } from "../../../actors/actors-form/actors-form.component";
import { ICRUDService } from '../../interfaces/ICRUDService';
import { CRUD_SERVICE_TOKEN } from '../../providers/providers';
import { Router } from '@angular/router';
import { extractErrors } from '../functions/extractErrors';

@Component({
  selector: 'app-create-entity',
  imports: [DisplayErrorsComponent],
  templateUrl: './create-entity.component.html',
  styleUrl: './create-entity.component.css'
})
export class CreateEntityComponent<TDTO, TCreationDTO> implements AfterViewInit {
  errors: string[] = [];

  CRUDService = inject(CRUD_SERVICE_TOKEN) as ICRUDService<TDTO, TCreationDTO>;
  router = inject(Router);

  @Input({required: true})
  indexRoute!: string;

  @Input({required: true})
  title!: string;

  @Input({required: true})
  formComponent: any;
  
  @ViewChild("contentForm", {read: ViewContainerRef})
  contentForm!: ViewContainerRef;
  private componentRef!: ComponentRef<any>;

  ngAfterViewInit(): void {
    this.componentRef = this.contentForm.createComponent(this.formComponent);
    this.componentRef.instance.postForm.subscribe((entity: TCreationDTO) => {
      this.saveChanges(entity);
    });
  }
  saveChanges(entity: TCreationDTO){
    this.CRUDService.create(entity).subscribe({
      next: () => {
        this.router.navigate([this.indexRoute]);
      },
      error: err => {
        const errors = extractErrors(err);
        this.errors = errors;
      }
    });
  }
}
