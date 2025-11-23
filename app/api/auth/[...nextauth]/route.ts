import NextAuth from "next-auth";
import { authOptions } from "../../../../lib/auth";

// TypeScript hatasını önlemek için "as any" ekliyoruz
const handler = NextAuth(authOptions) as any;

export { handler as GET, handler as POST };