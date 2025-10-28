import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({  
  trustHost: true,
  
  providers: [
    // Manager credentials provider
    Credentials({
      name: "Manager",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "manager" },
        password: { label: "Password", type: "password", placeholder: "password" }
      },
      async authorize(credentials) {
        if (credentials?.username === "manager" && credentials?.password === "Borcan2025") {
          return {
            id: "1", 
            name: "Manager",
            email: "manager@karagozdoner.com",
            role: "manager" as const,
          }
        }
        return null
      }
    }),
    // GitHub OAuth (gerçek credentials gerekli)
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
  
  session: {
    strategy: "jwt",
  },
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || 'b2b' // User objesinden role alıyoruz
      }
      return token
    },
    
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as "b2b" | "manager"
      }
      return session
    },
  },
  
  debug: process.env.NODE_ENV === "development",
})