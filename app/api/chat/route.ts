import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Chat from '@/lib/models/Chat';

// Get all messages
export async function GET() {
  try {
    await connectToDatabase();
    const chat = await Chat.findOne().sort({ updatedAt: -1 });
    return NextResponse.json(chat?.messages || []);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

// Add a new message
export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { text, sender, senderEmail } = body;

    // Find the most recent chat or create a new one
    let chat = await Chat.findOne().sort({ updatedAt: -1 });
    
    // If no chat exists or if existing messages don't have senderEmail, create a new chat
    if (!chat || (chat.messages.length > 0 && !chat.messages[0].senderEmail)) {
      chat = new Chat();
    }

    // Add the new message
    chat.messages.push({
      text,
      sender,
      senderEmail,
      timestamp: new Date()
    });

    await chat.save();
    return NextResponse.json(chat.messages);
  } catch (error) {
    console.error('Error adding message:', error);
    return NextResponse.json({ error: 'Failed to add message' }, { status: 500 });
  }
} 