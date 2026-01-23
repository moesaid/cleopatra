/**
 * CEO Dashboard Data Layer
 * Realistic high-scale mock data for global social media platform
 */

export const ceoDashboardData = {
    // Real-time vital metrics (Pulse Bar)
    liveMetrics: {
        concurrentUsers: 245031202,
        adVelocity: 12450, // dollars per minute
        serverHealth: 99.998,
        serverStatus: 'stable', // 'stable' | 'degraded' | 'critical'
        stockPrice: 342.87,
        stockChange: 2.34,
        stockTrend: 'up', // 'up' | 'down'
    },

    // Global sentiment map data
    sentimentMap: {
        cities: [
            { name: 'New York', lat: 40.7, lng: -74, sentiment: 'positive', intensity: 95 },
            { name: 'Los Angeles', lat: 34.05, lng: -118.24, sentiment: 'neutral', intensity: 78 },
            { name: 'London', lat: 51.5, lng: -0.12, sentiment: 'positive', intensity: 88 },
            { name: 'Tokyo', lat: 35.68, lng: 139.69, sentiment: 'neutral', intensity: 92 },
            { name: 'São Paulo', lat: -23.55, lng: -46.63, sentiment: 'negative', intensity: 45 },
            { name: 'Mumbai', lat: 19.07, lng: 72.87, sentiment: 'positive', intensity: 82 },
            { name: 'Sydney', lat: -33.86, lng: 151.2, sentiment: 'neutral', intensity: 65 },
            { name: 'Berlin', lat: 52.52, lng: 13.4, sentiment: 'positive', intensity: 71 },
            { name: 'Dubai', lat: 25.2, lng: 55.27, sentiment: 'neutral', intensity: 58 },
            { name: 'Singapore', lat: 1.35, lng: 103.82, sentiment: 'positive', intensity: 89 },
        ],
        spikingTopics: [
            { tag: '#Election2026', velocity: 'critical', posts: '2.4M/hr', sentiment: 'mixed' },
            { tag: '#TechLayoffs', velocity: 'high', posts: '890K/hr', sentiment: 'negative' },
            { tag: '#AIArt', velocity: 'medium', posts: '340K/hr', sentiment: 'positive' },
            { tag: '#CryptoRebound', velocity: 'high', posts: '1.2M/hr', sentiment: 'positive' },
        ],
        overallSentiment: {
            positive: 42,
            neutral: 38,
            negative: 20,
        }
    },

    // Crisis monitor - Moderation queues
    moderationQueue: {
        aiQueue: {
            current: 1245892,
            capacity: 5000000,
            processingRate: 45000, // per second
        },
        humanQueue: {
            current: 89234,
            capacity: 100000,
            status: 'warning', // 'normal' | 'warning' | 'critical'
            avgWaitTime: '4.2 min',
        },
        recentActions: {
            removed: 234521,
            escalated: 12453,
            cleared: 892341,
        }
    },

    // Top advertisers health
    advertiserHealth: [
        { name: 'Nike', spend: '$2.4M/day', status: 'active', change: '+12%' },
        { name: 'Coca-Cola', spend: '$1.8M/day', status: 'paused', reason: 'Brand Safety Review' },
        { name: 'Samsung', spend: '$1.6M/day', status: 'active', change: '+8%' },
        { name: 'Amazon', spend: '$1.4M/day', status: 'active', change: '-3%' },
        { name: 'Disney', spend: '$1.2M/day', status: 'reduced', reason: 'Budget Cap' },
    ],

    // 24h retention data (hourly)
    retentionData: {
        hours: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
        signups: [12400, 8900, 6200, 9800, 24500, 38200, 42100, 45600, 51200, 48900, 52300, 38400],
        deactivations: [3200, 2100, 1800, 2400, 4800, 6200, 7100, 7800, 8200, 7600, 8900, 5200],
    },

    // Revenue breakdown
    revenueBreakdown: {
        subscriptions: {
            verified: 892000,
            verifiedPlus: 124000,
            dailyRevenue: 4234000,
            growth: '+18.4%',
        },
        advertising: {
            dailyRevenue: 28450000,
            impressions: '4.2B',
            cpm: 6.78,
            growth: '+5.2%',
        },
        total: {
            daily: 32684000,
            mtd: 684520000,
            yoyGrowth: '+22.1%',
        }
    }
};
