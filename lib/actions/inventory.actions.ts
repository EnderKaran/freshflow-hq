"use server";

import { prisma } from "@/lib/prisma"; // Prisma client'ı senin yapına göre import ediyoruz
import { revalidatePath } from "next/cache";

// Tüm envanteri getiren fonksiyon (Zustand'ı beslemek için)
export async function getInventoryItems() {
  try {
    // ⚡ Bolt Optimization: Added explicit select to prevent over-fetching unused timestamp fields (createdAt, updatedAt).
    // This actively minimizes egress payload size, memory footprint, and JSON serialization overhead.
    const items = await prisma.inventory.findMany({
      select: {
        id: true,
        name: true,
        stockLevel: true,
        safetyThreshold: true,
        unit: true
      },
      orderBy: { name: 'asc' }
    });
    
    return { success: true, data: items };
  } catch (error) {
    console.error("Envanter çekilirken hata oluştu:", error);
    return { success: false, error: "Veritabanına ulaşılamadı." };
  }
}

// Yeni bir ürün eklemek veya stok güncellemek için (Bonus)
export async function updateInventoryStock(id: string, newStockLevel: number) {
  try {
    const updatedItem = await prisma.inventory.update({
      where: { id },
      data: { stockLevel: newStockLevel },
    });

    // Next.js önbelleğini (cache) temizle ki UI anında güncellensin
    revalidatePath("/inventory");
    revalidatePath("/dashboard");

    return { success: true, data: updatedItem };
  } catch (error) {
    console.error("Stok güncellenirken hata:", error);
    return { success: false, error: "Stok güncellenemedi." };
  }
}