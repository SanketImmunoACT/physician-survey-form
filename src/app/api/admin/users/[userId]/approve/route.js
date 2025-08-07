import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function PUT(req, { params }) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== 'SUPERADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { userId } = await params;
    const { password } = await req.json();

    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { status: 'ACTIVE', password: hashedPassword },
    });

    return NextResponse.json({ message: 'User approved successfully' });
  } catch (err) {
    console.error("Error approving user:", err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
