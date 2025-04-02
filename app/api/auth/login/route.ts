import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/lib/models/User"; // Import your Mongoose User model
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: "7d" });

    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
