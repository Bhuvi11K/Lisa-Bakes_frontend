import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Address } from '../../models/product.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  protected readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  protected readonly currentStep = signal<number>(1);
  protected readonly selectedAddressId = signal<number>(1);
  protected readonly selectedPayment = signal<string>('upi');
  protected readonly orderPlaced = signal<boolean>(false);
  protected readonly orderId = signal<string>('');

  // Shipping form
  protected shippingForm = {
    name: 'Bhuvanesh K',
    phone: '+91 82207 99679',
    line1: '42, Gandhipuram',
    line2: 'Near RS Puram Bus Stop',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    pincode: '641012',
  };

  // Payment form
  protected cardForm = {
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  };

  protected upiId = '';

  protected savedAddresses: Address[] = [
    {
      id: 1, name: 'Bhuvanesh K', phone: '+91 82207 99679',
      line1: '42, Gandhipuram', line2: 'Near RS Puram Bus Stop',
      city: 'Coimbatore', state: 'Tamil Nadu', pincode: '641012',
      isDefault: true, label: 'Home',
    },
    {
      id: 2, name: 'Bhuvanesh K', phone: '+91 82207 99679',
      line1: 'Tech Park, 3rd Floor', line2: 'Saravanampatti',
      city: 'Coimbatore', state: 'Tamil Nadu', pincode: '641035',
      isDefault: false, label: 'Work',
    },
  ];

  protected readonly useNewAddress = signal<boolean>(false);

  protected selectAddress(id: number): void {
    this.selectedAddressId.set(id);
    this.useNewAddress.set(false);
  }

  protected showNewAddressForm(): void {
    this.useNewAddress.set(true);
    this.selectedAddressId.set(0);
  }

  protected goToStep(step: number): void {
    if (step < this.currentStep()) {
      this.currentStep.set(step);
    }
  }

  protected nextStep(): void {
    if (this.currentStep() < 3) {
      this.currentStep.set(this.currentStep() + 1);
    }
  }

  protected prevStep(): void {
    if (this.currentStep() > 1) {
      this.currentStep.set(this.currentStep() - 1);
    }
  }

  protected placeOrder(): void {
    // Changed NF- to LB- for Lisa Bakes
    const id = 'LB-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 9000 + 1000);
    this.orderId.set(id);
    this.orderPlaced.set(true);
    this.currentStep.set(3);
    this.cartService.clearCart();
  }

  protected goHome(): void {
    this.router.navigate(['/']);
  }

  protected getSelectedAddress(): Address | undefined {
    return this.savedAddresses.find(a => a.id === this.selectedAddressId());
  }

  protected getPaymentLabel(): string {
    const labels: Record<string, string> = {
      'upi': 'UPI',
      'card': 'Credit / Debit Card',
      'netbanking': 'Net Banking',
      'cod': 'Cash on Delivery',
    };
    return labels[this.selectedPayment()] || '';
  }
}
