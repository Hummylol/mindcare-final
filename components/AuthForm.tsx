"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AuthForm({ type }: { type: "login" | "signup" }) {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/auth/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          type === "signup"
            ? formData // Send name for signup
            : { email: formData.email, password: formData.password }
        ),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Auth Error:", data.error);
        alert(data.error); // Show error in alert
        return;
      }

      router.push("/");
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Google Sign-In failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-white dark:bg-black">
      <div className="w-full max-w-sm p-6 bg-gray-100 dark:bg-[#18181B] shadow-lg rounded-2xl">
        <h2 className="text-2xl font-semibold text-center text-black dark:text-white mb-6">
          {type === "login" ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {type === "signup" && (
            <div>
              <Label htmlFor="name" className="text-black dark:text-white">
                Name
              </Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 w-full px-3 py-2 bg-white dark:bg-black border rounded-lg focus:ring-2 focus:ring-gray-500"
              />
            </div>
          )}
          <div>
            <Label htmlFor="email" className="text-black dark:text-white">
              Email
            </Label>
            <Input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full px-3 py-2 bg-white dark:bg-black border rounded-lg focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-black dark:text-white">
              Password
            </Label>
            <Input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full px-3 py-2 bg-white dark:bg-black border rounded-lg focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <Button
            type="submit"
            className="w-full py-2 rounded-lg font-semibold bg-black dark:bg-white text-white dark:text-black hover:opacity-90 transition"
            disabled={loading}
          >
            {loading ? "Processing..." : type === "login" ? "Login" : "Sign Up"}
          </Button>

          {/* Google Sign-In Button */}
          <Button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full py-2 mt-2 rounded-lg font-semibold bg-red-500 text-white hover:opacity-90 transition"
          >
            Sign in with Google
          </Button>
        </form>
      </div>
    </div>
  );
}
