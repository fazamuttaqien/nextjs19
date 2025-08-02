"use client"

import { getCurrentUser, signOut, User } from "@/lib/auth"
import React, { createContext, use, useEffect, useState } from "react"

type AuthContext = {
  user: User | null
  isLoading: boolean
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContext | undefined>(undefined)

type AuthProviderProps = {
  children: React.ReactNode
  user: User | null
}

export function AuthProvider({
  children,
  user: initialUser,
}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(initialUser ?? null)
  const [isLoading, setIsLoading] = useState(!initialUser)

  async function handleSignOut() {
    await signOut()
    setUser(null)
  }

  useEffect(() => {
    async function fetchUser() {
      const userData = await getCurrentUser()
      setUser(userData)
      setIsLoading(false)
    }

    if (!initialUser) {
      fetchUser()
    }
  }, [initialUser])

  const value: AuthContext = {
    user,
    isLoading,
    signOut: handleSignOut,
  }

  return <AuthContext value={value}>{children}</AuthContext>
}

export function useAuth() {
  const authContext = use(AuthContext)
  if (authContext === undefined) {
    throw Error("useAuth must be used within an AuthProvider")
  }

  return authContext
}
