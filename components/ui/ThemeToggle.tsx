'use client';

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div onClick={toggleTheme} className="h-[100%] w-[100%]">
      {theme === "dark" ? (
        <Sun className="h-full w-full transition-all" />
      ) : (
        <Moon className="h-full w-full transition-all" />
      )}
    </div>
  );
}
