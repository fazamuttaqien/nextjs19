"use client"

import { Footer } from "@/components/Footer"
import { Navbar } from "@/components/NavBar"
import { Button } from "@/components/ui/button"
import { UserProfile } from "@/components/UserProfile"
import { useState } from "react"

export default function Home() {
  const [isProfileDisabled, setIsProfileDisabled] = useState(false)

  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-6">
        <div className="mb-6 flex justify-center">
          <Button
            variant="outline"
            onClick={() => setIsProfileDisabled(!isProfileDisabled)}
          >
            {isProfileDisabled ? "Enable" : "Disable"} User Profile
          </Button>
        </div>
        <UserProfile disabled={isProfileDisabled} />
      </main>
      <Footer />
    </div>
  )
}
