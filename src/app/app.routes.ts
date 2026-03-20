import { Routes } from '@angular/router';
import { ProductCatalog } from './components/product-catalog/product-catalog';
import { Cart } from './components/cart/cart';
import { Profile } from './components/profile/profile';
import { Checkout } from './components/checkout/checkout';
import { Wishlist } from './components/wishlist/wishlist';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

const authGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn()) {
    return true;
  }
  auth.redirectUrl = '/checkout';
  return router.parseUrl('/login');
};

export const routes: Routes = [
  { path: '', component: ProductCatalog },
  { path: 'cart', component: Cart },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  { path: 'checkout', component: Checkout, canActivate: [authGuard] },
  { path: 'wishlist', component: Wishlist },
  { path: '**', redirectTo: '' },
];
