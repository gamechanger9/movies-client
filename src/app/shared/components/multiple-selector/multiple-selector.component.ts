import { Component, Input } from '@angular/core';
import { MultipleSelectorDTO } from './multiple-selector.models';

@Component({
  selector: 'app-multiple-selector',
  imports: [],
  templateUrl: './multiple-selector.component.html',
  styleUrl: './multiple-selector.component.css'
})
export class MultipleSelectorComponent {
  @Input({required: true})
  selectedItems!: MultipleSelectorDTO[];

  @Input({required: true})
  unselectedItems!: MultipleSelectorDTO[];

  select(element: MultipleSelectorDTO, index: number){
    this.selectedItems.push(element);
    this.unselectedItems.splice(index, 1);
  }

  deselect(element: MultipleSelectorDTO, index: number){
    this.unselectedItems.push(element);
    this.selectedItems.splice(index, 1);
  }

  selectAll(){
    this.selectedItems.push(...this.unselectedItems);
    this.unselectedItems.length = 0;
  }

  deselectAll(){
    this.unselectedItems.push(...this.selectedItems);
    this.selectedItems.length = 0;
  }
}
