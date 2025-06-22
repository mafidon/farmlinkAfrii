import { supabase } from './config';
import { Product, Order, Investment, User } from './types';

export const dbService = {
  // Products
  products: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, users(full_name, avatar_url)')
        .eq('status', 'available');

      if (error) throw error;
      return data as (Product & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    getFeatured: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, users(full_name, avatar_url)')
        .eq('is_featured', true)
        .eq('status', 'available');

      if (error) throw error;
      return data as (Product & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data as Product[];
    },

    create: async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();

      if (error) throw error;
      return data as Product;
    },

    update: async (id: string, updates: Partial<Product>) => {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Product;
    },

    delete: async (id: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
  },

  // Orders
  orders: {
    create: async (order: Omit<Order, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('orders')
        .insert([order])
        .select()
        .single();

      if (error) throw error;
      return data as Order;
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, products(*)')
        .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`);

      if (error) throw error;
      return data as (Order & { products: Product })[];
    },

    updateStatus: async (id: string, status: Order['status']) => {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Order;
    },
  },

  // Investments
  investments: {
    create: async (investment: Omit<Investment, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('investments')
        .insert([investment])
        .select()
        .single();

      if (error) throw error;
      return data as Investment;
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('investments')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data as Investment[];
    },

    getActive: async () => {
      const { data, error } = await supabase
        .from('investments')
        .select('*, users(full_name, avatar_url)')
        .eq('status', 'active');

      if (error) throw error;
      return data as (Investment & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    updateStatus: async (id: string, status: Investment['status']) => {
      const { data, error } = await supabase
        .from('investments')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Investment;
    },
  },
};
import { Product, Order, Investment, User } from './types';

export const dbService = {
  // Products
  products: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, users(full_name, avatar_url)')
        .eq('status', 'available');

      if (error) throw error;
      return data as (Product & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    getFeatured: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, users(full_name, avatar_url)')
        .eq('is_featured', true)
        .eq('status', 'available');

      if (error) throw error;
      return data as (Product & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data as Product[];
    },

    create: async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();

      if (error) throw error;
      return data as Product;
    },

    update: async (id: string, updates: Partial<Product>) => {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Product;
    },

    delete: async (id: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
  },

  // Orders
  orders: {
    create: async (order: Omit<Order, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('orders')
        .insert([order])
        .select()
        .single();

      if (error) throw error;
      return data as Order;
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, products(*)')
        .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`);

      if (error) throw error;
      return data as (Order & { products: Product })[];
    },

    updateStatus: async (id: string, status: Order['status']) => {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Order;
    },
  },

  // Investments
  investments: {
    create: async (investment: Omit<Investment, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('investments')
        .insert([investment])
        .select()
        .single();

      if (error) throw error;
      return data as Investment;
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('investments')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data as Investment[];
    },

    getActive: async () => {
      const { data, error } = await supabase
        .from('investments')
        .select('*, users(full_name, avatar_url)')
        .eq('status', 'active');

      if (error) throw error;
      return data as (Investment & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    updateStatus: async (id: string, status: Investment['status']) => {
      const { data, error } = await supabase
        .from('investments')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Investment;
    },
  },
};
import { Product, Order, Investment, User } from './types';

export const dbService = {
  // Products
  products: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, users(full_name, avatar_url)')
        .eq('status', 'available');

      if (error) throw error;
      return data as (Product & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    getFeatured: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, users(full_name, avatar_url)')
        .eq('is_featured', true)
        .eq('status', 'available');

      if (error) throw error;
      return data as (Product & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data as Product[];
    },

    create: async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();

      if (error) throw error;
      return data as Product;
    },

    update: async (id: string, updates: Partial<Product>) => {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Product;
    },

    delete: async (id: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
  },

  // Orders
  orders: {
    create: async (order: Omit<Order, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('orders')
        .insert([order])
        .select()
        .single();

      if (error) throw error;
      return data as Order;
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, products(*)')
        .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`);

      if (error) throw error;
      return data as (Order & { products: Product })[];
    },

    updateStatus: async (id: string, status: Order['status']) => {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Order;
    },
  },

  // Investments
  investments: {
    create: async (investment: Omit<Investment, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('investments')
        .insert([investment])
        .select()
        .single();

      if (error) throw error;
      return data as Investment;
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('investments')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data as Investment[];
    },

    getActive: async () => {
      const { data, error } = await supabase
        .from('investments')
        .select('*, users(full_name, avatar_url)')
        .eq('status', 'active');

      if (error) throw error;
      return data as (Investment & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    updateStatus: async (id: string, status: Investment['status']) => {
      const { data, error } = await supabase
        .from('investments')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Investment;
    },
  },
};
import { Product, Order, Investment, User } from './types';

export const dbService = {
  // Products
  products: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, users(full_name, avatar_url)')
        .eq('status', 'available');

      if (error) throw error;
      return data as (Product & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    getFeatured: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, users(full_name, avatar_url)')
        .eq('is_featured', true)
        .eq('status', 'available');

      if (error) throw error;
      return data as (Product & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data as Product[];
    },

    create: async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();

      if (error) throw error;
      return data as Product;
    },

    update: async (id: string, updates: Partial<Product>) => {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Product;
    },

    delete: async (id: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
  },

  // Orders
  orders: {
    create: async (order: Omit<Order, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('orders')
        .insert([order])
        .select()
        .single();

      if (error) throw error;
      return data as Order;
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, products(*)')
        .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`);

      if (error) throw error;
      return data as (Order & { products: Product })[];
    },

    updateStatus: async (id: string, status: Order['status']) => {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Order;
    },
  },

  // Investments
  investments: {
    create: async (investment: Omit<Investment, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('investments')
        .insert([investment])
        .select()
        .single();

      if (error) throw error;
      return data as Investment;
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('investments')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data as Investment[];
    },

    getActive: async () => {
      const { data, error } = await supabase
        .from('investments')
        .select('*, users(full_name, avatar_url)')
        .eq('status', 'active');

      if (error) throw error;
      return data as (Investment & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    updateStatus: async (id: string, status: Investment['status']) => {
      const { data, error } = await supabase
        .from('investments')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Investment;
    },
  },
};
import { Product, Order, Investment, User } from './types';

export const dbService = {
  // Products
  products: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, users(full_name, avatar_url)')
        .eq('status', 'available');

      if (error) throw error;
      return data as (Product & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    getFeatured: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, users(full_name, avatar_url)')
        .eq('is_featured', true)
        .eq('status', 'available');

      if (error) throw error;
      return data as (Product & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data as Product[];
    },

    create: async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();

      if (error) throw error;
      return data as Product;
    },

    update: async (id: string, updates: Partial<Product>) => {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Product;
    },

    delete: async (id: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
  },

  // Orders
  orders: {
    create: async (order: Omit<Order, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('orders')
        .insert([order])
        .select()
        .single();

      if (error) throw error;
      return data as Order;
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, products(*)')
        .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`);

      if (error) throw error;
      return data as (Order & { products: Product })[];
    },

    updateStatus: async (id: string, status: Order['status']) => {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Order;
    },
  },

  // Investments
  investments: {
    create: async (investment: Omit<Investment, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('investments')
        .insert([investment])
        .select()
        .single();

      if (error) throw error;
      return data as Investment;
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('investments')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data as Investment[];
    },

    getActive: async () => {
      const { data, error } = await supabase
        .from('investments')
        .select('*, users(full_name, avatar_url)')
        .eq('status', 'active');

      if (error) throw error;
      return data as (Investment & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    updateStatus: async (id: string, status: Investment['status']) => {
      const { data, error } = await supabase
        .from('investments')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Investment;
    },
  },
};
import { Product, Order, Investment, User } from './types';

export const dbService = {
  // Products
  products: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, users(full_name, avatar_url)')
        .eq('status', 'available');

      if (error) throw error;
      return data as (Product & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    getFeatured: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, users(full_name, avatar_url)')
        .eq('is_featured', true)
        .eq('status', 'available');

      if (error) throw error;
      return data as (Product & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data as Product[];
    },

    create: async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();

      if (error) throw error;
      return data as Product;
    },

    update: async (id: string, updates: Partial<Product>) => {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Product;
    },

    delete: async (id: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
  },

  // Orders
  orders: {
    create: async (order: Omit<Order, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('orders')
        .insert([order])
        .select()
        .single();

      if (error) throw error;
      return data as Order;
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, products(*)')
        .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`);

      if (error) throw error;
      return data as (Order & { products: Product })[];
    },

    updateStatus: async (id: string, status: Order['status']) => {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Order;
    },
  },

  // Investments
  investments: {
    create: async (investment: Omit<Investment, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('investments')
        .insert([investment])
        .select()
        .single();

      if (error) throw error;
      return data as Investment;
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('investments')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data as Investment[];
    },

    getActive: async () => {
      const { data, error } = await supabase
        .from('investments')
        .select('*, users(full_name, avatar_url)')
        .eq('status', 'active');

      if (error) throw error;
      return data as (Investment & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    updateStatus: async (id: string, status: Investment['status']) => {
      const { data, error } = await supabase
        .from('investments')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Investment;
    },
  },
};
import { Product, Order, Investment, User } from './types';

export const dbService = {
  // Products
  products: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, users(full_name, avatar_url)')
        .eq('status', 'available');

      if (error) throw error;
      return data as (Product & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    getFeatured: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, users(full_name, avatar_url)')
        .eq('is_featured', true)
        .eq('status', 'available');

      if (error) throw error;
      return data as (Product & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data as Product[];
    },

    create: async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();

      if (error) throw error;
      return data as Product;
    },

    update: async (id: string, updates: Partial<Product>) => {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Product;
    },

    delete: async (id: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
  },

  // Orders
  orders: {
    create: async (order: Omit<Order, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('orders')
        .insert([order])
        .select()
        .single();

      if (error) throw error;
      return data as Order;
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, products(*)')
        .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`);

      if (error) throw error;
      return data as (Order & { products: Product })[];
    },

    updateStatus: async (id: string, status: Order['status']) => {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Order;
    },
  },

  // Investments
  investments: {
    create: async (investment: Omit<Investment, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('investments')
        .insert([investment])
        .select()
        .single();

      if (error) throw error;
      return data as Investment;
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('investments')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data as Investment[];
    },

    getActive: async () => {
      const { data, error } = await supabase
        .from('investments')
        .select('*, users(full_name, avatar_url)')
        .eq('status', 'active');

      if (error) throw error;
      return data as (Investment & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    updateStatus: async (id: string, status: Investment['status']) => {
      const { data, error } = await supabase
        .from('investments')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Investment;
    },
  },
};
import { Product, Order, Investment, User } from './types';

export const dbService = {
  // Products
  products: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, users(full_name, avatar_url)')
        .eq('status', 'available');

      if (error) throw error;
      return data as (Product & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    getFeatured: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, users(full_name, avatar_url)')
        .eq('is_featured', true)
        .eq('status', 'available');

      if (error) throw error;
      return data as (Product & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data as Product[];
    },

    create: async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();

      if (error) throw error;
      return data as Product;
    },

    update: async (id: string, updates: Partial<Product>) => {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Product;
    },

    delete: async (id: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
  },

  // Orders
  orders: {
    create: async (order: Omit<Order, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('orders')
        .insert([order])
        .select()
        .single();

      if (error) throw error;
      return data as Order;
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, products(*)')
        .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`);

      if (error) throw error;
      return data as (Order & { products: Product })[];
    },

    updateStatus: async (id: string, status: Order['status']) => {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Order;
    },
  },

  // Investments
  investments: {
    create: async (investment: Omit<Investment, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('investments')
        .insert([investment])
        .select()
        .single();

      if (error) throw error;
      return data as Investment;
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('investments')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data as Investment[];
    },

    getActive: async () => {
      const { data, error } = await supabase
        .from('investments')
        .select('*, users(full_name, avatar_url)')
        .eq('status', 'active');

      if (error) throw error;
      return data as (Investment & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    updateStatus: async (id: string, status: Investment['status']) => {
      const { data, error } = await supabase
        .from('investments')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Investment;
    },
  },
};
import { Product, Order, Investment, User } from './types';

export const dbService = {
  // Products
  products: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, users(full_name, avatar_url)')
        .eq('status', 'available');

      if (error) throw error;
      return data as (Product & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    getFeatured: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, users(full_name, avatar_url)')
        .eq('is_featured', true)
        .eq('status', 'available');

      if (error) throw error;
      return data as (Product & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data as Product[];
    },

    create: async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();

      if (error) throw error;
      return data as Product;
    },

    update: async (id: string, updates: Partial<Product>) => {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Product;
    },

    delete: async (id: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
  },

  // Orders
  orders: {
    create: async (order: Omit<Order, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('orders')
        .insert([order])
        .select()
        .single();

      if (error) throw error;
      return data as Order;
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, products(*)')
        .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`);

      if (error) throw error;
      return data as (Order & { products: Product })[];
    },

    updateStatus: async (id: string, status: Order['status']) => {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Order;
    },
  },

  // Investments
  investments: {
    create: async (investment: Omit<Investment, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('investments')
        .insert([investment])
        .select()
        .single();

      if (error) throw error;
      return data as Investment;
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('investments')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data as Investment[];
    },

    getActive: async () => {
      const { data, error } = await supabase
        .from('investments')
        .select('*, users(full_name, avatar_url)')
        .eq('status', 'active');

      if (error) throw error;
      return data as (Investment & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    updateStatus: async (id: string, status: Investment['status']) => {
      const { data, error } = await supabase
        .from('investments')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Investment;
    },
  },
};
import { Product, Order, Investment, User } from './types';

export const dbService = {
  // Products
  products: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, users(full_name, avatar_url)')
        .eq('status', 'available');

      if (error) throw error;
      return data as (Product & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    getFeatured: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, users(full_name, avatar_url)')
        .eq('is_featured', true)
        .eq('status', 'available');

      if (error) throw error;
      return data as (Product & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data as Product[];
    },

    create: async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();

      if (error) throw error;
      return data as Product;
    },

    update: async (id: string, updates: Partial<Product>) => {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Product;
    },

    delete: async (id: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
  },

  // Orders
  orders: {
    create: async (order: Omit<Order, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('orders')
        .insert([order])
        .select()
        .single();

      if (error) throw error;
      return data as Order;
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, products(*)')
        .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`);

      if (error) throw error;
      return data as (Order & { products: Product })[];
    },

    updateStatus: async (id: string, status: Order['status']) => {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Order;
    },
  },

  // Investments
  investments: {
    create: async (investment: Omit<Investment, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('investments')
        .insert([investment])
        .select()
        .single();

      if (error) throw error;
      return data as Investment;
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('investments')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data as Investment[];
    },

    getActive: async () => {
      const { data, error } = await supabase
        .from('investments')
        .select('*, users(full_name, avatar_url)')
        .eq('status', 'active');

      if (error) throw error;
      return data as (Investment & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    updateStatus: async (id: string, status: Investment['status']) => {
      const { data, error } = await supabase
        .from('investments')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Investment;
    },
  },
};
import { Product, Order, Investment, User } from './types';

export const dbService = {
  // Products
  products: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, users(full_name, avatar_url)')
        .eq('status', 'available');

      if (error) throw error;
      return data as (Product & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    getFeatured: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, users(full_name, avatar_url)')
        .eq('is_featured', true)
        .eq('status', 'available');

      if (error) throw error;
      return data as (Product & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data as Product[];
    },

    create: async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();

      if (error) throw error;
      return data as Product;
    },

    update: async (id: string, updates: Partial<Product>) => {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Product;
    },

    delete: async (id: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
  },

  // Orders
  orders: {
    create: async (order: Omit<Order, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('orders')
        .insert([order])
        .select()
        .single();

      if (error) throw error;
      return data as Order;
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, products(*)')
        .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`);

      if (error) throw error;
      return data as (Order & { products: Product })[];
    },

    updateStatus: async (id: string, status: Order['status']) => {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Order;
    },
  },

  // Investments
  investments: {
    create: async (investment: Omit<Investment, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('investments')
        .insert([investment])
        .select()
        .single();

      if (error) throw error;
      return data as Investment;
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('investments')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data as Investment[];
    },

    getActive: async () => {
      const { data, error } = await supabase
        .from('investments')
        .select('*, users(full_name, avatar_url)')
        .eq('status', 'active');

      if (error) throw error;
      return data as (Investment & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    updateStatus: async (id: string, status: Investment['status']) => {
      const { data, error } = await supabase
        .from('investments')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Investment;
    },
  },
};
import { Product, Order, Investment, User } from './types';

export const dbService = {
  // Products
  products: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, users(full_name, avatar_url)')
        .eq('status', 'available');

      if (error) throw error;
      return data as (Product & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    getFeatured: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, users(full_name, avatar_url)')
        .eq('is_featured', true)
        .eq('status', 'available');

      if (error) throw error;
      return data as (Product & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data as Product[];
    },

    create: async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();

      if (error) throw error;
      return data as Product;
    },

    update: async (id: string, updates: Partial<Product>) => {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Product;
    },

    delete: async (id: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
  },

  // Orders
  orders: {
    create: async (order: Omit<Order, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('orders')
        .insert([order])
        .select()
        .single();

      if (error) throw error;
      return data as Order;
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, products(*)')
        .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`);

      if (error) throw error;
      return data as (Order & { products: Product })[];
    },

    updateStatus: async (id: string, status: Order['status']) => {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Order;
    },
  },

  // Investments
  investments: {
    create: async (investment: Omit<Investment, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('investments')
        .insert([investment])
        .select()
        .single();

      if (error) throw error;
      return data as Investment;
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('investments')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data as Investment[];
    },

    getActive: async () => {
      const { data, error } = await supabase
        .from('investments')
        .select('*, users(full_name, avatar_url)')
        .eq('status', 'active');

      if (error) throw error;
      return data as (Investment & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    updateStatus: async (id: string, status: Investment['status']) => {
      const { data, error } = await supabase
        .from('investments')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Investment;
    },
  },
};
import { Product, Order, Investment, User } from './types';

export const dbService = {
  // Products
  products: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, users(full_name, avatar_url)')
        .eq('status', 'available');

      if (error) throw error;
      return data as (Product & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    getFeatured: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, users(full_name, avatar_url)')
        .eq('is_featured', true)
        .eq('status', 'available');

      if (error) throw error;
      return data as (Product & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data as Product[];
    },

    create: async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();

      if (error) throw error;
      return data as Product;
    },

    update: async (id: string, updates: Partial<Product>) => {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Product;
    },

    delete: async (id: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
  },

  // Orders
  orders: {
    create: async (order: Omit<Order, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('orders')
        .insert([order])
        .select()
        .single();

      if (error) throw error;
      return data as Order;
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, products(*)')
        .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`);

      if (error) throw error;
      return data as (Order & { products: Product })[];
    },

    updateStatus: async (id: string, status: Order['status']) => {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Order;
    },
  },

  // Investments
  investments: {
    create: async (investment: Omit<Investment, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('investments')
        .insert([investment])
        .select()
        .single();

      if (error) throw error;
      return data as Investment;
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('investments')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data as Investment[];
    },

    getActive: async () => {
      const { data, error } = await supabase
        .from('investments')
        .select('*, users(full_name, avatar_url)')
        .eq('status', 'active');

      if (error) throw error;
      return data as (Investment & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    updateStatus: async (id: string, status: Investment['status']) => {
      const { data, error } = await supabase
        .from('investments')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Investment;
    },
  },
};
import { Product, Order, Investment, User } from './types';

export const dbService = {
  // Products
  products: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, users(full_name, avatar_url)')
        .eq('status', 'available');

      if (error) throw error;
      return data as (Product & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    getFeatured: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, users(full_name, avatar_url)')
        .eq('is_featured', true)
        .eq('status', 'available');

      if (error) throw error;
      return data as (Product & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data as Product[];
    },

    create: async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();

      if (error) throw error;
      return data as Product;
    },

    update: async (id: string, updates: Partial<Product>) => {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Product;
    },

    delete: async (id: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
  },

  // Orders
  orders: {
    create: async (order: Omit<Order, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('orders')
        .insert([order])
        .select()
        .single();

      if (error) throw error;
      return data as Order;
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, products(*)')
        .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`);

      if (error) throw error;
      return data as (Order & { products: Product })[];
    },

    updateStatus: async (id: string, status: Order['status']) => {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Order;
    },
  },

  // Investments
  investments: {
    create: async (investment: Omit<Investment, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('investments')
        .insert([investment])
        .select()
        .single();

      if (error) throw error;
      return data as Investment;
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('investments')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data as Investment[];
    },

    getActive: async () => {
      const { data, error } = await supabase
        .from('investments')
        .select('*, users(full_name, avatar_url)')
        .eq('status', 'active');

      if (error) throw error;
      return data as (Investment & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    updateStatus: async (id: string, status: Investment['status']) => {
      const { data, error } = await supabase
        .from('investments')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Investment;
    },
  },
};
import { Product, Order, Investment, User } from './types';

export const dbService = {
  // Products
  products: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, users(full_name, avatar_url)')
        .eq('status', 'available');

      if (error) throw error;
      return data as (Product & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    getFeatured: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, users(full_name, avatar_url)')
        .eq('is_featured', true)
        .eq('status', 'available');

      if (error) throw error;
      return data as (Product & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data as Product[];
    },

    create: async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();

      if (error) throw error;
      return data as Product;
    },

    update: async (id: string, updates: Partial<Product>) => {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Product;
    },

    delete: async (id: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
  },

  // Orders
  orders: {
    create: async (order: Omit<Order, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('orders')
        .insert([order])
        .select()
        .single();

      if (error) throw error;
      return data as Order;
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, products(*)')
        .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`);

      if (error) throw error;
      return data as (Order & { products: Product })[];
    },

    updateStatus: async (id: string, status: Order['status']) => {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Order;
    },
  },

  // Investments
  investments: {
    create: async (investment: Omit<Investment, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('investments')
        .insert([investment])
        .select()
        .single();

      if (error) throw error;
      return data as Investment;
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('investments')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data as Investment[];
    },

    getActive: async () => {
      const { data, error } = await supabase
        .from('investments')
        .select('*, users(full_name, avatar_url)')
        .eq('status', 'active');

      if (error) throw error;
      return data as (Investment & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    updateStatus: async (id: string, status: Investment['status']) => {
      const { data, error } = await supabase
        .from('investments')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Investment;
    },
  },
};
import { Product, Order, Investment, User } from './types';

export const dbService = {
  // Products
  products: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, users(full_name, avatar_url)')
        .eq('status', 'available');

      if (error) throw error;
      return data as (Product & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    getFeatured: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, users(full_name, avatar_url)')
        .eq('is_featured', true)
        .eq('status', 'available');

      if (error) throw error;
      return data as (Product & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data as Product[];
    },

    create: async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();

      if (error) throw error;
      return data as Product;
    },

    update: async (id: string, updates: Partial<Product>) => {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Product;
    },

    delete: async (id: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
  },

  // Orders
  orders: {
    create: async (order: Omit<Order, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('orders')
        .insert([order])
        .select()
        .single();

      if (error) throw error;
      return data as Order;
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, products(*)')
        .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`);

      if (error) throw error;
      return data as (Order & { products: Product })[];
    },

    updateStatus: async (id: string, status: Order['status']) => {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Order;
    },
  },

  // Investments
  investments: {
    create: async (investment: Omit<Investment, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('investments')
        .insert([investment])
        .select()
        .single();

      if (error) throw error;
      return data as Investment;
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('investments')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data as Investment[];
    },

    getActive: async () => {
      const { data, error } = await supabase
        .from('investments')
        .select('*, users(full_name, avatar_url)')
        .eq('status', 'active');

      if (error) throw error;
      return data as (Investment & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    updateStatus: async (id: string, status: Investment['status']) => {
      const { data, error } = await supabase
        .from('investments')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Investment;
    },
  },
};
import { Product, Order, Investment, User } from './types';

export const dbService = {
  // Products
  products: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, users(full_name, avatar_url)')
        .eq('status', 'available');

      if (error) throw error;
      return data as (Product & { users: Pick<User, 'full_name' | 'avatar_url'> })[];
    },

    getFeatured: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, users(full_name, avatar_url)')
        .eq('is_featured', true)
        .eq('status', 'available');

      if (error) throw error;
      return data as (Product & { users: Pick<User, 'full_