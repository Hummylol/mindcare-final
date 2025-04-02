import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/lib/models/User';

interface UserResponse {
  _id: string;
  name: string;
  email: string;
}

export async function GET() {
  try {
    await connectToDatabase();
    const users = await User.find({}, 'name email') as UserResponse[];
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
} 