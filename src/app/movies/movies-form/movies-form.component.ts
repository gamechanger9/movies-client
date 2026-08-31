import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { InputImgComponent } from '../../shared/input-img/input-img.component';
import { dateCannotBeInThePast } from '../../shared/components/functions/validations';
import { MoviesCreationDTO, MoviesDTO } from '../movies.model';
import moment from 'moment';
import { MultipleSelectorComponent } from "../../shared/components/multiple-selector/multiple-selector.component";
import { MultipleSelectorDTO } from '../../shared/components/multiple-selector/multiple-selector.models';
import { ActorsAutocompleteComponent } from "../../actors/actors-autocomplete/actors-autocomplete.component";
import { ActorAutoCompleteDTO } from '../../actors/actors.models';

@Component({
  selector: 'app-movies-form',
  imports: [MatButtonModule, ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatDatepickerModule, InputImgComponent, MultipleSelectorComponent, ActorsAutocompleteComponent],
  templateUrl: './movies-form.component.html',
  styleUrl: './movies-form.component.css'
})
export class MoviesFormComponent implements OnInit {
  
  @Input()
  model?: MoviesDTO;

  @Output()
  postForm = new EventEmitter<MoviesCreationDTO>()

  @Input({required: true})
  selectedGenres!: MultipleSelectorDTO[];

  @Input({required: true})
  unSelectedGenres!: MultipleSelectorDTO[];

  @Input({required: true})
  selectedTheaters!: MultipleSelectorDTO[];

  @Input({required: true})
  unSelectedTheaters!: MultipleSelectorDTO[];

  @Input({required: true})
  selectedActors!: ActorAutoCompleteDTO[];


  formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    title: ['', {validators: [Validators.required]}],
    releaseDate: new FormControl<Date | null>(null, {validators: [Validators.required, dateCannotBeInThePast()]}),
    trailer: [''],
    poster: new FormControl<File | null | string>(null)
  });

  ngOnInit(): void {
    if(this.model !== undefined){
      this.form.patchValue(this.model);
    }
  }
  getErrorMessageForTitle(): string {
    let field = this.form.controls.title;

    if(field.hasError('required')){
      return 'The title field is required';
    }

    return '';
  }

  getErrorMessageForReleaseDate(): string{
    let releaseDate = this.form.controls.releaseDate;

    if(releaseDate.hasError('required')){
      return 'The release date field is required';
    }

    if(releaseDate.hasError('dateCannotBeInThePast')){
      return releaseDate.getError('dateCannotBeInThePast').message;
    }
    return '';
  }

  handleFileSelection(file: File){
    this.form.controls.poster.setValue(file);
  }

  saveChanges(){
    const movie = this.form.value as MoviesCreationDTO;
    movie.releaseDate = moment(movie.releaseDate).toDate();
    
    if(typeof movie.poster === 'string'){
      movie.poster = undefined;
    }

    const genreIds = this.selectedGenres.map(value => value.key);
    movie.genresIds = genreIds;

    const theatersIds = this.selectedTheaters.map(value => value.key);
    movie.theatersIds = theatersIds;
    
    movie.actors = this.selectedActors;
    this.postForm.emit(movie);
  }

}
