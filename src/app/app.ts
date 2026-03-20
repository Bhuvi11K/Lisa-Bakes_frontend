import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartService } from './services/cart.service';
import { WishlistService } from './services/wishlist.service';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  // Keeping services injected here just in case other parts look for them on app-root, 
  // although they are globally provided singleton services usually.
  protected readonly cartService = inject(CartService);
  protected readonly wishlistService = inject(WishlistService);
}
