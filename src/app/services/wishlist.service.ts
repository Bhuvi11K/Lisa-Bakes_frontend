import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private readonly _items = signal<Product[]>([]);

  readonly items = this._items.asReadonly();
  readonly count = computed(() => this._items().length);

  toggle(product: Product): void {
    if (this.isInWishlist(product.id)) {
      this._items.set(this._items().filter(p => p.id !== product.id));
    } else {
      this._items.set([...this._items(), product]);
    }
  }

  add(product: Product): void {
    if (!this.isInWishlist(product.id)) {
      this._items.set([...this._items(), product]);
    }
  }

  remove(productId: number): void {
    this._items.set(this._items().filter(p => p.id !== productId));
  }

  isInWishlist(productId: number): boolean {
    return this._items().some(p => p.id === productId);
  }

  clear(): void {
    this._items.set([]);
  }
}
