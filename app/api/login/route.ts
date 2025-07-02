import { PrismaClient } from '../../../node_modules/@prisma/client'; // Adjust the import path based on your project structure
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ error: 'User tidak ditemukan' }, { status: 404 });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return NextResponse.json({ error: 'Password salah' }, { status: 401 });
  }

  // Simpan session di cookie
  const response = NextResponse.json({ message: 'Login berhasil' });
  response.cookies.set('user_email', user.email);
  response.cookies.set('user_role', user.role);

  return response;
}
