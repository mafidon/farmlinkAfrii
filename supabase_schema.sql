-- Create Enum for user roles
CREATE TYPE public.user_role AS ENUM (
    'farmer',
    'buyer',
    'expert',
    'admin'
);

-- Create the users table (profiles) linked to auth.users
CREATE TABLE public.users (
    id uuid NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name character varying,
    phone_number character varying,
    role public.user_role DEFAULT 'farmer'::public.user_role NOT NULL,
    address text,
    bio text,
    avatar_url character varying,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Add indexes
CREATE INDEX users_role_idx ON public.users (role);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Authenticated users can view other users' basic profile info" ON public.users FOR SELECT USING (auth.role() = 'authenticated' AND auth.uid() != id);
CREATE POLICY "Users can create their own profile" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

-- Create the products table
CREATE TABLE public.products (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
    name character varying NOT NULL,
    description text,
    price numeric NOT NULL CHECK (price >= 0),
    unit character varying,
    image_url character varying,
    status character varying DEFAULT 'available'::character varying NOT NULL,
    is_featured boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Add indexes
CREATE INDEX products_user_id_idx ON public.products (user_id);
CREATE INDEX products_status_idx ON public.products (status);
CREATE INDEX products_is_featured_idx ON public.products (is_featured);

-- Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- RLS Policies for products table
CREATE POLICY "Authenticated users can view products" ON public.products FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Product owners can insert products" ON public.products FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Product owners can update their products" ON public.products FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Product owners can delete their products" ON public.products FOR DELETE USING (auth.uid() = user_id);

-- Create the orders table
CREATE TABLE public.orders (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    buyer_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
    seller_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
    product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
    quantity numeric NOT NULL CHECK (quantity > 0),
    total_price numeric NOT NULL CHECK (total_price >= 0),
    status character varying DEFAULT 'pending'::character varying NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Add indexes
CREATE INDEX orders_buyer_id_idx ON public.orders (buyer_id);
CREATE INDEX orders_seller_id_idx ON public.orders (seller_id);
CREATE INDEX orders_product_id_idx ON public.orders (product_id);
CREATE INDEX orders_status_idx ON public.orders (status);

-- Enable Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies for orders table
-- Buyers and sellers can view their own orders
CREATE POLICY "Buyers and sellers can view their own orders" ON public.orders FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = seller_id);
-- Buyers can create orders
CREATE POLICY "Buyers can create orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = buyer_id);
-- Buyers and sellers can update their own orders (e.g., status updates)
CREATE POLICY "Buyers and sellers can update their own orders" ON public.orders FOR UPDATE USING (auth.uid() = buyer_id OR auth.uid() = seller_id);
-- Only admins or potentially buyers/sellers under certain conditions can delete orders (leaving simple for now)
CREATE POLICY "Admins can delete orders" ON public.orders FOR DELETE USING (auth.role() = 'service_role'); -- Example for admin, adjust as needed

-- Create the investments table
CREATE TABLE public.investments (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
    title character varying NOT NULL,
    description text,
    target_amount numeric NOT NULL CHECK (target_amount > 0),
    current_amount numeric DEFAULT 0 NOT NULL CHECK (current_amount >= 0),
    roi numeric NOT NULL CHECK (roi > 0), -- Return on Investment percentage
    duration integer NOT NULL CHECK (duration > 0), -- Duration in months
    image_url character varying,
    status character varying DEFAULT 'open'::character varying NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Add indexes
CREATE INDEX investments_user_id_idx ON public.investments (user_id);
CREATE INDEX investments_status_idx ON public.investments (status);

-- Enable Row Level Security (RLS)
ALTER TABLE public.investments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for investments table
-- Authenticated users can view open investments
CREATE POLICY "Authenticated users can view open investments" ON public.investments FOR SELECT USING (auth.role() = 'authenticated' AND status = 'open');
-- Investment owners can view their own investments (including non-open status)
CREATE POLICY "Investment owners can view their investments" ON public.investments FOR SELECT USING (auth.uid() = user_id);
-- Investment owners can insert investments
CREATE POLICY "Investment owners can create investments" ON public.investments FOR INSERT WITH CHECK (auth.uid() = user_id);
-- Investment owners can update their investments
CREATE POLICY "Investment owners can update their investments" ON public.investments FOR UPDATE USING (auth.uid() = user_id);
-- Investment owners can delete their investments
CREATE POLICY "Investment owners can delete their investments" ON public.investments FOR DELETE USING (auth.uid() = user_id);

-- Create the activities table (for recent activities feed)
CREATE TABLE public.activities (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.users(id) ON DELETE SET NULL, -- User who performed the activity (optional)
    type character varying NOT NULL, -- e.g., 'new_product', 'new_order', 'investment_update'
    title character varying NOT NULL, -- Short title for the activity
    description text, -- Optional more detailed description
    related_id uuid, -- Optional ID of related entity (product, order, etc.)
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Add indexes
CREATE INDEX activities_user_id_idx ON public.activities (user_id);
CREATE INDEX activities_created_at_idx ON public.activities (created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- RLS Policies for activities table
-- Authenticated users can view activities
CREATE POLICY "Authenticated users can view activities" ON public.activities FOR SELECT USING (auth.role() = 'authenticated');
-- Allow inserts from authenticated users (e.g., when a new product is listed)
CREATE POLICY "Authenticated users can insert activities" ON public.activities FOR INSERT WITH CHECK (auth.role() = 'authenticated');


-- Set up Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.users;
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.investments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.activities;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update updated_at timestamp on user updates
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger to update updated_at timestamp on product updates
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger to update updated_at timestamp on order updates
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger to update updated_at timestamp on investment updates
CREATE TRIGGER update_investments_updated_at BEFORE UPDATE ON public.investments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();