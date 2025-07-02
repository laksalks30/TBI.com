import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';  // Ganti sesuai path Prisma kamu

const prisma = new PrismaClient();

// GET: Ambil semua produk
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '5');
  const search = searchParams.get('search') || '';
  const skip = (page - 1) * limit;

  const whereClause = search
    ? { name: { contains: search, mode: 'insensitive' } }
    : {};

  const products = await prisma.product.findMany({
    where: whereClause,
    skip,
    take: limit,
    include: { category: true },
  });

  const total = await prisma.product.count({ where: whereClause });

  return NextResponse.json({ data: products, total });
}

// POST: Tambah produk baru
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, stock, categoryId } = body;

    const newProduct = await prisma.product.create({
      data: {
        name,
        stock,
        categoryId,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
