import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';  // Sesuaikan path Prisma Anda

const prisma = new PrismaClient();

// GET: Ambil semua barang keluar
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '5');
  const skip = (page - 1) * limit;

  const stockOuts = await prisma.stockOut.findMany({
    skip,
    take: limit,
    include: { product: true },
  });

  const total = await prisma.stockOut.count();

  return NextResponse.json({ data: stockOuts, total });
}


// POST: Tambah barang keluar baru
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, quantity, description } = body;

    // Cek apakah stok cukup
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product || product.stock < quantity) {
      return NextResponse.json({ error: 'Insufficient stock' }, { status: 400 });
    }

    // Buat record StockOut
    const newStockOut = await prisma.stockOut.create({
      data: {
        productId,
        quantity,
        description,
      },
    });

    // Kurangi stok produk
    await prisma.product.update({
      where: { id: productId },
      data: {
        stock: {
          decrement: quantity,
        },
      },
    });

    return NextResponse.json(newStockOut, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create stock out record' }, { status: 500 });
  }
}
