import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

// JWT/session дээр role нэмэхийн тулд callback-ууд ашиглана
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account }) {
    if (account?.provider === "github") {
      token.githubId = account.providerAccountId;
    }
    return token;
  },

  async session({ session, token }) {
    (session.user as any).githubId = token.githubId;
    return session;
  },
  },
});
export const GET = handlers.GET;
export const POST = handlers.POST;
