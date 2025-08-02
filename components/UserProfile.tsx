import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserInfo } from "./UserInfo"
import { UserProfileLoader } from "./UserProfileLoader"
import { AuthContext, useAuth } from "@/contexts/auth-provider"
import { use } from "react"

type UserProfileProps = {
  disabled: boolean
}

export function UserProfile({ disabled }: UserProfileProps) {
  if (disabled) {
    return (
      <p className="text-muted-foreground text-center">
        User profile is disabled
      </p>
    )
  }

  const authContext = use(AuthContext)
  if (!authContext) {
    throw Error("AuthContext is not available")
  }

  const { user, isLoading } = authContext

  if (isLoading) {
    return <UserProfileLoader />
  }

  if (!user) {
    return (
      <Card className="mx-auto max-w-md">
        <CardContent>
          <p className="text-muted-foreground text-center">
            No user data available
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <UserInfo user={user} />
      </CardContent>
    </Card>
  )
}
