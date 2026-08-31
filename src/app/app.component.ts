import { Component } from '@angular/core';
import { MenuComponent } from './shared/components/menu/menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [MenuComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-movies'
  
  processRating(rate: number){
    alert(`You have rated: ${rate} stars`)
  }
}
