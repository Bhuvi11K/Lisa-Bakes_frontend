import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  protected readonly authService = inject(AuthService);
  protected readonly router = inject(Router);

  protected email = '';
  protected password = '';

  protected submit(): void {
    if (this.email && this.password) {
      this.authService.login();
      
      const url = this.authService.redirectUrl || '/';
      this.authService.redirectUrl = null;
      this.router.navigate([url]);
    }
  }
}
