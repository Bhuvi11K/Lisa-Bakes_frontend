export interface Product {
  id: number;
  name: string;
  tamilName?: string; // Kept this as it's a great touch for local traditional sweets
  price: number;
  originalPrice: number;
  image: string;
  category: 'Cakes' | 'Traditional Sweets' | 'Cupcakes' | 'Dessert Jars'; // Updated categories
  rating: number;
  reviewCount: number;
  badge?: string; // e.g., 'Bestseller', 'Freshly Baked'
  description: string;
  unit: string; // e.g., 'kg', 'box', 'pieces'
  
  // --- New Bakery & Sweets Specific Fields ---
  isEgglessAvailable?: boolean; 
  weightOptions?: number[]; // e.g., [0.5, 1, 1.5, 2] representing kg
  flavor?: string;
  allowsCustomMessage?: boolean;
  preparationTimeDays: number; // Crucial for homemade items (e.g., needs 2 days notice)
}

export interface CartItem {
  product: Product;
  quantity: number;
  
  // --- Added to track the customer's specific selections ---
  selectedWeight?: number; 
  isEggless?: boolean;
  customMessage?: string; // e.g., "Happy Birthday Lisa!"
}

export interface Address {
  id: number;
  name: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
  label: string; // 'Home' | 'Work' | 'Other'
}

export interface OrderItem {
  product: Product;
  quantity: number;
  priceAtPurchase: number;
  
  // --- Capture the choices permanently for the order history ---
  selectedWeight?: number;
  isEggless?: boolean;
  customMessage?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  // --- Updated statuses to fit a bakery workflow ---
  status: 'Pending' | 'Baking' | 'Ready for Pickup' | 'Out for Delivery' | 'Delivered' | 'Cancelled'; 
  date: string;
  requestedDeliveryDate?: string; // Added because cakes are usually for specific events
  address: Address;
  paymentMethod: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  memberSince: string;
}