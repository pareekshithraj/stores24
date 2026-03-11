"use server";
import prisma from "@/lib/prisma";

export async function getStaff() {
    try {
        const staff = await prisma.user.findMany({
            orderBy: { name: 'asc' }
        });
        return { success: true, staff };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function createStaff(data: { name: string, username: string, role: string, password: string }) {
    try {
        const staff = await prisma.user.create({ data });
        return { success: true, staff };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
