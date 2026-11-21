import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { ActorAutoCompleteDTO } from '../actors.models';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTable, MatTableModule } from '@angular/material/table';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { ActorsService } from '../actors.service';

@Component({
  selector: 'app-actors-autocomplete',
  imports: [
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    DragDropModule,
  ],
  templateUrl: './actors-autocomplete.component.html',
  styleUrl: './actors-autocomplete.component.css',
})
export class ActorsAutocompleteComponent implements OnInit {
  actorsService = inject(ActorsService);

  actors: ActorAutoCompleteDTO[] = [];

  @ViewChild(MatTable)
  table!: MatTable<ActorAutoCompleteDTO>;

  actorsOriginal = this.actors;

  @Input({ required: true })
  selectedActors: ActorAutoCompleteDTO[] = [];

  control = new FormControl();

  columnsToDisplay = ['image', 'name', 'character', 'actions'];

  ngOnInit(): void {
    this.control.valueChanges.subscribe((value) => {
      if(typeof value === 'string' && value) {
        this.actorsService.getByName(value).subscribe((actors) => {
          this.actors = actors;
        });
      }
    });
  }

  handleSelection(event: MatAutocompleteSelectedEvent) {
    this.selectedActors.push(event.option.value);
    this.control.patchValue('');
    if (this.table !== undefined) {
      this.table.renderRows();
    }
  }

  delete(actor: ActorAutoCompleteDTO) {
    const index = this.selectedActors.findIndex(
      (a: ActorAutoCompleteDTO) => a.id === actor.id,
    );
    this.selectedActors.splice(index, 1);
    this.table.renderRows();
  }

  handleDrop(even: CdkDragDrop<any[]>) {
    const prevIndex = this.selectedActors.findIndex(
      (val) => val === even.item.data,
    );
    moveItemInArray(this.selectedActors, prevIndex, even.currentIndex);
    this.table.renderRows();
  }
}
