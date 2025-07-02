import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';  // Ganti path sesuai Prisma kamu

const prisma = new PrismaClient();

// GET: Ambil semua user
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '5');
  const search = searchParams.get('search') || '';
  const skip = (page - 1) * limit;

  const whereClause = search
    ? { name: { contains: search, mode: 'insensitive' } }
    : {};

  const users = await prisma.user.findMany({
    where: whereClause,
    skip,
    take: limit,
  });

  const total = await prisma.user.count({ where: whereClause });

  return NextResponse.json({ data: users, total });
}



// POST: Tambah user baru
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
