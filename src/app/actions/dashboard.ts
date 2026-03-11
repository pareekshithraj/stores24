"use server";

import { prisma } from "@/lib/prisma";

type RecentSaleRow = {
    id: number;
    bill_number: string;
    total_amount: number;
    payment_method: string;
    date: Date;
};

export async function getDashboardStats() {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        // 1. Get today's revenue sum
        const todaySales = await prisma.sales.aggregate({
            _sum: { total_amount: true },
            where: { date: { gte: startOfDay } }
        });

        // 2. Count today's total bills
        const totalBills = await prisma.sales.count({
            where: { date: { gte: startOfDay } }
        });

        // 3. Count low stock items (<= 10)
        const lowStockItems = await prisma.product.count({
            where: { stock: { lte: 10 } }
        });

        // 4. Fallback Active Cashier count
        const totalCashiers = await prisma.user.count();

        // 5. Get recent real-time activity (latest sales)
        const recentSales = await prisma.sales.findMany({
            orderBy: { date: 'desc' },
            take: 5
        }) as RecentSaleRow[];

        return {
            success: true,
            stats: {
                revenue: todaySales._sum.total_amount || 0,
                bills: totalBills,
                lowStock: lowStockItems,
                cashiers: totalCashiers || 1 // Fallback to 1 if empty
            },
            recentSales: recentSales.map((sale) => ({
                id: sale.id,
                billNumber: sale.bill_number,
                amount: sale.total_amount,
                method: sale.payment_method,
                time: processTime(sale.date)
            }))
        };
    } catch (error: any) {
        console.error("Dashboard Stats Failed:", error);
        return { success: false, error: error.message };
    }
}

function processTime(date: Date) {
    return new Intl.DateTimeFormat('en-IN', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    }).format(date);
}
