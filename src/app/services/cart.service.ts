import { Injectable, signal, computed } from '@angular/core';
import { Product, CartItem } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _cartItems = signal<CartItem[]>([]);
  private readonly _couponCode = signal<string>('');
  private readonly _couponApplied = signal<boolean>(false);

  // ─── Public Signals ───
  readonly cartItems = this._cartItems.asReadonly();
  readonly couponCode = this._couponCode.asReadonly();
  readonly couponApplied = this._couponApplied.asReadonly();

  readonly cartCount = computed(() =>
    this._cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );

  readonly subtotal = computed(() =>
    this._cartItems().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  readonly savings = computed(() =>
    this._cartItems().reduce(
      (sum, item) => sum + (item.product.originalPrice - item.product.price) * item.quantity,
      0
    )
  );

  readonly couponDiscount = computed(() => {
    if (!this._couponApplied()) return 0;
    return Math.round(this.subtotal() * 0.2); // 20% off
  });

  readonly deliveryCharge = computed(() => {
    const sub = this.subtotal() - this.couponDiscount();
    return sub >= 499 ? 0 : 49;
  });

  readonly gst = computed(() =>
    Math.round((this.subtotal() - this.couponDiscount()) * 0.05)
  );

  readonly grandTotal = computed(() =>
    this.subtotal() - this.couponDiscount() + this.deliveryCharge() + this.gst()
  );

  // ─── Actions ───
  addToCart(product: Product): void {
    const items = this._cartItems();
    const existing = items.find(i => i.product.id === product.id);
    if (existing) {
      this._cartItems.set(
        items.map(i =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      this._cartItems.set([...items, { product, quantity: 1 }]);
    }
  }

  removeFromCart(productId: number): void {
    this._cartItems.set(this._cartItems().filter(i => i.product.id !== productId));
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    this._cartItems.set(
      this._cartItems().map(i =>
        i.product.id === productId ? { ...i, quantity } : i
      )
    );
  }

  incrementQuantity(productId: number): void {
    const item = this._cartItems().find(i => i.product.id === productId);
    if (item) this.updateQuantity(productId, item.quantity + 1);
  }

  decrementQuantity(productId: number): void {
    const item = this._cartItems().find(i => i.product.id === productId);
    if (item) this.updateQuantity(productId, item.quantity - 1);
  }

  applyCoupon(code: string): boolean {
    if (code.toUpperCase() === 'ORGANIC20') {
      this._couponCode.set(code.toUpperCase());
      this._couponApplied.set(true);
      return true;
    }
    return false;
  }

  removeCoupon(): void {
    this._couponCode.set('');
    this._couponApplied.set(false);
  }

  clearCart(): void {
    this._cartItems.set([]);
    this.removeCoupon();
  }

  isInCart(productId: number): boolean {
    return this._cartItems().some(i => i.product.id === productId);
  }

  getItemQuantity(productId: number): number {
    return this._cartItems().find(i => i.product.id === productId)?.quantity ?? 0;
  }
}
