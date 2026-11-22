import { Component, inject } from '@angular/core';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-authorized',
  imports: [],
  templateUrl: './authorized.component.html',
  styleUrl: './authorized.component.css',
})
export class AuthorizedComponent {
  securityService = inject(SecurityService);

  isLoggedIn(): boolean {
    return this.securityService.isLoggedIn();
  }
}
