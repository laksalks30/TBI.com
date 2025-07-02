import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // 1. Tambah Category
  const categories = await prisma.category.createMany({
    data: [
      { name: 'Material Bangunan' },
      { name: 'Alat Berat' },
      { name: 'Peralatan Tangan' },
      { name: 'Perlengkapan Safety' },
      { name: 'Peralatan Elektrik' },
    ],
  });

  // 2. Tambah Product
  const products = await prisma.product.createMany({
    data: [
      { name: 'Semen', categoryId: 1 },
      { name: 'Pasir', categoryId: 1 },
      { name: 'Excavator', categoryId: 2 },
      { name: 'Helm Safety', categoryId: 4 },
      { name: 'Bor Listrik', categoryId: 5 },
    ],
  });

  // 3. Tambah Stock In
  await prisma.stockIn.createMany({
    data: [
      { productId: 1, quantity: 100 },
      { productId: 2, quantity: 200 },
      { productId: 3, quantity: 3 },
      { productId: 4, quantity: 50 },
      { productId: 5, quantity: 10 },
    ],
  });

  // 4. Tambah Stock Out
  await prisma.stockOut.createMany({
    data: [
      { productId: 1, quantity: 20 },
      { productId: 2, quantity: 50 },
      { productId: 3, quantity: 1 },
      { productId: 4, quantity: 10 },
      { productId: 5, quantity: 2 },
    ],
  });

  // 5. Tambah User (password di-hash pakai bcrypt)
  const hashedPassword = await bcrypt.hash('password123', 10);

  await prisma.user.createMany({
    data: [
      { name: 'Admin One', email: 'admin1@mail.com', role: 'admin', password: hashedPassword },
      { name: 'Admin Two', email: 'admin2@mail.com', role: 'admin', password: hashedPassword },
      { name: 'Staff One', email: 'staff1@mail.com', role: 'staff', password: hashedPassword },
      { name: 'Staff Two', email: 'staff2@mail.com', role: 'staff', password: hashedPassword },
      { name: 'Staff Three', email: 'staff3@mail.com', role: 'staff', password: hashedPassword },
    ],
  });

  console.log('✅ Dummy data berhasil di-seed.');
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
