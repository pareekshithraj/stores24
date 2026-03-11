"use server";
import prisma from "@/lib/prisma";

type FinancialSaleRow = {
    bill_number: string;
    total_amount: number;
    payment_method: string;
    date: Date;
    saleItems: {
        quantity: number;
    }[];
};

type ProductRow = {
    name: string;
    barcode: string;
    stock: number;
    price: number;
};

type TaxSaleItemRow = {
    price: number;
    quantity: number;
    product: {
        name: string;
        gst_percentage: number;
    };
    sale: {
        date: Date;
        bill_number: string;
    };
};

export async function getFinancialReport() {
    try {
        const sales = await prisma.sales.findMany({
            include: { saleItems: true },
            orderBy: { date: 'desc' }
        }) as FinancialSaleRow[];

        let totalRevenue = 0;
        let totalItems = 0;

        const data = sales.map((sale) => {
            totalRevenue += sale.total_amount;
            totalItems += sale.saleItems.reduce((acc, item) => acc + item.quantity, 0);
            return {
                Date: sale.date.toISOString().split('T')[0],
                Bill_Number: sale.bill_number,
                Payment_Method: sale.payment_method,
                Total_Amount_INR: sale.total_amount
            };
        });

        return { success: true, data };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function getStockValuationReport() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { name: 'asc' }
        }) as ProductRow[];

        const data = products.map((product) => {
            return {
                Product_Name: product.name,
                Barcode: product.barcode,
                Current_Stock: product.stock,
                Unit_Price_INR: product.price,
                Total_Value_INR: product.stock * product.price
            };
        });

        return { success: true, data };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function getLowStockReport() {
    try {
        const products = await prisma.product.findMany({
            where: { stock: { lte: 10 } },
            orderBy: { stock: 'asc' }
        }) as ProductRow[];

        const data = products.map((product) => {
            return {
                Product_Name: product.name,
                Barcode: product.barcode,
                Current_Stock: product.stock,
                Alert_Threshold: 10,
                Supplier_Required: "Yes"
            };
        });

        return { success: true, data };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function getTaxReport() {
    try {
        const salesItems = await prisma.saleItem.findMany({
            include: { product: true, sale: true }
        }) as TaxSaleItemRow[];

        const data = salesItems.map((item) => {
            const rawPriceBeforeTax = item.price / (1 + (item.product.gst_percentage / 100));
            const taxAmount = (item.price - rawPriceBeforeTax) * item.quantity;

            return {
                Date: item.sale.date.toISOString().split('T')[0],
                Bill_Number: item.sale.bill_number,
                Product: item.product.name,
                Quantity: item.quantity,
                GST_Percentage: `${item.product.gst_percentage}%`,
                Tax_Collected_INR: taxAmount.toFixed(2)
            };
        });

        return { success: true, data };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
