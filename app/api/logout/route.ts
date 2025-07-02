import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'));
  response.cookies.delete('user_email');
  response.cookies.delete('user_role');
  return response;
}