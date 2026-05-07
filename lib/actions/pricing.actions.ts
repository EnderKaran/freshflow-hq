"use server";

import { prisma } from "../prisma";
import { getAdjustedSalesForecast } from "../transactions/weatherService";
import { calculateSmartPrice } from "../pricing/engine";
import { revalidatePath } from "next/cache";

export async function optimizeMenuPricing(city: string = "Bursa") {
  try {
    // 1. Güncel Hava Durumunu Al
    const weather = await getAdjustedSalesForecast(100, city);
    const isRainy = weather.isRainy;
    // Not: Hava durumu servisine sıcaklık verisini de ekleyebilirsin (data.main.temp)

    // 2. Tüm Ürünleri Getir
    const products = await prisma.product.findMany();

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

    await Promise.all(updates);
    
    revalidatePath("/dashboard");
    return { success: true, message: "Menü fiyatları hava durumuna göre optimize edildi!" };
  } catch (error) {
    return { success: false, error: "Fiyatlandırma motoru çalışırken bir hata oluştu." };
  }
}