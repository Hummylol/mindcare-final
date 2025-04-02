"use server";

import { signIn, signOut } from "@/auth";

export async function googleSignIn() {
    await signIn("google", { callbackUrl: "/" }); // Redirect to home after login
}

export async function googleSignOut() {
  await signOut();
}

