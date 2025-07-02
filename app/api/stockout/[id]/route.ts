import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    const stockOut = await prisma.stockOut.findUnique({
      where: { id },
      include: { product: true },
    });

    if (!stockOut) {
      return NextResponse.json({ error: 'StockOut record not found' }, { status: 404 });
    }

    return NextResponse.json(stockOut);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stock out record' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    const body = await request.json();
    const { productId, quantity, description } = body;

    // Ambil data stockOut lama
    const oldStockOut = await prisma.stockOut.findUnique({
      where: { id },
    });

    if (!oldStockOut) {
      return NextResponse.json({ error: 'StockOut record not found' }, { status: 404 });
    }

    // Rollback stok lama
    await prisma.product.update({
      where: { id: oldStockOut.productId },
      data: {
        stock: {
          increment: oldStockOut.quantity,
        },
      },
    });

    // Cek stok produk baru cukup gak
    const targetProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!targetProduct || targetProduct.stock < quantity) {
      return NextResponse.json({ error: 'Insufficient stock for update' }, { status: 400 });
    }

    // Kurangi stok baru
    await prisma.product.update({
      where: { id: productId },
      data: {
        stock: {
          decrement: quantity,
        },
      },
    });

    // Update stockOut
    const updatedStockOut = await prisma.stockOut.update({
      where: { id },
      data: { productId, quantity, description },
    });

    return NextResponse.json(updatedStockOut);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update stock out record' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);

    const stockOut = await prisma.stockOut.findUnique({
      where: { id },
    });

    if (!stockOut) {
      return NextResponse.json({ error: 'StockOut record not found' }, { status: 404 });
    }

    // Rollback stok barang
    await prisma.product.update({
      where: { id: stockOut.productId },
      data: {
        stock: {
          increment: stockOut.quantity,
        },
      },
    });

    await prisma.stockOut.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'StockOut record deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete stock out record' }, { status: 500 });
  }
}
