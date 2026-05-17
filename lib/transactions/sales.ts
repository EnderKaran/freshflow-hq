import { prisma } from "../prisma";

/**
 * Bir ürün satıldığında:
 * 1. Satış kaydını oluşturur.
 * 2. Ürünün reçetesini çeker.
 * 3. Reçetedeki her bir malzeme için stoktan düşüm yapar.
 * Tüm işlemler atomik bir transaction içinde gerçekleşir.
 */
/**
 * Executes a single sale operation using an existing Prisma transaction client.
 */
export async function executeSaleWithinTx(tx: any, productId: string, quantitySold: number) {
  // 1. Satış kaydını oluştur
  const sale = await tx.sale.create({
    data: {
      productId,
      quantitySold,
    },
  });

  // 2. Ürüne ait reçete bilgilerini (malzemeleri) getir
  // ⚡ Bolt Optimization: Removed unused relation include to prevent unnecessary database JOINs and reduce payload size.
  const recipes = await tx.recipe.findMany({
    where: { productId }
  });

  // Eğer ürünün reçetesi yoksa işlemi durdur (Hatalı veri girişi önlemi)
  if (recipes.length === 0) {
    throw new Error(`Kritik Hata: ${productId} ID'li ürünün reçetesi bulunamadı.`);
  }

  // 3. Reçeteye göre her bir malzemenin stoğunu güncelle
  // ⚡ Bolt Optimization: Executing inventory updates concurrently instead of sequentially
  // to prevent N+1 database request delays during transactions.
  await Promise.all(
    recipes.map((recipe: { inventoryId: string; quantity: number; }) => {
      const totalDeduction = quantitySold * recipe.quantity;
      return tx.inventory.update({
        where: { id: recipe.inventoryId },
        data: {
          stockLevel: {
            decrement: totalDeduction,
          },
        },
      });
    })
  );

  return sale;
}

export async function createSaleTransaction(productId: string, quantitySold: number) {
  // Prisma $transaction kullanarak tüm adımların ya hep ya hiç mantığıyla çalışmasını sağlıyoruz.
  return await prisma.$transaction(async (tx) => {
    return await executeSaleWithinTx(tx, productId, quantitySold);
  });
}