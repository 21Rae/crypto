export interface StockAsset {
  id: string;
  ticker: string;
  name: string;
  price: number;
  changeAmount: number;
  changePercent: number;
  isPositive: boolean;
  volume?: string;
  categories: string[];
  sparklineData: number[];
  iconBg: string;
  iconType: string;
  marketCap?: string;
  high24h?: number;
  low24h?: number;
  available247?: boolean;
  assetType?: 'stock' | 'etf' | 'crypto';
  tag?: string;
  popularityRank: number;
}

export interface TopGainer {
  ticker: string;
  name: string;
  price: number;
  changePercent: number;
  iconBg: string;
  iconLetter: string;
}

export interface TrendingAsset {
  ticker: string;
  name: string;
  price: number;
  volume: string;
  iconBg: string;
  iconLetter: string;
}

export interface NewlyAddedAsset {
  ticker: string;
  name: string;
  price: number;
  tag: string;
  iconBg: string;
  iconLetter: string;
}

export type CategoryFilter = 
  | 'All assets' 
  | '24/7 Available' 
  | 'ETF' 
  | 'Technology' 
  | 'Consumer' 
  | 'Financials' 
  | 'Large Cap' 
  | 'Growth' 
  | 'Value';

export type SortOption = 
  | 'Most Popular' 
  | 'Top Gainers' 
  | 'Top Losers' 
  | 'Price: High to Low' 
  | 'Price: Low to High';
