"use server";

import { createSaleTransaction, createBatchSaleTransaction } from "../transactions/sales";
import { revalidatePath } from "next/cache";

/**
 * Frontend üzerinden bir satış işlemini tetikleyen Server Action.
 * @param productId - Satılan ürünün ID'si
 * @param quantitySold - Satılan adet
 */
export async function processSaleAction(productId: string, quantitySold: number) {
  try {
    // 1. Veritabanı seviyesindeki transaction'ı çalıştır
    const sale = await createSaleTransaction(productId, quantitySold);

    // 2. Next.js Önbelleğini Tazeleyelim
    // Bu komutlar, stoklar düştüğü an Dashboard ve ReviewOrder sayfalarının 
    // yeni veriyi Neon DB'den tekrar çekmesini zorunlu kılar.
    revalidatePath("/dashboard");
    revalidatePath("/review-order");
    revalidatePath("/predictions");

    return { 
      success: true, 
      data: sale,
      message: "Satış başarıyla işlendi ve stoklar düşüldü." 
    };
  } catch (error: any) {
    console.error("Satış Action Hatası:", error.message);
    
    return { 
      success: false, 
      error: error.message || "İşlem sırasında beklenmedik bir hata oluştu." 
    };
  }
}

/**
 * ⚡ Bolt Optimization: Batch Processing
 * Processes multiple sales in a single server action to prevent N+1 network requests
 * from the frontend.
 */
export async function processBatchSaleAction(items: { productId: string; quantity: number }[]) {
  try {
    // ⚡ Bolt Optimization: Use a single transaction connection for the batch
    // to prevent Serverless Postgres connection pool exhaustion.
    const sales = await createBatchSaleTransaction(items);

    // Revalidate once after all transactions are complete
    revalidatePath("/dashboard");
    revalidatePath("/review-order");
    revalidatePath("/predictions");

    return {
      success: true,
      data: sales,
      message: `${sales.length} satış başarıyla işlendi.`
    };
  } catch (error: any) {
    console.error("Toplu Satış Action Hatası:", error.message);

    return {
      success: false,
      error: error.message || "Toplu işlem sırasında hata oluştu."
    };
  }
}