import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";

/**
 * Creates a sale and automatically deducts the corresponding inventory
 * based on the product's recipe. This guarantees atomic updates.
 */
export async function createSaleTransaction(productId: string, quantitySold: number) {
  // Use a Prisma interactive transaction to ensure atomicity
  return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    // 1. Create the Sale record
    const sale = await tx.sale.create({
      data: {
        productId,
        quantitySold,
      },
    });

    // 2. Fetch the recipe requirements for the product
    const recipes = await tx.recipe.findMany({
      where: { productId },
    });

    if (recipes.length === 0) {
      throw new Error(`Product ${productId} has no associated recipe ingredients.`);
    }

    // 3. Deduct inventory automatically according to the formula:
    // (Sold Product Count * Recipe Quantity) = Deducted Stock
    for (const recipe of recipes) {
      const deductedStock = quantitySold * recipe.quantity;

      await tx.inventory.update({
        where: { id: recipe.inventoryId },
        data: {
          stockLevel: {
            decrement: deductedStock,
          },
        },
      });
    }

    return sale;
  });
}
