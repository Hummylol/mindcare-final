"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react"; // Import eye icons

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (res?.error) {
        alert(res.error);
        return;
      }

      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-white dark:bg-black">
      <div className="w-full max-w-sm p-6 bg-gray-100 dark:bg-[#18181B] shadow-lg rounded-2xl">
        <h2 className="text-2xl font-semibold text-center text-black dark:text-white mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="email" className="text-black dark:text-white">Email</Label>
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
          <div className="relative">
            <Label htmlFor="password" className="text-black dark:text-white">Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full px-3 py-2 bg-white dark:bg-black border rounded-lg focus:ring-2 focus:ring-gray-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-9 right-3 text-gray-500 dark:text-gray-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <Button type="submit" className="w-full py-2 rounded-lg font-semibold bg-black dark:bg-white text-white dark:text-black hover:opacity-90 transition" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>

          {/* Separator */}
          <div className="flex items-center my-2">
            <hr className="w-full border-gray-300 dark:border-gray-600" />
            <span className="px-2 text-gray-500 dark:text-gray-400 text-sm">or</span>
            <hr className="w-full border-gray-300 dark:border-gray-600" />
          </div>

          {/* Google Sign-In */}
          <Button type="button" onClick={handleGoogleSignIn} className="w-full py-2 mt-2 rounded-lg font-semibold bg-blue-500 text-white hover:opacity-90 transition">
            Sign in with Google
          </Button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-sm mt-4 text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
