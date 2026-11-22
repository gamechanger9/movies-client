import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from "@angular/router";
import { AuthorizedComponent } from '../../../security/authorized/authorized.component';
import { SecurityService } from '../../../security/security.service';

@Component({
  selector: 'app-menu',
  imports: [MatButtonModule, MatToolbarModule, MatIconModule, RouterLink, AuthorizedComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  securityService = inject(SecurityService);
  router = inject(Router);

  logout(){
    this.securityService.logout();
    this.router.navigate(['/']);
  }


}
