import { NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// GET: Ambil semua user dengan pagination dan search
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '5');
  const search = searchParams.get('search') || '';
  const skip = (page - 1) * limit;

  const whereClause: Prisma.UserWhereInput = search
    ? {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      }
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
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, role } = body;

    // Hash password pakai bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('User creation failed:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
