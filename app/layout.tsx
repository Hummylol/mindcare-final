import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Dock from "@/components/Dock";
import { ThemeProvider } from "@/context/ThemeProvider";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mindcare",
  description: "Mental Health Support Platform",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <SessionProvider>
          <ThemeProvider>
            <div className="fixed bottom-4 left-0 right-0 flex justify-center z-40">
              <Dock />
            </div>
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
