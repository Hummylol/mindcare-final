"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { gsap } from "gsap";
import { Bot, User } from "lucide-react";

interface Message {
  id?: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function PersonalizedChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: "Hello! I'm here to help. How are you feeling today?", 
      sender: "bot",
      timestamp: new Date()
    },
  ]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    gsap.fromTo(
      ".message:not(.animated)",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        onComplete: () => {
          document.querySelectorAll(".message").forEach((msg) => msg.classList.add("animated"));
        },
      }
    );
  }, [messages.length]);

  const sendMessage = async () => {
    if (inputMessage.trim()) {
      const userMessage: Message = {
        id: Date.now(),
        text: inputMessage,
        sender: "user",
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInputMessage("");
      setIsTyping(true);

      const apiKey = 'AIzaSyCWlyN6OseLdSUkyKUMw-XOuPICkr-w8Qc';
      const apiUrl =
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' +
        apiKey;

      const conversationHistory = messages
        .map((msg) => `${msg.sender === "user" ? "User" : "Assistant"}: ${msg.text}`)
        .join("\n");

      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: `You are an empathetic mental health assistant.
                        You only respond to queries related to mental health, emotional well-being, and self-care.
                        Keep your responses short and concise (2-3 sentences max).
                        If the user's query is not related to mental health (mental health includes boredome angry sadness anxiety and others) , simply reply: 
                        "I'm here to support you with mental health concerns. Let me know how you're feeling." 
        
                        Conversation so far:
                        ${conversationHistory}
                        User: ${inputMessage}
                        Assistant:`,
              },
            ],
          },
        ],
      };

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });

        const data = await response.json();

        const botMessage: Message = {
          id: Date.now(),
          text: data?.candidates?.[0]?.content?.parts?.[0]?.text ||
                "I'm trying to understand better. Could you elaborate on what you're experiencing?",
          sender: "bot",
          timestamp: new Date(),
        };

        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error("Error:", error);
        const errorMessage: Message = {
          id: Date.now(),
          text: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">AI Mental Health Assistant</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chat with AI Assistant</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] mb-4">
            {messages.map((msg, index) => {
              const isUser = msg.sender === "user";
              return (
                <div 
                  key={msg.id || index} 
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 message`}
                >
                  <div 
                    className={`max-w-[70%] ${
                      isUser 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    } rounded-lg p-3`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {isUser ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                      <span className="text-sm font-medium">
                        {isUser ? 'You' : 'AI Assistant'}
                      </span>
                    </div>
                    <div className="text-sm">{msg.text}</div>
                    <div className="text-xs opacity-70 mt-1">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              );
            })}
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    <span className="text-sm font-medium">AI Assistant</span>
                  </div>
                  <div className="text-sm">Typing...</div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </ScrollArea>
          <div className="flex space-x-2">
            <Input
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button onClick={sendMessage}>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
