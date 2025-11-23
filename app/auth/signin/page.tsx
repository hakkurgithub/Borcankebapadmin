"use client"; // Bu satır önemli, Client Component olduğunu belirtir

import { signIn } from "next-auth/react"; // DOĞRU İMPORT
import { Github } from "lucide-react";
import SignInForm from "./components/SignInForm";

export default function SignIn() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Giriş Yap</h1>
          <p className="mt-2 text-sm text-gray-600">
            Hesabınıza giriş yapın
          </p>
        </div>
        
        <div className="mt-8 space-y-4">
          {/* Demo Kullanıcı Girişi */}
          <SignInForm />

          {/* GitHub OAuth */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">veya</span>
            </div>
          </div>
          
          {/* GitHub Butonu - Düzeltildi */}
          <button 
            onClick={() => signIn("github", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
          >
            <Github className="mr-2 h-4 w-4" />
            GitHub ile Giriş Yap
          </button>
          
          <p className="text-xs text-gray-500 text-center">
            GitHub OAuth gerçek credentials gerektirir
          </p>
        </div>
      </div>
    </div>
  )
}