"use server";
import { prisma } from "@/lib/prisma";

export async function getSuppliers() {
    try {
        const suppliers = await prisma.supplier.findMany({
            orderBy: { name: 'asc' }
        });
        return { success: true, suppliers };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function createSupplier(data: { name: string, contact: string, phone: string, email: string, category: string }) {
    try {
        const supplier = await prisma.supplier.create({ data });
        return { success: true, supplier };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteSupplier(id: number) {
    try {
        await prisma.supplier.delete({ where: { id } });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
