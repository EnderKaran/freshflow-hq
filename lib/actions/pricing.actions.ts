"use server";

import { prisma } from "../prisma";
import { getAdjustedSalesForecast } from "../transactions/weatherService";
import { calculateSmartPrice } from "../pricing/engine";
import { revalidatePath } from "next/cache";

export async function optimizeMenuPricing(city: string = "Bursa") {
  try {
    // ⚡ Bolt Optimization: Parallelize independent data fetching to reduce total latency.
    // 1 & 2. Güncel Hava Durumunu Al ve Tüm Ürünleri Getir (Eşzamanlı)
    const [weather, products] = await Promise.all([
      getAdjustedSalesForecast(100, city),
      prisma.product.findMany()
    ]);
    const isRainy = weather.isRainy;
    // Not: Hava durumu servisine sıcaklık verisini de ekleyebilirsin (data.main.temp)

    // 3. Her Ürün İçin Fiyatı Güncelle
    const updates = products.map((product: { basePrice: number; category: string; id: any; }) => {
      const newPrice = calculateSmartPrice(
        product.basePrice, 
        product.category, 
        isRainy
      );

      return prisma.product.update({
        where: { id: product.id },
        data: { currentPrice: newPrice }
      });
    });

    // ⚡ Bolt Optimization: Execute updates within a single database transaction
    // instead of multiple concurrent requests with Promise.all() to prevent
    // Serverless DB connection pool exhaustion and lower network overhead.
    await prisma.$transaction(updates);
    
    revalidatePath("/dashboard");
    return { success: true, message: "Menü fiyatları hava durumuna göre optimize edildi!" };
  } catch (error) {
    return { success: false, error: "Fiyatlandırma motoru çalışırken bir hata oluştu." };
  }
}