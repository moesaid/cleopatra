// Crypto Dashboard Data Layer
// Mock data for the Web3 Market Dashboard

export const cryptoMarketData = {
    // Trending tokens for top row (matching reference image)
    trendingTokens: [
        {
            id: 'celestia',
            name: 'Celestia',
            ticker: 'TIA',
            badge: 'Proof of Stake',
            price: 3.038,
            change: 2.64,
            chartData: [2.8, 2.9, 2.7, 2.85, 3.0, 2.95, 3.1, 3.0, 2.9, 3.05, 3.1, 3.038]
        },
        {
            id: 'solayer',
            name: 'Solayer',
            ticker: 'LAYER',
            badge: 'LAYER',
            price: 1.00,
            change: 9.62,
            chartData: [0.85, 0.88, 0.92, 0.90, 0.95, 0.98, 0.96, 1.02, 1.05, 1.03, 1.01, 1.00]
        },
        {
            id: 'litecoin',
            name: 'Litecoin',
            ticker: 'LTC',
            badge: 'Proof of Stake',
            price: 108.05,
            change: -5.59,
            chartData: [115, 112, 110, 113, 108, 105, 110, 112, 106, 108, 105, 108.05]
        },
        {
            id: 'hyperliquid',
            name: 'Hyperliquid',
            ticker: 'HYPE',
            badge: 'Proof of Stake',
            price: 14.14,
            change: -3.93,
            chartData: [15, 14.8, 14.5, 14.8, 14.2, 14.5, 14.0, 14.3, 13.8, 14.0, 14.2, 14.14]
        },
        {
            id: 'avalanche',
            name: 'Avalanche',
            ticker: 'AVAX',
            badge: 'Proof of Stake',
            price: 18.247,
            change: 3.56,
            chartData: [17, 17.5, 17.2, 17.8, 18.0, 17.6, 18.2, 18.5, 18.1, 18.4, 18.3, 18.247]
        }
    ],

    // Market table data (matching reference image)
    marketTable: [
        { rank: 1, name: 'Bitcoin', ticker: 'BTC', price: 80374.47, h0: -0.54, h24: -2.86, d7: 5.56, marketCap: 1.59e12, volume: 41.48e9, chartData: [78, 80, 79, 82, 81, 80, 79, 81, 80, 82], isFavorite: false },
        { rank: 2, name: 'Ethereum', ticker: 'ETH', price: 1842.07, h0: -0.65, h24: -2.23, d7: 12.43, marketCap: 222.45e9, volume: 22.56e9, chartData: [88, 90, 89, 91, 90, 92, 91, 93, 92, 94], isFavorite: false },
        { rank: 3, name: 'Tether', ticker: 'USDT', price: 0.9999, h0: 0.00, h24: -0.01, d7: -0.01, marketCap: 143.26e9, volume: 69.12e9, chartData: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100], isFavorite: false },
        { rank: 4, name: 'XRP', ticker: 'XRP', price: 2.2235, h0: -2.54, h24: -2.93, d7: 15.89, marketCap: 129.05e9, volume: 5.52e9, chartData: [48, 50, 49, 52, 55, 53, 56, 58, 57, 60], isFavorite: false },
        { rank: 5, name: 'BNB', ticker: 'BNB', price: 571.81, h0: -4.65, h24: -1.32, d7: -6.25, marketCap: 81.52e9, volume: 32.29e9, chartData: [95, 93, 90, 88, 85, 84, 82, 80, 78, 75], isFavorite: true },
        { rank: 6, name: 'Polygon', ticker: 'MATIC', price: 0.2174, h0: -0.13, h24: -6.48, d7: 12.92, marketCap: 123.39e9, volume: 42.71e9, chartData: [75, 78, 82, 85, 88, 90, 92, 95, 98, 100], isFavorite: false }
    ],

    // Exchange data for bottom section (matching reference image)
    exchanges: [
        { id: 'indodax', name: 'Indodax', totalAsset: 21.82e6, change: -5.33 },
        { id: 'cryptocom', name: 'Crypto.com', totalAsset: 3.02e9, change: 16.02 },
        { id: 'kraken', name: 'Kraken', totalAsset: 983.02e6, change: -9.52 },
        { id: 'binance', name: 'Binance', totalAsset: 111.04e9, change: 15.26 },
        { id: 'coinbase', name: 'Coinbase', totalAsset: 838.23e6, change: -3.02 }
    ],

    // Tab categories for market table
    tabCategories: ['Top', 'Trending', 'Gainers', 'Decliner', 'New-Launch', 'Most Visited']
};

// Utility functions for formatting
export function formatCurrency(value, compact = false) {
    if (compact) {
        if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
        if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
        if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
        return `$${value.toLocaleString()}`;
    }
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatPercent(value) {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
}
