import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  // Gizli anahtar (Vercel ayarlarından gelir)
  secret: process.env.NEXTAUTH_SECRET,

  // 👇 BU AYAR ÇOK ÖNEMLİ: Oturumun veritabanında değil, tarayıcı çerezinde (Token) tutulmasını sağlar.
  session: {
    strategy: "jwt",
  },
  
  providers: [
    CredentialsProvider({
      name: "Yönetici Girişi",
      credentials: {
        username: { label: "Kullanıcı Adı", type: "text" },
        password: { label: "Şifre", type: "password" },
      },
      async authorize(credentials) {
        const adminUser = "admin"; 
        // Şifre .env dosyasından gelir, yoksa yedek şifre kullanılır
        const adminPass = process.env.ADMIN_PASSWORD || "Borcan2025";

        if (
          (credentials?.username === adminUser || credentials?.username === "manager") && 
          credentials?.password === adminPass
        ) {
          return {
            id: "1",
            name: "Yönetici",
            email: "admin@borcankebap.com",
            role: "manager",
          };
        }
        
        return null;
      },
    }),
  ],
  
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
};

export const auth = () => getServerSession(authOptions);