'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Users } from "lucide-react"
import { useSession } from "next-auth/react"

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Message {
  text: string;
  sender: string;
  senderEmail: string;
  timestamp: string;
}

const AnonChat = () => {
  const { data: session } = useSession()
  const [users, setUsers] = useState<User[]>([])
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users')
        const data = await response.json()
        setUsers(data)
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setIsLoading(false)
      }
    }

    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/chat')
        const data = await response.json()
        setMessages(data)
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    }

    fetchUsers()
    fetchMessages()
  }, [])

  const handleSendMessage = async () => {
    if (message.trim() && session?.user) {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: message,
            sender: session.user.name || "Anonymous",
            senderEmail: session.user.email || "anonymous@example.com"
          }),
        })

        if (response.ok) {
          const data = await response.json()
          setMessages(data)
          setMessage("")
        }
      } catch (error) {
        console.error('Error sending message:', error)
      }
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Anonymous Group Chat</h1>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Group Chat</CardTitle>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Users className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium leading-none">Online Users</h4>
                <ScrollArea className="h-[300px]">
                  {isLoading ? (
                    <div className="text-center py-4">Loading users...</div>
                  ) : (
                    users.map((user) => (
                      <div key={user._id} className="flex items-center space-x-2 p-2 hover:bg-accent rounded-lg">
                        <Avatar>
                          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">{user.name}</div>
                          <div className="text-xs text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    ))
                  )}
                </ScrollArea>
              </div>
            </PopoverContent>
          </Popover>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] mb-4">
            {messages.map((msg, index) => {
              const isCurrentUser = msg.senderEmail === session?.user?.email;
              return (
                <div
                  key={index}
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  <div
                    className={`max-w-[70%] ${isCurrentUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                      } rounded-lg p-3`}
                  >
                    <div className="text-sm font-medium mb-1">
                      {isCurrentUser ? '' : 'Random User'}
                    </div>
                    <div className="text-sm">{msg.text}</div>
                    <div className="text-xs opacity-70 mt-1">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollArea>
          <div className="flex space-x-2">
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AnonChat