// app/api/auth/login/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

// Example: Same mockDB as register
let mockDB = [];

export async function POST(request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const user = mockDB.find((u) => u.email === email);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  return NextResponse.json(
    { message: "Login successful", user: { email } },
    { status: 200 }
  );
}
