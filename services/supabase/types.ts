export type UserRole = 'farmer' | 'buyer' | 'expert' | 'admin';

export interface User {
  id: string;
  full_name: string;
  phone_number: string;
  role: UserRole;
  address?: string;
  bio?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  price: number;
  unit: string;
  image_url?: string;
  status: 'available' | 'sold' | 'pending';
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  buyer_id: string;
  seller_id: string;
  product_id: string;
  quantity: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface Investment {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  amount: number;
  status: 'active' | 'completed' | 'cancelled';
  return_rate: number;
  duration_months: number;
  created_at: string;
  updated_at: string;
}