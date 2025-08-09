import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { jwtVerify } from 'jose';
import { Prisma } from '@prisma/client';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(req) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    const { name } = await req.json();

    await prisma.physician.create({
      data: {
        name,
        requestedBy: payload.userId.toString(),
      },
    });

    return NextResponse.json({ message: 'Physician request submitted successfully' });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      return NextResponse.json({ error: 'Physician already exists' }, { status: 409 });
    }
    console.error("Physician creation error:", err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await jwtVerify(token, secret);

    const physicians = await prisma.physician.findMany();

    return NextResponse.json(physicians);
  } catch (err) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
