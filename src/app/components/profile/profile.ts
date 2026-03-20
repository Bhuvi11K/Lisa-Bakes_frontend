import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Address, Order, UserProfile } from '../../models/product.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  protected readonly activeTab = signal<'personal' | 'addresses' | 'orders'>('personal');
  protected readonly editMode = signal<boolean>(false);
  protected readonly savedMessage = signal<string>('');

  protected user: UserProfile = {
    name: 'Bhuvanesh K',
    email: 'bhuvanesh@Lisa Bakes.in',
    phone: '+91 82207 99679',
    avatar: '',
    memberSince: 'January 2025',
  };

  protected editUser: UserProfile = { ...this.user };

  protected addresses: Address[] = [
    {
      id: 1,
      name: 'Bhuvanesh K',
      phone: '+91 82207 99679',
      line1: '42, Gandhipuram',
      line2: 'Near RS Puram Bus Stop',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      pincode: '641012',
      isDefault: true,
      label: 'Home',
    },
    {
      id: 2,
      name: 'Bhuvanesh K',
      phone: '+91 82207 99679',
      line1: 'Tech Park, 3rd Floor',
      line2: 'Saravanampatti',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      pincode: '641035',
      isDefault: false,
      label: 'Work',
    },
  ];

  // Replace your existing orders array with this one
  protected readonly orders: Order[] = [
    {
      id: 'ORD-88234',
      items: [
        {
          product: {
            id: 1, name: 'Millet Chocolate Truffle Cake', price: 850, originalPrice: 950, image: 'assets/images/placeholder.jpg', category: 'Cakes',
            rating: 4.9, reviewCount: 124, description: 'Decadent chocolate cake', unit: '0.5 kg', preparationTimeDays: 1
          },
          quantity: 1,
          priceAtPurchase: 850,
          selectedWeight: 0.5,
          isEggless: true,
          customMessage: 'Happy Birthday!'
        }
      ],
      total: 850, 
      status: 'Delivered', // Updated status
      date: '15 Mar 2026',
      requestedDeliveryDate: '16 Mar 2026',
      address: {
        id: 1, name: 'Lisa', phone: '9876543210', line1: '123 Bakery Street', line2: '', city: 'Karur', state: 'Tamil Nadu', pincode: '639001', isDefault: true, label: 'Home'
      },
      paymentMethod: 'UPI'
    },
    {
      id: 'ORD-88235',
      items: [
        {
          product: {
            id: 2, name: 'Coconut Burfi', tamilName: 'தேங்காய் பர்பி', price: 250, originalPrice: 300, image: 'assets/images/placeholder.jpg', category: 'Traditional Sweets',
            rating: 4.8, reviewCount: 89, description: 'Melt-in-the-mouth coconut burfi', unit: '250 g', preparationTimeDays: 2
          },
          quantity: 2,
          priceAtPurchase: 250
        }
      ],
      total: 500, 
      status: 'Baking', // Updated status
      date: '19 Mar 2026',
      address: {
        id: 1, name: 'Lisa', phone: '9876543210', line1: '123 Bakery Street', line2: '', city: 'Karur', state: 'Tamil Nadu', pincode: '639001', isDefault: true, label: 'Home'
      },
      paymentMethod: 'Card'
    }
  ];

  protected readonly expandedOrder = signal<string | null>(null);

  protected switchTab(tab: 'personal' | 'addresses' | 'orders'): void {
    this.activeTab.set(tab);
  }

  protected startEdit(): void {
    this.editUser = { ...this.user };
    this.editMode.set(true);
    this.savedMessage.set('');
  }

  protected cancelEdit(): void {
    this.editMode.set(false);
  }

  protected saveProfile(): void {
    this.user = { ...this.editUser };
    this.editMode.set(false);
    this.savedMessage.set('Profile updated successfully!');
    setTimeout(() => this.savedMessage.set(''), 3000);
  }

  protected setDefaultAddress(id: number): void {
    this.addresses = this.addresses.map((a) => ({ ...a, isDefault: a.id === id }));
  }

  protected deleteAddress(id: number): void {
    this.addresses = this.addresses.filter((a) => a.id !== id);
  }

  protected toggleOrder(orderId: string): void {
    this.expandedOrder.set(this.expandedOrder() === orderId ? null : orderId);
  }

  protected getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      Delivered: '#52b788',
      Shipped: '#f4a261',
      Processing: '#4895ef',
      Cancelled: '#e76f51',
    };
    return colors[status] || '#999';
  }

  protected getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}
