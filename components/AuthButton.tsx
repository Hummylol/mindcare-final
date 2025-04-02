"use client";

import { googleSignIn, googleSignOut } from "@/lib/authAction";
import { Button } from "@/components/ui/button";

export default function AuthButton() {
  return (
    <div className="flex justify-center space-x-4">
      <Button onClick={() => googleSignIn()} className="bg-black text-white dark:bg-white dark:text-black">
        Sign in with Google
      </Button>
      <Button onClick={() => googleSignOut()} className="bg-black text-white dark:bg-white dark:text-black">
        Sign Out
      </Button>
    </div>
  );
}