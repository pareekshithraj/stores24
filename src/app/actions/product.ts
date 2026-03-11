"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getProducts() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return { success: true, products };
    } catch (error: any) {
        console.error("Failed to fetch products:", error);
        return { success: false, error: error.message };
    }
}

export async function createProduct(data: { name: string, barcode: string, price: number, gst_percentage: number, stock: number }) {
    try {
        const product = await prisma.product.create({
            data: {
                name: data.name,
                barcode: data.barcode,
                price: data.price,
                gst_percentage: data.gst_percentage,
                stock: data.stock,
            }
        });
        revalidatePath("/stores24/products");
        return { success: true, product };
    } catch (error: any) {
        if (error.code === 'P2002') {
            return { success: false, error: "A product with this barcode already exists." };
        }
        return { success: false, error: error.message };
    }
}

export async function deleteProduct(id: number) {
    try {
        await prisma.product.delete({
            where: { id }
        });
        revalidatePath("/stores24/products");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
