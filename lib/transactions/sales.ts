import { prisma } from "../prisma";

/**
 * Bir ürün satıldığında:
 * 1. Satış kaydını oluşturur.
 * 2. Ürünün reçetesini çeker.
 * 3. Reçetedeki her bir malzeme için stoktan düşüm yapar.
 * Tüm işlemler atomik bir transaction içinde gerçekleşir.
 */
export async function createSaleTransaction(productId: string, quantitySold: number) {
  // Prisma $transaction kullanarak tüm adımların ya hep ya hiç mantığıyla çalışmasını sağlıyoruz.
  return await prisma.$transaction(async (tx) => {
    
    // 1. Satış kaydını oluştur
    const sale = await tx.sale.create({
      data: {
        productId,
        quantitySold,
      },
    });

    // 2. Ürüne ait reçete bilgilerini (malzemeleri) getir
    const recipes = await tx.recipe.findMany({
      where: { productId },
      include: {
        ingredient: true // Malzeme detaylarını da kontrol etmek gerekebilir
      }
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
  });
}

/**
 * Birden fazla satışı tek bir Prisma transaction'ı (tek bir DB bağlantısı) içinde işler.
 * ⚡ Bolt Optimization: Prevents Serverless DB connection pool exhaustion
 * by avoiding Promise.all() mapping over separate prisma.$transaction calls.
 */
export async function createBatchSaleTransaction(items: { productId: string; quantity: number }[]) {
  return await prisma.$transaction(async (tx) => {
    return await Promise.all(
      items.map(async (item) => {
        // 1. Satış kaydını oluştur
        const sale = await tx.sale.create({
          data: {
            productId: item.productId,
            quantitySold: item.quantity,
          },
        });

        // 2. Ürüne ait reçete bilgilerini getir
        const recipes = await tx.recipe.findMany({
          where: { productId: item.productId },
          include: {
            ingredient: true
          }
        });

        if (recipes.length === 0) {
          throw new Error(`Kritik Hata: ${item.productId} ID'li ürünün reçetesi bulunamadı.`);
        }

        // 3. Stok güncellemelerini eşzamanlı olarak gönder
        await Promise.all(
          recipes.map((recipe: { inventoryId: string; quantity: number; }) => {
            const totalDeduction = item.quantity * recipe.quantity;
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
      })
    );
  });
}