import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { jwtVerify } from 'jose';

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

    const { hospitalId } = await params;

    await prisma.hospital.update({
      where: { id: parseInt(hospitalId) },
      data: { status: 'ACTIVE' },
    });

    return NextResponse.json({ message: 'Hospital approved successfully' });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
