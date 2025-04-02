"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignIn = async () => {
    router.push("/login");
  };

  return (
    <nav className="p-4 flex justify-between items-center dark:bg-[#18181B] dark:text-white text-black bg-gray-100 w-full absolute top-0">
      <h1 className="text-lg font-bold">MindCare</h1>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {session && session.user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm hidden md:inline">Hello, {session.user.name}</span>
            </div>
            
          </div>
        ) : (
          <Button
            onClick={handleSignIn}
            variant="default"
            size="sm"
          >
            Login
          </Button>
        )}
      </div>
    </nav>
  );
}
