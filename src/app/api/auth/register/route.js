import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Generate a temporary password for pending users if not provided
    const tempPassword = password || Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'SALESPERSON',
        status: 'PENDING',
      },
    });

    return NextResponse.json({ message: 'Request submitted successfully. Please wait for admin approval.' }, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
      }
    }
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}