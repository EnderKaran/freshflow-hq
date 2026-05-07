import { prisma } from "../prisma";


export async function createSaleTransaction(productId: string, quantitySold: number) {
  // Use a Prisma interactive transaction to ensure atomicity
  return await prisma.$transaction(async (tx: { sale: { create: (arg0: { data: { productId: string; quantitySold: number; }; }) => any; }; recipe: { findMany: (arg0: { where: { productId: string; }; }) => any; }; inventory: { update: (arg0: { where: { id: any; }; data: { stockLevel: { decrement: number; }; }; }) => any; }; }) => {
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
