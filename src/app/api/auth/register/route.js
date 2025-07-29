// app/api/auth/register/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

// Example: Replace this with your DB logic
let mockDB = [];

export async function POST(request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Check if user already exists
  const userExists = mockDB.find((user) => user.email === email);
  if (userExists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user (mock)
  mockDB.push({ email, password: hashedPassword });

  return NextResponse.json(
    { message: "User registered successfully" },
    { status: 200 }
  );
}
