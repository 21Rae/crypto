-- =====================================================================
-- ONDO / CRYPTO PORTFOLIO SUPABASE DATABASE SCHEMA & CRUD OPERATIONS
-- Copy and paste this script directly into your Supabase SQL Editor:
-- Dashboard -> SQL Editor -> New Query -> Run
-- =====================================================================

-- 1. CREATE EXTENSION FOR UUID GENERATION (IF NOT EXISTS)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ---------------------------------------------------------------------
-- 2. CREATE OR ALTER TABLE: user_holdings (Portfolio Assets)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_holdings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    user_email TEXT,
    symbol TEXT NOT NULL,
    ticker TEXT NOT NULL,
    name TEXT NOT NULL,
    asset_class TEXT NOT NULL DEFAULT 'Crypto',
    network TEXT NOT NULL DEFAULT 'BNB Chain',
    price NUMERIC(18, 8) NOT NULL DEFAULT 0.00,
    balance NUMERIC(28, 8) NOT NULL DEFAULT 0.00,
    value NUMERIC(18, 2) GENERATED ALWAYS AS (price * balance) STORED,
    icon_bg TEXT DEFAULT 'bg-amber-400 text-black',
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Safely ensure all columns exist if the table was created earlier without them
ALTER TABLE public.user_holdings ADD COLUMN IF NOT EXISTS network TEXT NOT NULL DEFAULT 'BNB Chain';
ALTER TABLE public.user_holdings ADD COLUMN IF NOT EXISTS asset_class TEXT NOT NULL DEFAULT 'Crypto';
ALTER TABLE public.user_holdings ADD COLUMN IF NOT EXISTS user_email TEXT;
ALTER TABLE public.user_holdings ADD COLUMN IF NOT EXISTS icon_bg TEXT DEFAULT 'bg-amber-400 text-black';
ALTER TABLE public.user_holdings ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false;

-- ---------------------------------------------------------------------
-- 3. CREATE OR ALTER TABLE: user_transactions (Recent Portfolio Transactions)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    user_email TEXT,
    type TEXT NOT NULL,
    network TEXT NOT NULL DEFAULT 'BNB Chain',
    token_symbol TEXT NOT NULL,
    amount NUMERIC(28, 8) NOT NULL DEFAULT 0.00,
    usd_value NUMERIC(18, 2) NOT NULL DEFAULT 0.00,
    status TEXT NOT NULL DEFAULT 'Completed',
    tx_hash TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Safely ensure columns exist for transactions table
ALTER TABLE public.user_transactions ADD COLUMN IF NOT EXISTS network TEXT NOT NULL DEFAULT 'BNB Chain';
ALTER TABLE public.user_transactions ADD COLUMN IF NOT EXISTS user_email TEXT;

-- ---------------------------------------------------------------------
-- 4. CREATE TABLE: portfolio_summaries (Totals per User)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.portfolio_summaries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    user_email TEXT UNIQUE,
    total_assets_usd NUMERIC(18, 2) DEFAULT 0.15,
    total_balance NUMERIC(28, 8) DEFAULT 16.0003,
    change_24h_usd NUMERIC(18, 2) DEFAULT 0.00,
    change_24h_percent NUMERIC(8, 4) DEFAULT 0.00,
    usdt_balance NUMERIC(18, 2) DEFAULT 0.00,
    usdc_balance NUMERIC(18, 2) DEFAULT 0.00,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ---------------------------------------------------------------------
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ---------------------------------------------------------------------

-- Enable RLS on all tables
ALTER TABLE public.user_holdings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_summaries ENABLE ROW LEVEL SECURITY;

-- DROP EXISTING POLICIES IF RE-RUNNING
DROP POLICY IF EXISTS "Allow authenticated users to read their own holdings" ON public.user_holdings;
DROP POLICY IF EXISTS "Allow authenticated users to insert their own holdings" ON public.user_holdings;
DROP POLICY IF EXISTS "Allow authenticated users to update their own holdings" ON public.user_holdings;
DROP POLICY IF EXISTS "Allow authenticated users to delete their own holdings" ON public.user_holdings;
DROP POLICY IF EXISTS "Allow public select on holdings" ON public.user_holdings;

DROP POLICY IF EXISTS "Allow authenticated users to read transactions" ON public.user_transactions;
DROP POLICY IF EXISTS "Allow authenticated users to insert transactions" ON public.user_transactions;
DROP POLICY IF EXISTS "Allow public select on transactions" ON public.user_transactions;

-- RLS POLICIES FOR user_holdings
CREATE POLICY "Allow public select on holdings" 
    ON public.user_holdings FOR SELECT 
    USING (true);

