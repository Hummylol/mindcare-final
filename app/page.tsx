"use client";

import Article from "@/components/homepagecomps/Article";
import Calendar from "@/components/homepagecomps/Calendar";
import DynamicContent from "@/components/homepagecomps/DynamicContent";
import Journal from "@/components/homepagecomps/Journal";
import MoodSelector from "@/components/homepagecomps/MoodSelector";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Heart, MessageCircle } from "lucide-react";
import Link from "next/link";

const Page = () => {
  const { data: session, status } = useSession();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Navbar />
        <div className="text-xl">Please log in to access this content.</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen w-full p-4">
        <div className="w-full max-w-md rounded-3xl overflow-hidden shadow-lg flex flex-col gap-4">
          <MoodSelector onMoodSelect={setSelectedMood} />
          <Article mood={selectedMood} />
        </div>
      </div>
    </>
  );
};

export default Page;
