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
    const sale = await (tx as any).sale.create({
      data: {
        productId,
        quantitySold,
      },
    });

    // 2. Ürüne ait reçete bilgilerini (malzemeleri) getir
    const recipes = await (tx as any).recipe.findMany({
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
    for (const recipe of recipes) {
      // Formül: (Satılan Adet * Reçete Miktarı)
      const totalDeduction = quantitySold * recipe.quantity;

      // İsteğe bağlı: Burada mevcut stok kontrolü yapıp stok yetersizse hata fırlatabilirsin.
      // Ancak genellikle restoran sistemlerinde satışın durmaması için eksiye düşmesine izin verilir 
      // ve "Low Stock" uyarısıyla müdahale edilir. biz direkt düşüyoruz:
      
      await (tx as any).inventory.update({
        where: { id: recipe.inventoryId },
        data: {
          stockLevel: {
            decrement: totalDeduction,
          },
        },
      });
    }

    return sale;
  });
}