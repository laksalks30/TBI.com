import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Seed Categories
  const category1 = await prisma.category.create({
    data: { name: 'Bahan Bangunan' },
  });

  const category2 = await prisma.category.create({
    data: { name: 'Peralatan' },
  });

  // Seed Products
  const product1 = await prisma.product.create({
    data: {
      name: 'Semen Holcim 50kg',
      categoryId: category1.id,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Paku 5cm',
      categoryId: category2.id,
    },
  });

  // Seed StockIn
  await prisma.stockIn.createMany({
    data: [
      { productId: product1.id, quantity: 100 },
      { productId: product2.id, quantity: 500 },
    ],
  });

  // Seed StockOut
  await prisma.stockOut.createMany({
    data: [
      { productId: product1.id, quantity: 20 },
      { productId: product2.id, quantity: 50 },
    ],
  });

  // Seed Users with Bcrypt Password
  const saltRounds = 10;

  const passwordAdmin = await bcrypt.hash('admin123', saltRounds);
  const passwordStaff = await bcrypt.hash('staff123', saltRounds);

  await prisma.user.createMany({
    data: [
      { name: 'Admin', email: 'admin@example.com', password: passwordAdmin, role: 'ADMIN' },
      { name: 'Staff', email: 'staff@example.com', password: passwordStaff, role: 'STAFF' },
    ],
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
