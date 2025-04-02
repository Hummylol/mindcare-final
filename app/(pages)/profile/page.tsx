'use client'

import React from 'react'
import { useSession, signOut } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { LogOut, User, Mail, Calendar } from "lucide-react"

interface ExtendedUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  createdAt?: string;
}

const ProfilePage = () => {
  const { data: session } = useSession()
  const user = session?.user as ExtendedUser

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' })
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Header */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user?.image || ""} />
              <AvatarFallback>
                {user?.name?.split(' ').map(n => n[0]).join('') || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-semibold truncate">{user?.name || "Anonymous User"}</h2>
              <p className="text-muted-foreground truncate">{user?.email || "No email provided"}</p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">Username</p>
                <p className="text-sm text-muted-foreground truncate">{user?.name || "Not set"}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground truncate">{user?.email || "Not set"}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">Member Since</p>
                <p className="text-sm text-muted-foreground">
                  {user?.createdAt 
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "Not available"}
                </p>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="pt-4">
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfilePage 