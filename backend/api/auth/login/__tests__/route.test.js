import { POST } from '../route';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { NextResponse } from 'next/server';

// Mock external modules
jest.mock('@/lib/prisma', () => ({
  user: {
    findUnique: jest.fn(),
  },
}));

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
}));

jest.mock('jose', () => ({
  SignJWT: jest.fn(() => ({
    setProtectedHeader: jest.fn().mockReturnThis(),
    setExpirationTime: jest.fn().mockReturnThis(),
    sign: jest.fn(() => 'mocked-jwt-token'),
  })),
}));

// Mock NextResponse
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, options = {}) => ({
      status: options.status || 200, // Default to 200 if status is not provided
      json: () => Promise.resolve(data),
      cookies: {
        set: jest.fn(),
      },
    })),
  },
}));

describe('POST /api/auth/login', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('should return 200 and a token for valid credentials', async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 'user123',
      email: 'test@example.com',
      password: 'hashedpassword',
      role: 'USER',
      status: 'ACTIVE',
    });
    bcrypt.compare.mockResolvedValue(true);

    const request = {
      json: () => Promise.resolve({ email: 'test@example.com', password: 'password123' }),
    };

    const response = await POST(request);
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody.message).toBe('Login successful');
    expect(responseBody.role).toBe('USER');
    expect(response.cookies.set).toHaveBeenCalledWith(
      'token',
      'mocked-jwt-token',
      expect.any(Object)
    );
  });

  it('should return 400 for missing email or password', async () => {
    const request = {
      json: () => Promise.resolve({ email: 'test@example.com' }),
    };

    const response = await POST(request);
    const responseBody = await response.json();

    expect(response.status).toBe(400);
    expect(responseBody.error).toBe('Missing required fields');
  });

  it('should return 401 for invalid email', async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    const request = {
      json: () => Promise.resolve({ email: 'nonexistent@example.com', password: 'password123' }),
    };

    const response = await POST(request);
    const responseBody = await response.json();

    expect(response.status).toBe(401);
    expect(responseBody.error).toBe('Invalid credentials');
  });

  it('should return 401 for invalid password', async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 'user123',
      email: 'test@example.com',
      password: 'hashedpassword',
      role: 'USER',
      status: 'ACTIVE',
    });
    bcrypt.compare.mockResolvedValue(false);

    const request = {
      json: () => Promise.resolve({ email: 'test@example.com', password: 'wrongpassword' }),
    };

    const response = await POST(request);
    const responseBody = await response.json();

    expect(response.status).toBe(401);
    expect(responseBody.error).toBe('Invalid credentials');
  });

  it('should return 403 for inactive salesperson account', async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 'sales123',
      email: 'sales@example.com',
      password: 'hashedpassword',
      role: 'SALESPERSON',
      status: 'PENDING',
    });
    bcrypt.compare.mockResolvedValue(true);

    const request = {
      json: () => Promise.resolve({ email: 'sales@example.com', password: 'password123' }),
    };

    const response = await POST(request);
    const responseBody = await response.json();

    expect(response.status).toBe(403);
    expect(responseBody.error).toBe('Your account is pending approval.');
  });

  it('should return 500 for internal server errors', async () => {
    prisma.user.findUnique.mockRejectedValue(new Error('Database error'));

    const request = {
      json: () => Promise.resolve({ email: 'test@example.com', password: 'password123' }),
    };

    const response = await POST(request);
    const responseBody = await response.json();

    expect(response.status).toBe(500);
    expect(responseBody.error).toBe('Internal server error');
  });
});