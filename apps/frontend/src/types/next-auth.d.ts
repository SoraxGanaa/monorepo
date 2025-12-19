import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      githubId?: string;
      role?: "admin" | "user";
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    githubId?: string;
    role?: "admin" | "user";
  }
}
