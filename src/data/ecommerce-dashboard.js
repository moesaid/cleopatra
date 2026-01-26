/**
 * eCommerce Dashboard Data Layer
 * Mock data for sales metrics, charts, and categories
 */

export const ecommerceDashboardData = {
    metrics: {
        revenue: { chartData: [28, 35, 42, 38, 52, 48, 62, 58, 72, 68, 85, 92] },
        orders: { chartData: [120, 145, 160, 155, 180, 175, 210, 195, 240, 225, 280, 310] },
        customers: { chartData: [450, 520, 580, 620, 750, 820, 890, 980, 1100, 1250, 1400, 1580] }
    },
    salesChart: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            { name: "This Period", data: [28, 35, 42, 38, 52, 48, 62, 75, 72, 85, 92, 128] },
            { name: "Last Period", data: [22, 28, 35, 32, 42, 38, 48, 55, 58, 68, 75, 95] }
        ]
    },
    categories: [
        { name: 'Electronics', value: 42580 },
        { name: 'Fashion', value: 35290 },
        { name: 'Home & Garden', value: 28140 },
        { name: 'Sports', value: 22420 }
    ]
};
