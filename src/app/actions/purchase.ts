"use server";
import { prisma } from "@/lib/prisma";

export async function getPurchaseOrders() {
    try {
        const purchases = await prisma.purchaseOrder.findMany({
            include: { supplier: true },
            orderBy: { createdAt: 'desc' }
        });
        return { success: true, purchases };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function createPurchaseOrder(data: { po_number: string, supplier_id: number, items_count: number, total_amount: number }) {
    try {
        const po = await prisma.purchaseOrder.create({ data });
        return { success: true, po };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
