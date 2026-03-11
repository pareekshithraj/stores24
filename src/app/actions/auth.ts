"use server";
import { prisma } from "@/lib/prisma";

export async function registerUser(data: { name: string, username: string, password: string }) {
    try {
        // Check if user already exists
        const existing = await prisma.user.findUnique({ where: { username: data.username } });
        if (existing) {
            return { success: false, error: "Username or Email is already registered." };
        }

        // Creating User (With default Administration Role for new Org Signups)
        const user = await prisma.user.create({
            data: {
                name: data.name,
                username: data.username,
                role: "Administrator", // Default role for standard signup
                password: data.password // Note: In a complete production app, this should be hashed with bcrypt
            }
        });

        return { success: true, user: { id: user.id, username: user.username, role: user.role } };
    } catch (error: any) {
        return { success: false, error: error.message || "Failed to create account." };
    }
}

export async function loginUser(data: { username: string, password: string }) {
    try {
        const user = await prisma.user.findUnique({ where: { username: data.username } });

        if (!user) {
            return { success: false, error: "Invalid username or password." };
        }

        if (user.password !== data.password) {
            return { success: false, error: "Invalid username or password." };
        }

        if (user.status === "Inactive") {
            return { success: false, error: "This account has been deactivated. Please contact an administrator." };
        }

        // Optional: Update last login
        await prisma.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date() }
        });

        return { success: true, user: { id: user.id, username: user.username, name: user.name, role: user.role } };
    } catch (error: any) {
        return { success: false, error: error.message || "An authentication error occurred." };
    }
}
