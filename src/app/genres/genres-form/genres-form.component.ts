import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { firstLetterShouldBeUpperCase, noNumbersAllowed } from '../../shared/components/functions/validations';
import { GenreCreationDTO, GenreDTO } from '../genres.models';

@Component({
  selector: 'app-genres-form',
  imports: [MatButtonModule, ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule],
  templateUrl: './genres-form.component.html',
  styleUrl: './genres-form.component.css'
})
export class GenresFormComponent implements OnInit {
    private formBuilder = inject(FormBuilder);    

    form = this.formBuilder.group({
      name: ['', {validators: [Validators.required, firstLetterShouldBeUpperCase(), noNumbersAllowed(), Validators.maxLength(50)]}]
    });

    @Input()
    model?: GenreDTO;

    @Output()
    postForm = new EventEmitter<GenreCreationDTO>();

    ngOnInit(): void {
      if (this.model !== undefined) {
        this.form.patchValue(this.model);
      }
    }

    getErrorMessagesForName() : string {
      let field = this.form.controls.name;

      if (field.hasError('required')) {
        return 'The Name field is required';
      }

      if (field.hasError('firstLetterShouldBeUpperCase')) {
        return field.getError('firstLetterShouldBeUpperCase').message;
      }

      if (field.hasError('noNumbersAllowed')) {
        return field.getError('noNumbersAllowed').message;
      }
      if(field.hasError('maxlength')){
        return `The field Name must not have more than ${field.getError('maxlength')?.requiredLength} characters`;
      }

      return "";
    }

    saveChanges(){
      const genre = this.form.value as GenreCreationDTO;
      this.postForm.emit(genre);
    }
}
