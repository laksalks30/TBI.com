import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';  // Ganti path sesuai output prisma kamu

const prisma = new PrismaClient();

// GET: Ambil semua barang masuk
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '5');
  const search = searchParams.get('search') || '';
  const skip = (page - 1) * limit;

  const whereClause = search
    ? { product: { name: { contains: search, mode: 'insensitive' } } }
    : {};

  const stockIns = await prisma.stockIn.findMany({
    where: whereClause,
    skip,
    take: limit,
    include: { product: true },
  });

  const total = await prisma.stockIn.count({ where: whereClause });

  return NextResponse.json({ data: stockIns, total });
}


// POST: Tambah barang masuk baru
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, quantity, description } = body;

    // Buat record stockIn
    const newStockIn = await prisma.stockIn.create({
      data: {
        productId,
        quantity,
        description,
      },
    });

    // Update stok produk (menambah jumlah stok)
    await prisma.product.update({
      where: { id: productId },
      data: {
        stock: {
          increment: quantity,
        },
      },
    });

    return NextResponse.json(newStockIn, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create stock in record' }, { status: 500 });
  }
}
