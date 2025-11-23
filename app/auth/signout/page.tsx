"use client"; // Client Component olduğunu belirtir

import { signOut } from "next-auth/react"; // DOĞRU İMPORT
import Link from "next/link";

export default function SignOut() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Çıkış Yap</h1>
          <p className="mt-2 text-sm text-gray-600">
            Hesabınızdan çıkış yapmak istediğinizden emin misiniz?
          </p>
        </div>
        
        <div className="mt-8 space-y-4">
          {/* Server Action yerine onClick kullanıyoruz */}
          <button 
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            Çıkış Yap
          </button>
          
          <Link 
            href="/" 
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  )
}