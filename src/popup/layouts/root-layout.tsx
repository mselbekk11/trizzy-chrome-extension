import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  useAuth,
  UserButton,
  useUser
} from "@clerk/chrome-extension"
import { ConvexProvider } from "convex/react"
import { useEffect } from "react"
import { Link, Outlet, useNavigate } from "react-router"

import { convex } from "../../../convex/convex"

const PUBLISHABLE_KEY = process.env.PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY
const SYNC_HOST = process.env.PLASMO_PUBLIC_CLERK_SYNC_HOST

if (!PUBLISHABLE_KEY || !SYNC_HOST) {
  throw new Error(
    "Please add the PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY and PLASMO_PUBLIC_CLERK_SYNC_HOST to the .env.development file"
  )
}

// Component to sync Clerk auth with Convex
const ConvexClerkAuth = () => {
  const { isSignedIn } = useUser()
  const { getToken } = useAuth()

  useEffect(() => {
    if (isSignedIn && getToken) {
      // Set up the auth config using a function that returns a promise
      convex.setAuth(async () => {
        try {
          const token = await getToken({ template: "convex" })
          return token || null
        } catch (err) {
          console.error("Error getting Clerk token:", err)
          return null
        }
      })
    } else {
      // Clear auth when signed out
      convex.clearAuth()
    }
  }, [isSignedIn, getToken])

  return null
}

export const RootLayout = () => {
  const navigate = useNavigate()

  return (
    <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      syncHost={SYNC_HOST}>
      <ConvexProvider client={convex}>
        <ConvexClerkAuth />
        <div className="plasmo-w-[600px] plasmo-h-[600px]">
          <main>
            <Outlet />
          </main>
          {/* <footer>
            <SignedIn>
              <Link to="/settings">Settings</Link>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Link to="/">Home</Link>
              <Link to="/sign-in">Sign In</Link>
              <Link to="/sign-up">Sign Up</Link>
            </SignedOut>
          </footer> */}
        </div>
      </ConvexProvider>
    </ClerkProvider>
  )
}
