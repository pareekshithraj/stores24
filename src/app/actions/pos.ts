"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function processCheckout(payload: {
    paymentMethod: string;
    totalAmount: number;
    items: { id: number; quantity: number; price: number }[];
    customerId?: number;
}) {
    try {
        const result = await prisma.$transaction(async (tx: any) => {
            // 1. Create the base Sale record
            const sale = await tx.sales.create({
                data: {
                    bill_number: `POS-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                    total_amount: payload.totalAmount,
                    payment_method: payload.paymentMethod,
                    customer_id: payload.customerId || null,
                }
            });

            // 2. Iterate over items to create SaleItems and deduct stock
            for (const item of payload.items) {
                // Create the individual line item associated with the sale
                await tx.saleItem.create({
                    data: {
                        sale_id: sale.id,
                        product_id: item.id,
                        quantity: item.quantity,
                        price: item.price,
                    }
                });

                // Deduct inventory
                await tx.product.update({
                    where: { id: item.id },
                    data: { stock: { decrement: item.quantity } }
                });
            }

            // 3. Award loyalty points if a customer is linked
            let pointsEarned = 0;
            if (payload.customerId) {
                pointsEarned = Math.floor(payload.totalAmount / 100); // 1 point per 100 INR
                if (pointsEarned > 0) {
                    await tx.customer.update({
                        where: { id: payload.customerId },
                        data: { total_points: { increment: pointsEarned } }
                    });
                }
            }

            return { sale, pointsEarned };
        });

        // Invalidate caches to refresh data across dashboards
        revalidatePath("/stores24/pos");
        revalidatePath("/stores24/dashboard");
        revalidatePath("/stores24/inventory");
        revalidatePath("/stores24/sales");

        return { success: true, billNumber: result.sale.bill_number, pointsEarned: result.pointsEarned };
    } catch (error: any) {
        console.error("Checkout failed:", error);
        return { success: false, error: error.message || "Failed to process transaction." };
    }
}
