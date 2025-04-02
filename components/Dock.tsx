"use client";

import { FloatingDock } from "@/components/ui/floating-dock";
import { FloatingDockMobile } from "@/components/ui/FloatingDockMobile";
import { Home, MessageCircle, PersonStandingIcon, User } from "lucide-react";
import { ThemeToggle } from "./ui/ThemeToggle";
import { useSession } from "next-auth/react";

const Dock = () => {
  const { data: session, status } = useSession();
  if (status === "loading" || !session) return null;

  const dockItems = [
    { title: "Home", icon: <Home />, href: "/" },
    { title: "Ai chat", icon: <PersonStandingIcon />, href: "/ai-chat" },
    { title: "Messages", icon: <MessageCircle />, href: "/anon-chat" },
    { title: "Profile", icon: <User />, href: "/profile" },
  ];
  const dockItems1 = [
    { title: "Home", icon: <Home />, href: "/" },
    { title: "Ai chat", icon: <PersonStandingIcon />, href: "/ai-chat" },
    { title: "Messages", icon: <MessageCircle />, href: "/anon-chat" },
    { title: "Profile", icon: <User />, href: "/profile" },
    { title: "Theme", icon: <ThemeToggle />, href: "#" },
  ];

  return (
    <>
      <div className="hidden md:block">
        <FloatingDock items={dockItems1} />
      </div>

      <div className="md:hidden">
        <FloatingDockMobile items={dockItems} />
      </div>
    </>
  );
};

export default Dock;
