
"use client"

import { authClient } from "@/lib/auth-client"
import { redirect } from "next/navigation"

const HomeView = () => {

  const { data: session } = authClient?.useSession()
  if (!session) {
    return <div>Not logged in</div>

  }

  return (
    <div>
      <p>Logged in as {session.user.email}</p>
      <button onClick={() => authClient?.signOut({
        fetchOptions: {
          onSuccess: () => {
            redirect("/sign-in")
          }
        }
      })}>Sign out</button>
    </div>
  )
}
export default HomeView