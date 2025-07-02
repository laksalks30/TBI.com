import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    const stockIn = await prisma.stockIn.findUnique({
      where: { id },
      include: { product: true },
    });

    if (!stockIn) {
      return NextResponse.json({ error: 'StockIn record not found' }, { status: 404 });
    }

    return NextResponse.json(stockIn);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stock in record' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    const body = await request.json();
    const { productId, quantity, description } = body;

    // Ambil stockIn lama
    const oldStockIn = await prisma.stockIn.findUnique({
      where: { id },
    });

    if (!oldStockIn) {
      return NextResponse.json({ error: 'StockIn record not found' }, { status: 404 });
    }

    // Update stok produk (rollback stok lama dulu, lalu tambah stok baru)
    await prisma.product.update({
      where: { id: oldStockIn.productId },
      data: {
        stock: {
          decrement: oldStockIn.quantity,
        },
      },
    });

    await prisma.product.update({
      where: { id: productId },
      data: {
        stock: {
          increment: quantity,
        },
      },
    });

    // Update record stockIn
    const updatedStockIn = await prisma.stockIn.update({
      where: { id },
      data: { productId, quantity, description },
    });

    return NextResponse.json(updatedStockIn);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update stock in record' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);

    // Ambil stockIn yang mau dihapus
    const stockIn = await prisma.stockIn.findUnique({
      where: { id },
    });

    if (!stockIn) {
      return NextResponse.json({ error: 'StockIn record not found' }, { status: 404 });
    }

    // Rollback stok produk
    await prisma.product.update({
      where: { id: stockIn.productId },
      data: {
        stock: {
          decrement: stockIn.quantity,
        },
      },
    });

    // Hapus record
    await prisma.stockIn.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'StockIn record deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete stock in record' }, { status: 500 });
  }
}
