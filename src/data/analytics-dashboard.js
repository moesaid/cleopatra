/**
 * Analytics Dashboard Data Layer
 * Mock data for main analytics dashboard
 */

// Revenue chart data (main dashboard)
export const revenueChartData = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    values: [18000, 24000, 16000, 35000, 28000, 42000, 30000, 36000, 22000, 40000, 45000, 52000]
};

// Monthly goal data
export const monthlyGoalData = {
    target: 75000,
    current: 52420,
    previousMonth: 48000,
    growth: '+9.2%'
};

// Metrics row data (top sparklines)
export const metricsData = {
    revenue: {
        label: 'Total Revenue',
        value: '$45,231.89',
        change: '+20.1%',
        trend: 'up',
        chartData: [35, 42, 38, 52, 48, 62, 58, 72, 68, 85, 82, 92]
    },
    subscriptions: {
        label: 'Subscriptions',
        value: '+2,350',
        change: '+180.1%',
        trend: 'up',
        chartData: [120, 145, 160, 155, 180, 175, 210, 195, 240, 225, 280, 310]
    },
    sales: {
        label: 'Sales',
        value: '+12,234',
        change: '+19%',
        trend: 'up',
        chartData: [450, 520, 580, 620, 750, 820, 890, 980, 1100, 1250, 1400, 1580]
    },
    activeNow: {
        label: 'Active Now',
        value: '+573',
        change: '+201',
        trend: 'up',
        chartData: [22, 28, 25, 35, 42, 38, 52, 48, 58, 62, 55, 68]
    }
};

// Sales by country data
export const salesByCountryData = [
    { country: 'United States', flag: '🇺🇸', sales: 8420, percentage: 35 },
    { country: 'United Kingdom', flag: '🇬🇧', sales: 4280, percentage: 18 },
    { country: 'Germany', flag: '🇩🇪', sales: 3120, percentage: 13 },
    { country: 'Canada', flag: '🇨🇦', sales: 2850, percentage: 12 },
    { country: 'France', flag: '🇫🇷', sales: 2340, percentage: 10 },
    { country: 'Australia', flag: '🇦🇺', sales: 1890, percentage: 8 },
    { country: 'Other', flag: '🌍', sales: 960, percentage: 4 }
];

// Transactions table data
export const transactionsData = [
    { id: 'TRX-001', customer: 'John Doe', email: 'john@example.com', product: 'Premium Plan', amount: 299.00, status: 'completed', date: '2024-01-15' },
    { id: 'TRX-002', customer: 'Jane Smith', email: 'jane@example.com', product: 'Basic Plan', amount: 99.00, status: 'completed', date: '2024-01-15' },
    { id: 'TRX-003', customer: 'Bob Wilson', email: 'bob@example.com', product: 'Enterprise', amount: 599.00, status: 'pending', date: '2024-01-14' },
    { id: 'TRX-004', customer: 'Alice Brown', email: 'alice@example.com', product: 'Premium Plan', amount: 299.00, status: 'completed', date: '2024-01-14' },
    { id: 'TRX-005', customer: 'Charlie Davis', email: 'charlie@example.com', product: 'Basic Plan', amount: 99.00, status: 'failed', date: '2024-01-13' }
];
