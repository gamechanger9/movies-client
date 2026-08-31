import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActorAutoCompleteDTO } from '../actors.models';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTable, MatTableModule } from '@angular/material/table';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-cast',
  imports: [MatFormFieldModule, MatAutocompleteModule, ReactiveFormsModule, MatIconModule, FormsModule, MatInputModule, MatTableModule, DragDropModule],
  templateUrl: './cast.component.html',
  styleUrl: './cast.component.css'
})
export class CastComponent implements OnInit {
  actors: ActorAutoCompleteDTO[] = [
    {id: 1, name: 'Tom Holland', character: '', picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_by_Gage_Skidmore.jpg/330px-Tom_Holland_by_Gage_Skidmore.jpg'},
    {id: 2, name: 'Tom Hanks', character: '', picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Tom_Hanks_TIFF_2019.jpg/220px-Tom_Hanks_TIFF_2019.jpg' },
    {id: 3, name: 'Samuel L. Jackson', character: '', picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/SamuelLJackson.jpg/250px-SamuelLJackson.jpg' }
  ]

  @ViewChild(MatTable)
  table!: MatTable<ActorAutoCompleteDTO>;

  @Input()
  selectedActors: ActorAutoCompleteDTO[] = [];

  actorsOriginal = this.actors;
  control = new FormControl();
  columnsToDisplay = ['image', 'name', 'character', 'actions'];

  ngOnInit(): void {
    this.control.valueChanges.subscribe((value) => {
      this.actors = this.actorsOriginal;
      this.actors = this.actors.filter(a => a.name.indexOf(value) !== -1);
    })
  }

  handleSelection(event: MatAutocompleteSelectedEvent){
    this.selectedActors.push(event.option.value);
    this.control.patchValue('');
    if(this.table !== undefined){
      this.table.renderRows();
    }
  }

  delete(actor: ActorAutoCompleteDTO){
    const index = this.selectedActors.findIndex((a: ActorAutoCompleteDTO) => a.id === actor.id);
    this.selectedActors.splice(index, 1);
    this.table.renderRows();
  }

  handleDrop(event: CdkDragDrop<ActorAutoCompleteDTO[]>){
    moveItemInArray(this.selectedActors, event.previousIndex, event.currentIndex);
    this.table.renderRows();
  }
}
