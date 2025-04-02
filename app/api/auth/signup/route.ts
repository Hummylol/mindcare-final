import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/lib/models/User";
import { connectToDatabase } from "@/lib/mongodb";

interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json() as SignupRequest;
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return NextResponse.json({ error: "User already exists" }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ message: "User created", userId: newUser._id });
  } catch (error) {
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}
