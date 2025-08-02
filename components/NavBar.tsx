import { Greeting } from "@/components/Greeting"
import { SignOutButton } from "@/components/SignOutButton"

export function Navbar() {
  return (
    <nav className="border-b p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Greeting />
        <SignOutButton />
      </div>
    </nav>
  )
}
