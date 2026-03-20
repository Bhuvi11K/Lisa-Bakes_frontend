import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Using a signal for reactive state management
  public isLoggedIn = signal<boolean>(false);
  
  // Track where the user wanted to go before being redirected to login
  public redirectUrl: string | null = null;

  public login(): void {
    this.isLoggedIn.set(true);
  }

  public logout(): void {
    this.isLoggedIn.set(false);
  }
}
