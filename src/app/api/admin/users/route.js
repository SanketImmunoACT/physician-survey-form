import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function GET(req) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== 'SUPERADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    const users = await prisma.user.findMany({
      where: {
        status: status ? status.toUpperCase() : undefined,
        role: 'SALESPERSON',
      },
    });

    return NextResponse.json(users);
  } catch (err) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
