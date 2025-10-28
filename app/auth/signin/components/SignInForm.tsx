"use client"

import { signIn } from "next-auth/react"
import { User, Shield } from "lucide-react"
import { useState } from "react"

export default function SignInForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleCredentialsLogin = async () => {
    setIsLoading(true)
    try {
      const result = await signIn("credentials", {
        username: "manager",
        password: "Borcan2025",
        redirect: false
      })
      if (result?.ok) {
        window.location.href = "/"
      } else {
        console.error("Giriş başarısız")
      }
    } catch (error) {
      console.error("Giriş hatası:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false
      })
      if (result?.ok) {
        window.location.href = "/"
      } else {
        console.error("Giriş başarısız")
      }
    } catch (error) {
      console.error("Giriş hatası:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <h3 className="text-sm font-medium text-green-900 mb-3">Manager Girişi</h3>
        
        <div className="space-y-3">
          <button 
            type="button"
            onClick={handleCredentialsLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            <Shield className="mr-2 h-4 w-4" />
            Manager Girişi
          </button>
          
          <div className="text-xs text-green-700">
            <p><strong>Kullanıcı adı:</strong> manager</p>
            <p><strong>Şifre:</strong> Borcan2025</p>
          </div>
        </div>
      </div>

      {/* Manuel Form */}
      <div className="bg-gray-50 p-4 rounded-lg border">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Manuel Giriş</h3>
        
        <form onSubmit={handleManualLogin} className="space-y-3">
          <div>
            <input
              type="text"
              placeholder="Kullanıcı adı (manager)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Şifre (Borcan2025)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-md text-sm hover:bg-gray-900 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </>
  )
}