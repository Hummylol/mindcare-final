import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "@/lib/mongodb"; 
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

interface Token {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      createdAt: string;
    }
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string | undefined;
          password: string | undefined;
        };

        if (!email || !password) {
          throw new Error("Missing email or password");
        }

        await connectToDatabase();
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("User not found. Please sign up.");
        }

        if (typeof user.password !== "string") {
          throw new Error("User password is not valid");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          createdAt: user.createdAt.toISOString(),
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      try {
        await connectToDatabase();

        if (account && account.provider === "google") {
          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            await User.create({
              email: user.email,
              name: user.name,
              image: user.image,
              password: "", 
              provider: "google",
              createdAt: new Date(),
            });
          }
        }

        return true;
      } catch (error) {
        console.error("Error storing user in DB:", error);
        return false;
      }
    },

    async session({ session, token }) {
      if (token) {
        // Type assertion for token
        const typedToken = token as unknown as Token;
        session.user.id = typedToken.id;
        session.user.name = typedToken.name;
        session.user.email = typedToken.email;
        session.user.createdAt = typedToken.createdAt;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.createdAt = user.createdAt;
      }
      return token;
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
});
