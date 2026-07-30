-- =====================================================================
-- SUPABASE SQL SCHEMA FOR USER DASHBOARD MANAGEMENT
-- Execute this script in the Supabase SQL Editor (https://supabase.com/dashboard)
-- =====================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ---------------------------------------------------------------------
-- 1. USER DASHBOARDS TABLE
-- Stores summary metrics and balances for each user's dashboard.
-- Values updated here will reflect directly on the user's main dashboard.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_dashboards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    wallet_address TEXT DEFAULT '0xD74f...Fa47',
    total_balance NUMERIC(18, 2) NOT NULL DEFAULT 0.15,
    cash_balance NUMERIC(18, 2) NOT NULL DEFAULT 0.00,
    invested_amount NUMERIC(18, 2) NOT NULL DEFAULT 0.15,
    daily_change NUMERIC(18, 2) NOT NULL DEFAULT 0.00,
    daily_change_percent NUMERIC(8, 4) NOT NULL DEFAULT 0.0000,
    timeframe_selected TEXT NOT NULL DEFAULT '1D',
    currency TEXT NOT NULL DEFAULT 'USD',
    is_onboarded BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- 2. USER HOLDINGS TABLE
-- Stores individual crypto, stock, or Ondo asset holdings for each user.
-- Edit or insert rows here to modify the user's holdings list.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_holdings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    ticker TEXT NOT NULL,
    name TEXT NOT NULL,
    asset_class TEXT NOT NULL DEFAULT 'Crypto', -- e.g., 'Crypto', 'Ondo', 'ETF', 'Stock'
    price NUMERIC(18, 6) NOT NULL DEFAULT 0.00,
    balance NUMERIC(24, 8) NOT NULL DEFAULT 0.00,
    total_value NUMERIC(18, 2) NOT NULL DEFAULT 0.00,
    symbol TEXT DEFAULT '💰',
    icon_bg TEXT DEFAULT 'bg-amber-400 text-black',
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- 3. USER TRANSACTIONS TABLE
-- Stores user transaction history displayed in the dashboard.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    tx_hash TEXT,
    type TEXT NOT NULL, -- 'Buy', 'Sell', 'Transfer', 'Deposit', 'Withdraw'
    asset_ticker TEXT NOT NULL,
    asset_name TEXT NOT NULL,
    amount NUMERIC(24, 8) NOT NULL,
    value_usd NUMERIC(18, 2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'Completed', -- 'Completed', 'Pending', 'Failed'
    network TEXT DEFAULT 'Ethereum',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- 4. SYSTEM DASHBOARD CONFIG & FEATURE FLAGS TABLE
-- Global or user-specific settings controlled directly from database.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.dashboard_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key TEXT UNIQUE NOT NULL,
    setting_value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- 5. AUTOMATIC UPDATED_AT TRIGGER
-- Automatically updates updated_at column on changes.
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_user_dashboards_updated_at
    BEFORE UPDATE ON public.user_dashboards
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_user_holdings_updated_at
    BEFORE UPDATE ON public.user_holdings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- Enables users to view and update their own data while allowing 
-- admins to modify values directly in the Supabase Table Editor.
-- ---------------------------------------------------------------------
ALTER TABLE public.user_dashboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_holdings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dashboard_settings ENABLE ROW LEVEL SECURITY;

-- User Dashboards Policies
CREATE POLICY "Users can view their own dashboard"
    ON public.user_dashboards FOR SELECT
    USING (auth.uid() = user_id OR auth.role() = 'service_role');

CREATE POLICY "Users can update their own dashboard"
    ON public.user_dashboards FOR UPDATE
    USING (auth.uid() = user_id OR auth.role() = 'service_role');

CREATE POLICY "Users can insert their own dashboard"
    ON public.user_dashboards FOR INSERT
    WITH CHECK (auth.uid() = user_id OR auth.role() = 'service_role');

-- User Holdings Policies
CREATE POLICY "Users can view their own holdings"
    ON public.user_holdings FOR SELECT
    USING (auth.uid() = user_id OR auth.role() = 'service_role');

CREATE POLICY "Users can manage their own holdings"
    ON public.user_holdings FOR ALL
    USING (auth.uid() = user_id OR auth.role() = 'service_role');

-- User Transactions Policies
CREATE POLICY "Users can view their own transactions"
    ON public.user_transactions FOR SELECT
    USING (auth.uid() = user_id OR auth.role() = 'service_role');

-- Dashboard Settings Policies
CREATE POLICY "Anyone authenticated can view settings"
    ON public.dashboard_settings FOR SELECT
    TO authenticated
    USING (true);

-- ---------------------------------------------------------------------
-- 7. INITIAL SAMPLE DATA
-- Insert default system settings
-- ---------------------------------------------------------------------
INSERT INTO public.dashboard_settings (setting_key, setting_value, description)
VALUES 
    ('maintenance_mode', 'false'::jsonb, 'Toggle maintenance mode for dashboard'),
    ('supported_networks', '["Ethereum", "BNB Chain", "Polygon", "Solana", "Arbitrum"]'::jsonb, 'List of active networks'),
    ('default_currency', '"USD"'::jsonb, 'Default display currency')
ON CONFLICT (setting_key) DO UPDATE 
SET setting_value = EXCLUDED.setting_value;
