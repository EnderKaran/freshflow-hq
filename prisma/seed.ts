import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client/edge';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool as any);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // 1. Create Inventory items
  const wagyu = await prisma.inventory.create({
    data: { name: 'Wagyu Beef', stockLevel: 15, safetyThreshold: 20, unit: 'kg' }
  });
  const buns = await prisma.inventory.create({
    data: { name: 'Brioche Buns', stockLevel: 120, safetyThreshold: 50, unit: 'units' }
  });
  const lettuce = await prisma.inventory.create({
    data: { name: 'Romaine Lettuce', stockLevel: 40, safetyThreshold: 10, unit: 'heads' }
  });
  const oil = await prisma.inventory.create({
    data: { name: 'EV Olive Oil', stockLevel: 12, safetyThreshold: 5, unit: 'L' }
  });
  const flour = await prisma.inventory.create({
    data: { name: 'Whole Grain Flour', stockLevel: 5, safetyThreshold: 10, unit: 'bags' }
  });
  const patties = await prisma.inventory.create({
    data: { name: 'Premium Beef Patties', stockLevel: 200, safetyThreshold: 100, unit: 'lbs' }
  });
  const tomatoes = await prisma.inventory.create({
    data: { name: 'Roma Tomatoes', stockLevel: 12, safetyThreshold: 20, unit: 'crates' }
  });

  // 2. Create Products
  const wagyuBurger = await prisma.product.create({
    data: { name: 'Wagyu Burger' }
  });
  const classicBurger = await prisma.product.create({
    data: { name: 'Classic Burger' }
  });

  // 3. Create Recipes (Mapping Products to Inventory)
  // Wagyu Burger = 0.2kg Wagyu + 1 Bun + 0.1 head Lettuce + 0.01L Olive Oil
  await prisma.recipe.createMany({
    data: [
      { productId: wagyuBurger.id, inventoryId: wagyu.id, quantity: 0.2 },
      { productId: wagyuBurger.id, inventoryId: buns.id, quantity: 1 },
      { productId: wagyuBurger.id, inventoryId: lettuce.id, quantity: 0.1 },
      { productId: wagyuBurger.id, inventoryId: oil.id, quantity: 0.01 },
    ]
  });

  // Classic Burger = 0.25lbs Patties + 1 Bun + 0.1 head Lettuce + 0.02 crates Tomatoes
  await prisma.recipe.createMany({
    data: [
      { productId: classicBurger.id, inventoryId: patties.id, quantity: 0.25 },
      { productId: classicBurger.id, inventoryId: buns.id, quantity: 1 },
      { productId: classicBurger.id, inventoryId: lettuce.id, quantity: 0.1 },
      { productId: classicBurger.id, inventoryId: tomatoes.id, quantity: 0.02 },
    ]
  });

  console.log('Database seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
