import { Component, inject } from '@angular/core';
import { UserCredentialsDTO } from '../security.models';
import { Router } from '@angular/router';
import { SecurityService } from '../security.service';
import { extractErrorsIdentity } from '../../shared/components/functions/extractErrors';
import { DisplayErrorsComponent } from '../../shared/components/display-errors/display-errors.component';
import { AuthenticationFormComponent } from '../authentication-form/authentication-form.component';

@Component({
  selector: 'app-register',
  imports: [AuthenticationFormComponent, DisplayErrorsComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  securityService = inject(SecurityService);
  router = inject(Router);
  errors: string[] = [];

  register(userCredentials: UserCredentialsDTO) {
    this.securityService.register(userCredentials).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errors = extractErrorsIdentity(err);
      },
    });
  }
}
