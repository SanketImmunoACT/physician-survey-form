import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import prisma from '@/lib/prisma';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function GET(req) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, name: true, email: true }, // Only return non-sensitive data
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
