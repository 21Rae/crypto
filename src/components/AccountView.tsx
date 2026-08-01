import React, { useState } from 'react';
import { Globe, Wallet, Building2, FileText, Settings, HelpCircle, LogOut, CheckCircle2, AlertCircle, Database, Copy, Check, Code2, Plus, Trash2, RefreshCw } from 'lucide-react';
import { getSupabase, isSupabaseConfigured } from '../lib/supabase';

interface AccountViewProps {
  userEmail: string;
  connectedWallet: string | null;
  onOpenWalletModal: () => void;
  onLogout: () => void;
  onStartOnboarding: () => void;
}

export const AccountView: React.FC<AccountViewProps> = ({
  userEmail,
  connectedWallet,
  onOpenWalletModal,
  onLogout,
  onStartOnboarding,
}) => {
  const [activeTab, setActiveTab] = useState<'access' | 'wallets' | 'bank' | 'documents' | 'settings' | 'database'>('access');
  const [copiedSql, setCopiedSql] = useState(false);
  const [copiedCrud, setCopiedCrud] = useState(false);

  // Form states for test CRUD operation
  const [newSymbol, setNewSymbol] = useState('');
  const [newName, setNewName] = useState('');
  const [newTicker, setNewTicker] = useState('');
  const [newPrice, setNewPrice] = useState('0');
  const [newBalance, setNewBalance] = useState('0');
  const [assetClass, setAssetClass] = useState('Crypto');
  const [crudStatus, setCrudStatus] = useState<string | null>(null);

  const supabaseConnected = isSupabaseConfigured();

  const fullSchemaSql = `-- =====================================================================
-- ONDO / CRYPTO PORTFOLIO SUPABASE SCHEMA (WITH MIGRATIONS)
-- Paste into Supabase -> SQL Editor -> New Query -> Run
-- =====================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. CREATE TABLE IF NOT EXISTS: user_holdings
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

-- Safely add missing columns if table already existed previously
ALTER TABLE public.user_holdings ADD COLUMN IF NOT EXISTS network TEXT NOT NULL DEFAULT 'BNB Chain';
ALTER TABLE public.user_holdings ADD COLUMN IF NOT EXISTS asset_class TEXT NOT NULL DEFAULT 'Crypto';
ALTER TABLE public.user_holdings ADD COLUMN IF NOT EXISTS user_email TEXT;
ALTER TABLE public.user_holdings ADD COLUMN IF NOT EXISTS icon_bg TEXT DEFAULT 'bg-amber-400 text-black';
ALTER TABLE public.user_holdings ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false;

-- 2. CREATE TABLE IF NOT EXISTS: user_transactions
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

ALTER TABLE public.user_transactions ADD COLUMN IF NOT EXISTS network TEXT NOT NULL DEFAULT 'BNB Chain';
ALTER TABLE public.user_transactions ADD COLUMN IF NOT EXISTS user_email TEXT;

-- 3. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.user_holdings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select on holdings" ON public.user_holdings FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert holdings" ON public.user_holdings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update holdings" ON public.user_holdings FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated delete holdings" ON public.user_holdings FOR DELETE USING (true);

CREATE POLICY "Allow public select on transactions" ON public.user_transactions FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert transactions" ON public.user_transactions FOR INSERT WITH CHECK (true);

-- 4. SEED SAMPLE PORTFOLIO DATA
INSERT INTO public.user_holdings (symbol, ticker, name, asset_class, network, price, balance, icon_bg, is_verified)
VALUES 
    ('BNB', 'BNB', 'BNB', 'Crypto', 'BNB Chain', 573.10, 0.0003, 'bg-amber-400 text-black', false),
    ('PIT', 'PIT', 'Pitbull', 'Crypto', 'BNB Chain', 0.00, 0, 'bg-gray-200 text-gray-700', false),
    ('ANON INU v2', 'ANON INU v2', 'ANON INU v2', 'Crypto', 'BNB Chain', 0.00, 15.00, 'bg-gray-300 text-gray-800', false),
    ('Anonymous', 'Anonymous', 'Anonymous', 'Crypto', 'BNB Chain', 0.00, 1.00, 'bg-gray-200 text-gray-800', true)
ON CONFLICT DO NOTHING;`;

  const crudSqlRef = `-- =====================================================================
-- SUPABASE CRUD OPERATIONS REFERENCE QUERY EXAMPLES
-- =====================================================================

-- [C - CREATE] Insert a new portfolio asset:
INSERT INTO public.user_holdings (
    user_email, symbol, ticker, name, asset_class, network, price, balance, icon_bg, is_verified
) VALUES (
    'user@example.com', 'SOL', 'SOL', 'Solana', 'Crypto', 'Solana', 145.20, 2.50, 'bg-purple-600 text-white', true
);

-- [R - READ] Retrieve all portfolio holdings sorted by total USD value:
SELECT id, symbol, ticker, name, asset_class, price, balance, value, created_at 
FROM public.user_holdings 
ORDER BY value DESC, created_at DESC;

-- [U - UPDATE] Modify existing token balance or price in user portfolio:
UPDATE public.user_holdings 
SET balance = 10.50, price = 590.00, updated_at = NOW() 
WHERE ticker = 'BNB';

-- [D - DELETE] Remove an asset holding from the portfolio table:
DELETE FROM public.user_holdings 
WHERE ticker = 'PIT';

-- [SUMMARY AGGREGATION] Calculate total portfolio asset balance & value:
SELECT 
    COUNT(*) AS total_assets,
    COALESCE(SUM(value), 0) AS total_portfolio_usd,
    COALESCE(SUM(balance), 0) AS total_token_balance
FROM public.user_holdings;`;

  const copyToClipboard = (text: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreateTestAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSymbol || !newName) return;

    setCrudStatus('Inserting asset into database...');

    const client = getSupabase();
    if (client) {
      try {
        const { error } = await client.from('user_holdings').insert([
          {
            symbol: newSymbol.toUpperCase(),
            ticker: newTicker ? newTicker.toUpperCase() : newSymbol.toUpperCase(),
            name: newName,
            asset_class: assetClass,
            price: parseFloat(newPrice) || 0,
            balance: parseFloat(newBalance) || 0,
            user_email: userEmail,
            network: 'BNB Chain',
            icon_bg: 'bg-emerald-500 text-white',
            is_verified: true,
          },
        ]);

        if (error) {
          setCrudStatus(`Error: ${error.message}`);
        } else {
          setCrudStatus('Successfully created asset in Supabase user_holdings table!');
          setNewSymbol('');
          setNewName('');
          setNewTicker('');
          setNewPrice('0');
          setNewBalance('0');
        }
      } catch (err: any) {
        setCrudStatus(`Failed to connect: ${err.message}`);
      }
    } else {
      setCrudStatus('Simulated Success: Asset created locally! (Connect Supabase env variables to persist to cloud)');
      setNewSymbol('');
      setNewName('');
      setNewTicker('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-8 min-h-[70vh]">
      <div className="flex flex-col md:flex-row gap-6 md:gap-10">
        {/* Left Sidebar Navigation */}
        <div className="w-full md:w-56 flex-shrink-0 space-y-4 sm:space-y-6">
          <h1 className="text-xl sm:text-2xl font-normal text-gray-900 tracking-tight">My Account</h1>

          <nav className="space-y-1 text-xs sm:text-sm font-medium">
            <button
              type="button"
              onClick={() => setActiveTab('access')}
              className={`w-full text-left px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'access'
                  ? 'bg-[#E5E7EB] text-gray-900 font-semibold'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Access
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('wallets')}
              className={`w-full text-left px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'wallets'
                  ? 'bg-[#E5E7EB] text-gray-900 font-semibold'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Wallets
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('database')}
              className={`w-full text-left px-3.5 py-2 rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                activeTab === 'database'
                  ? 'bg-purple-100 text-purple-900 font-bold'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-purple-600" />
                <span>Database & SQL</span>
              </div>
              <span className="text-[10px] bg-purple-600 text-white font-bold px-1.5 py-0.5 rounded-full">
                CRUD
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('bank')}
              className={`w-full text-left px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'bank'
                  ? 'bg-[#E5E7EB] text-gray-900 font-semibold'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Bank Details
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('documents')}
              className={`w-full text-left px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'documents'
                  ? 'bg-[#E5E7EB] text-gray-900 font-semibold'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Documents
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-[#E5E7EB] text-gray-900 font-semibold'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Settings
            </button>

            <div className="pt-4 border-t border-gray-200/80 space-y-1">
              <a
                href="mailto:support@ondo.finance"
                className="block text-left px-3.5 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                Contact Support
              </a>

              <button
                type="button"
                onClick={onLogout}
                className="w-full text-left px-3.5 py-2 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              >
                Log Out
              </button>
            </div>
          </nav>
        </div>

        {/* Right Main Content Area */}
        <div className="flex-1 max-w-3xl w-full min-w-0">
          {activeTab === 'access' && (
            <div>
              <h2 className="text-xl sm:text-2xl font-normal text-gray-900 tracking-tight mb-6">Access</h2>

              {/* Access Card */}
              <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-8 shadow-2xs space-y-6">
                <div className="p-3 bg-gray-50 rounded-xl w-fit border border-gray-100">
                  <Globe className="w-5 h-5 text-gray-700" />
                </div>

                <div className="space-y-4 pt-2 border-t border-gray-100 text-xs sm:text-sm">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500 font-normal">Status</span>
                    <span className="px-3 py-1 bg-[#E5E7EB] text-gray-800 text-xs font-semibold rounded-md">
                      No Access
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500 font-normal">Eligibility</span>
                    <span className="text-gray-900 font-medium">
                      US and non-US{' '}
                      <a href="#qualified" className="underline hover:text-gray-600">
                        qualified purchasers
                      </a>
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-500 font-normal">Minimum</span>
                    <div className="flex items-center gap-1.5 text-gray-900 font-medium">
                      <span>5,000 USDC</span>
                      <span className="w-4 h-4 rounded-full bg-gray-200 text-gray-600 text-[10px] font-bold flex items-center justify-center cursor-help" title="Minimum requirement to mint or redeem tokenized assets">
                        ?
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    disabled
                    onClick={onStartOnboarding}
                    className="w-full py-3 bg-gray-200 text-gray-400 text-xs font-semibold rounded-xl transition-all cursor-not-allowed opacity-60 shadow-xs"
                  >
                    Complete Onboarding to Get Access
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'database' && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl sm:text-2xl font-normal text-gray-900 tracking-tight">Supabase Database & CRUD</h2>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                    supabaseConnected ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${supabaseConnected ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    {supabaseConnected ? 'Supabase Active' : 'Fallback / Local Mode'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Copy and run this SQL script in your Supabase SQL Editor to manage portfolio assets and transactions directly from Supabase.
                </p>
              </div>

              {/* Section 1: Complete SQL Schema Script */}
              <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-purple-600" />
                    <h3 className="text-sm font-bold text-gray-900">1. Portfolio Database Creation Script (DDL)</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(fullSchemaSql, setCopiedSql)}
                    className="px-3 py-1.5 bg-gray-900 hover:bg-black text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedSql ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy SQL</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="relative">
                  <pre className="bg-gray-950 text-gray-100 p-4 rounded-xl text-xs overflow-x-auto max-h-64 font-mono leading-relaxed">
                    <code>{fullSchemaSql}</code>
                  </pre>
                </div>
              </div>

              {/* Section 2: CRUD Reference SQL Queries */}
              <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-blue-600" />
                    <h3 className="text-sm font-bold text-gray-900">2. CRUD Operations Reference (Create, Read, Update, Delete)</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(crudSqlRef, setCopiedCrud)}
                    className="px-3 py-1.5 bg-gray-900 hover:bg-black text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedCrud ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy CRUD SQL</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="relative">
                  <pre className="bg-gray-950 text-gray-100 p-4 rounded-xl text-xs overflow-x-auto max-h-64 font-mono leading-relaxed">
                    <code>{crudSqlRef}</code>
                  </pre>
                </div>
              </div>

              {/* Section 3: Live Interactive CRUD Form */}
              <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-2xs space-y-4">
                <div className="border-b border-gray-100 pb-3">
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <Plus className="w-4 h-4 text-emerald-600" />
                    <span>3. Test Insert Asset to Supabase (CREATE Operation)</span>
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Test adding a new token directly to the Supabase <code className="bg-gray-100 px-1 py-0.5 rounded text-purple-700">user_holdings</code> table.
                  </p>
                </div>

                <form onSubmit={handleCreateTestAsset} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-600 font-medium mb-1">Token Symbol (e.g. SOL)</label>
                      <input
                        type="text"
                        required
                        placeholder="SOL"
                        value={newSymbol}
                        onChange={(e) => setNewSymbol(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-600 font-medium mb-1">Token Name (e.g. Solana)</label>
                      <input
                        type="text"
                        required
                        placeholder="Solana"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-600 font-medium mb-1">Price ($)</label>
                      <input
                        type="number"
                        step="any"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-600 font-medium mb-1">Balance</label>
                      <input
                        type="number"
                        step="any"
                        value={newBalance}
                        onChange={(e) => setNewBalance(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-2xs flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Execute CREATE Insert</span>
                    </button>

                    {crudStatus && (
                      <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-100">
                        {crudStatus}
                      </span>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'wallets' && (
            <div>
              <h2 className="text-xl sm:text-2xl font-normal text-gray-900 tracking-tight mb-6">Wallets</h2>
              <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-8 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gray-100 rounded-xl shrink-0">
                      <Wallet className="w-5 h-5 text-gray-800" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        {connectedWallet ? 'Connected Web3 Wallet' : 'No Wallet Connected'}
                      </div>
                      <div className="text-xs text-gray-500 break-all">
                        {connectedWallet ? connectedWallet : 'Connect MetaMask, Coinbase Wallet, or WalletConnect'}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onOpenWalletModal}
                    className="px-4 py-2 bg-[#18181B] text-white text-xs font-semibold rounded-lg hover:bg-black transition-colors cursor-pointer shrink-0"
                  >
                    {connectedWallet ? 'Change Wallet' : 'Connect Wallet'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bank' && (
            <div>
              <h2 className="text-xl sm:text-2xl font-normal text-gray-900 tracking-tight mb-6">Bank Details</h2>
              <div className="bg-white rounded-2xl border border-gray-200 p-6 text-sm text-gray-500">
                Bank wire details for minting and redeeming USD assets will appear here once onboarding is completed.
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div>
              <h2 className="text-xl sm:text-2xl font-normal text-gray-900 tracking-tight mb-6">Documents</h2>
              <div className="bg-white rounded-2xl border border-gray-200 p-6 text-sm text-gray-500">
                No active tax or KYC documents required at this time.
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-xl sm:text-2xl font-normal text-gray-900 tracking-tight mb-6">Settings</h2>
              <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 text-sm">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Email Address</span>
                  <span className="font-medium text-gray-900">{userEmail}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Two-Factor Authentication</span>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                    Enabled
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

