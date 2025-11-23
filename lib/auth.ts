import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  // Vercel ortam değişkenlerinden gizli anahtarı alır
  secret: process.env.AUTH_SECRET,
  
  providers: [
    // Sadece Kullanıcı Adı / Şifre Girişi
    CredentialsProvider({
      name: "Yönetici Girişi",
      credentials: {
        username: { label: "Kullanıcı Adı", type: "text" },
        password: { label: "Şifre", type: "password" },
      },
      async authorize(credentials) {
        // Kullanıcı adı ve şifre kontrolü
        // Şifreyi .env dosyasından (ADMIN_PASSWORD) veya sabit olarak "Borcan2025"ten alır
        const validPassword = process.env.ADMIN_PASSWORD || "Borcan2025";

        if (
          (credentials?.username === "admin" || credentials?.username === "manager") && 
          credentials?.password === validPassword
        ) {
          return {
            id: "1",
            name: "Yönetici",
            email: "admin@borcankebap.com",
            role: "manager",
          };
        }
        
        // Hatalı giriş
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login", // Özel giriş sayfamız
    error: "/auth/error", // Hata sayfası
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

// Server-side kullanım için helper
export const auth = () => getServerSession(authOptions);