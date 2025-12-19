import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account }) {
      // ✅ profile.id гээд оролдохгүй (typing асуудал үүсгэдэг)
      if (account?.provider === "github") {
        token.githubId = account.providerAccountId; // string
      }
      return token;
    },
    async session({ session, token }) {
      (session.user as any).githubId = token.githubId;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
