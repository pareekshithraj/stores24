"use server";

import prisma from "@/lib/prisma";

export async function lookupCustomer(phone: string) {
    try {
        const customer = await prisma.customer.findUnique({
            where: { phone }
        });
        return { success: true, customer };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function registerCustomer(phone: string, name?: string) {
    try {
        const customer = await prisma.customer.create({
            data: { phone, name }
        });
        return { success: true, customer };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
