"use client"

import React, { createContext } from "react"

export const BasicContext = createContext("This is the default basic provider")

interface BasicProviderProps {
  children: React.ReactNode
  value: string
}

export function BasicProvider({ children, value }: BasicProviderProps) {
  return <BasicContext value={value}>{children}</BasicContext>
}
