/**
 * Logistics Dashboard Data Layer
 * Centralized mock data for the Logistics & Financial Dashboard.
 */

export const logisticsDashboardData = {
    // ─────────────────────────────────────────────────────────────────────────
    // Top Row: Delivery Metrics
    // ─────────────────────────────────────────────────────────────────────────
    deliveryMetrics: {
        fleetUtilization: {
            value: "95.1%",
            label: "Fleet Utilization",
            chartData: [40, 65, 50, 80, 70, 95] // for mini bar chart
        },
        onTimeDelivery: {
            value: "92.8%",
            label: "On-Time Delivery",
            percentage: 92.8 // for gauge
        },
        totalDeliveries: {
            value: "24.5k",
            label: "Total Deliveries",
            growth: "+14%",
            chartData: [20, 35, 30, 45, 40, 60, 55, 75, 70, 90] // for sparkline
        }
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Middle Row: Revenue & Costs Chart
    // ─────────────────────────────────────────────────────────────────────────
    revenueChart: {
        labels: ["Aug 05", "Aug 06", "Aug 07", "Aug 08", "Aug 09", "Aug 10", "Aug 11", "Aug 12", "Aug 13", "Aug 14", "Aug 15", "Aug 16"],
        datasets: [
            {
                name: "Revenue",
                type: "line",
                data: [65, 72, 68, 85, 92, 88, 105, 115, 120, 118, 135, 142]
            },
            {
                name: "Costs",
                type: "line",
                data: [45, 50, 48, 55, 60, 58, 65, 70, 75, 72, 80, 85]
            },
            {
                name: "Net Profit",
                type: "line",
                data: [20, 22, 20, 30, 32, 30, 40, 45, 45, 46, 55, 57]
            }
        ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Bottom Row: Balance & Categorization
    // ─────────────────────────────────────────────────────────────────────────
    cashBalance: {
        value: "$126,500",
        label: "Cash Balance",
        chartData: [ // Mixed positive/negative bars
            { x: 'Mon', y: 35 },
            { x: 'Tue', y: 45 },
            { x: 'Wed', y: -15 },
            { x: 'Thu', y: 55 },
            { x: 'Fri', y: 60 },
            { x: 'Sat', y: -10 },
            { x: 'Sun', y: 40 }
        ]
    },

    costsByCategory: [
        { label: "Fuel", amount: "$45.2k", percentage: 75, color: "bg-primary" },
        { label: "Salaries", amount: "$32.8k", percentage: 60, color: "bg-purple-500" },
        { label: "Maintenance", amount: "$12.4k", percentage: 35, color: "bg-amber-500" },
        { label: "Legal", amount: "$4.1k", percentage: 15, color: "bg-rose-500" }
    ],

    // ─────────────────────────────────────────────────────────────────────────
    // Right Column: Invoices Module
    // ─────────────────────────────────────────────────────────────────────────
    invoiceStats: {
        paid: "$169k",
        resent: "$95k",
        unpaid: "$64k",
        segments: [ // Ratios for the progress bar
            { label: 'Paid', percent: 52, color: 'bg-emerald-500' },
            { label: 'Resent', percent: 28, color: 'bg-lime-400' },
            { label: 'Unpaid', percent: 20, color: 'bg-zinc-200 dark:bg-zinc-700' }
        ]
    },

    invoices: [
        {
            company: "Uber",
            logo: "fab fa-uber", // FontAwesome class
            date: "08/12/26",
            email: "billing@uber.com",
            value: "$12,450.00",
            status: "Unpaid"
        },
        {
            company: "Stripe",
            logo: "fab fa-stripe-s",
            date: "08/11/26",
            email: "invoice@stripe.com",
            value: "$8,230.50",
            status: "Resent"
        },
        {
            company: "Airbnb",
            logo: "fab fa-airbnb",
            date: "08/10/26",
            email: "acct@airbnb.com",
            value: "$15,100.00",
            status: "Paid"
        },
        {
            company: "Spotify",
            logo: "fab fa-spotify",
            date: "08/09/26",
            email: "finance@spotify.com",
            value: "$5,600.00",
            status: "Paid"
        },
        {
            company: "Slack",
            logo: "fab fa-slack",
            date: "08/08/26",
            email: "billing@slack.com",
            value: "$3,450.00",
            status: "Unpaid"
        },
        {
            company: "Discord",
            logo: "fab fa-discord",
            date: "08/08/26",
            email: "billing@discord.com",
            value: "$1,200.00",
            status: "Unpaid"
        }
    ]
};
