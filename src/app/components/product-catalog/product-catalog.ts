import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-product-catalog',
  standalone: true,
  templateUrl: './product-catalog.html',
  styleUrl: './product-catalog.scss',
})
export class ProductCatalog {
  private readonly cartService = inject(CartService);
  protected readonly wishlistService = inject(WishlistService);
  private readonly router = inject(Router);
  protected readonly selectedCategory = signal<string>('All');
  protected readonly addedProductId = signal<number | null>(null);

  // Updated categories for the bakery
  protected readonly categories: string[] = [
    'All',
    'Cakes',
    'Traditional Sweets',
    'Cupcakes',
    'Dessert Jars',
  ];

  // Fresh bakery data with beautiful live image URLs
  protected readonly products: Product[] = [
    {
      id: 1,
      name: 'Millet Chocolate Truffle Cake',
      price: 850,
      originalPrice: 950,
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop',
      category: 'Cakes',
      rating: 4.9,
      reviewCount: 124,
      badge: 'Bestseller',
      description:
        'Decadent chocolate cake made with ragi flour and sweetened with natural brown sugar.',
      unit: '0.5 kg',
      isEgglessAvailable: true,
      weightOptions: [0.5, 1, 1.5],
      flavor: 'Chocolate',
      allowsCustomMessage: true,
      preparationTimeDays: 1,
    },
    {
      id: 2,
      name: 'Coconut Burfi',
      // tamilName: 'தேங்காய் பர்பி',
      price: 250,
      originalPrice: 300,
      image:
        'https://palatesdesire.com/wp-content/uploads/2022/07/coconut-barfi-recipe@palates-desire.jpg',
      category: 'Traditional Sweets',
      rating: 4.8,
      reviewCount: 89,
      badge: 'Classic',
      description:
        'Traditional melt-in-the-mouth coconut burfi made fresh at home with pure ingredients.',
      unit: '250 g',
      preparationTimeDays: 2,
    },
    {
      id: 3,
      name: 'Rava Laddu',
      // tamilName: 'ரவா லட்டு',
      price: 220,
      originalPrice: 280,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSCgr_YDMgc66FPlOsmaJy9mJOZhgwZZD7Wsc2-1sRdyYJdUTLBrelZBHyyQmj9s5IsWsD8RlN7R_e4HSXFBsdiq2uC0hf&s&ec=121585077',
      category: 'Traditional Sweets',
      rating: 4.7,
      reviewCount: 156,
      badge: 'Popular',
      description: 'Aromatic roasted semolina rolled with ghee, cashews, and a hint of cardamom.',
      unit: '250 g',
      preparationTimeDays: 2,
    },
    {
      id: 4,
      name: 'Red Velvet Millet Cupcakes',
      price: 350,
      originalPrice: 400,
      image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=600&h=400&fit=crop',
      category: 'Cupcakes',
      rating: 4.6,
      reviewCount: 45,
      badge: 'New',
      description:
        'Soft, fluffy red velvet cupcakes with a healthy twist, topped with light cream cheese frosting.',
      unit: 'Box of 6',
      isEgglessAvailable: true,
      flavor: 'Red Velvet',
      preparationTimeDays: 1,
    },
    {
      id: 5,
      name: 'Filter Coffee Dessert Jar',
      price: 180,
      originalPrice: 220,
      image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&h=400&fit=crop',
      category: 'Dessert Jars',
      rating: 4.9,
      reviewCount: 210,
      badge: 'Signature',
      description: 'Layers of millet sponge and authentic South Indian filter coffee cream.',
      unit: '1 Jar',
      isEgglessAvailable: true,
      flavor: 'Coffee',
      preparationTimeDays: 1,
    },
    {
      id: 6,
      name: 'Pineapple Fresh Cream Cake',
      price: 700,
      originalPrice: 850,
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=400&fit=crop',
      category: 'Cakes',
      rating: 4.5,
      reviewCount: 67,
      badge: '',
      description: 'Light vanilla millet sponge layered with fresh homemade pineapple compote.',
      unit: '0.5 kg',
      isEgglessAvailable: true,
      weightOptions: [0.5, 1, 2],
      flavor: 'Pineapple',
      allowsCustomMessage: true,
      preparationTimeDays: 1,
    },
  ];

  protected get filteredProducts(): Product[] {
    const cat = this.selectedCategory();
    if (cat === 'All') return this.products;
    return this.products.filter((p) => p.category === cat);
  }

  protected selectCategory(cat: string): void {
    this.selectedCategory.set(cat);
  }

  protected addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.addedProductId.set(product.id);
    setTimeout(() => this.addedProductId.set(null), 1500);
  }

  protected isInCart(productId: number): boolean {
    return this.cartService.isInCart(productId);
  }

  protected getDiscount(product: Product): number {
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  }

  protected getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  protected getEmptyStars(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }

  // Updated gradient colors to match bakery aesthetics
  protected getGradient(product: Product): string {
    const gradients: Record<string, string> = {
      Cakes: 'linear-gradient(135deg, #fdf0e9 0%, #f0c4b6 100%)',
      'Traditional Sweets': 'linear-gradient(135deg, #fae8e0 0%, #d49a89 100%)',
      Cupcakes: 'linear-gradient(135deg, #fcefee 0%, #c27a7c 100%)',
      'Dessert Jars': 'linear-gradient(135deg, #f5f0ed 0%, #b57b6a 100%)',
    };
    return gradients[product.category] || 'linear-gradient(135deg, #fdf0e9 0%, #d49a89 100%)';
  }
}