CREATE POLICY "Allow authenticated users to insert holdings" 
    ON public.user_holdings FOR INSERT 
    WITH CHECK (auth.uid() = user_id OR auth.role() = 'authenticated' OR user_id IS NULL);

CREATE POLICY "Allow authenticated users to update holdings" 
    ON public.user_holdings FOR UPDATE 
    USING (auth.uid() = user_id OR auth.role() = 'authenticated' OR user_id IS NULL);

CREATE POLICY "Allow authenticated users to delete holdings" 
    ON public.user_holdings FOR DELETE 
    USING (auth.uid() = user_id OR auth.role() = 'authenticated' OR user_id IS NULL);

-- RLS POLICIES FOR user_transactions
CREATE POLICY "Allow public select on transactions" 
    ON public.user_transactions FOR SELECT 
    USING (true);

CREATE POLICY "Allow authenticated users to insert transactions" 
    ON public.user_transactions FOR INSERT 
    WITH CHECK (auth.uid() = user_id OR auth.role() = 'authenticated' OR user_id IS NULL);

-- RLS POLICIES FOR portfolio_summaries
CREATE POLICY "Allow public select on summaries" 
    ON public.portfolio_summaries FOR SELECT 
    USING (true);

CREATE POLICY "Allow authenticated user summary update" 
    ON public.portfolio_summaries FOR ALL 
    USING (true);


-- ---------------------------------------------------------------------
-- 6. SEED DEFAULT SAMPLE HOLDINGS & TRANSACTIONS DATA
-- ---------------------------------------------------------------------
INSERT INTO public.user_holdings (symbol, ticker, name, asset_class, network, price, balance, icon_bg, is_verified)
VALUES 
    ('BNB', 'BNB', 'BNB', 'Crypto', 'BNB Chain', 573.10, 0.0003, 'bg-amber-400 text-black', false),
    ('PIT', 'PIT', 'Pitbull', 'Crypto', 'BNB Chain', 0.00, 0, 'bg-gray-200 text-gray-700', false),
    ('ANON INU v2', 'ANON INU v2', 'ANON INU v2', 'Crypto', 'BNB Chain', 0.00, 15.00, 'bg-gray-300 text-gray-800', false),
    ('Anonymous', 'Anonymous', 'Anonymous', 'Crypto', 'BNB Chain', 0.00, 1.00, 'bg-gray-200 text-gray-800', true),
    ('ANON INU', 'ANON INU', 'ANON INU', 'Crypto', 'BNB Chain', 0.00, 0, 'bg-gray-200 text-gray-700', false),
    ('GMLU', 'GMLU', 'Gimlu', 'Crypto', 'BNB Chain', 0.00, 0, 'bg-gray-200 text-gray-700', true)
ON CONFLICT DO NOTHING;

INSERT INTO public.user_transactions (type, network, token_symbol, amount, usd_value, status, tx_hash, created_at)
VALUES
    ('Sent', 'BNB Chain', 'BNB', 0.0001, 0.05, 'Completed', '0x8f2a...39b1', NOW() - INTERVAL '2 hours'),
    ('Swapped', 'BNB Chain', 'ANON INU v2', 15.00, 0.00, 'Completed', '0x1c4e...a92f', NOW() - INTERVAL '1 day')
ON CONFLICT DO NOTHING;


-- ---------------------------------------------------------------------
-- 7. SQL CRUD OPERATIONS REFERENCE (RUN OR CALL FROM CLIENT/SQL EDITOR)
-- ---------------------------------------------------------------------

-- [CREATE / INSERT] Add a new token holding to user portfolio:
-- INSERT INTO public.user_holdings (user_id, user_email, symbol, ticker, name, asset_class, network, price, balance, icon_bg, is_verified)
-- VALUES (auth.uid(), 'user@example.com', 'SOL', 'SOL', 'Solana', 'Crypto', 'Solana', 145.20, 2.50, 'bg-purple-600 text-white', true);

-- [READ / SELECT] Fetch all holdings for current user or all:
-- SELECT * FROM public.user_holdings ORDER BY value DESC, created_at DESC;

-- [UPDATE] Update asset balance or price in portfolio:
-- UPDATE public.user_holdings 
-- SET balance = 1.00, price = 600.00, updated_at = NOW() 
-- WHERE ticker = 'BNB';

-- [DELETE] Remove asset from user portfolio:
-- DELETE FROM public.user_holdings WHERE ticker = 'PIT';

-- [SUMMARY AGGREGATION QUERY] Automatically calculate total portfolio value:
-- SELECT 
--    COALESCE(SUM(value), 0) AS total_portfolio_usd,
--    COALESCE(SUM(balance), 0) AS total_tokens_count
-- FROM public.user_holdings;
