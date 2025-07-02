import { PrismaClient } from '../../../node_modules/@prisma/client';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { name, email, role, password } = await req.json();

  // Cek email sudah ada atau belum
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return NextResponse.json({ error: 'Email sudah terdaftar' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      role,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ message: 'Registrasi berhasil', user: newUser });
}
