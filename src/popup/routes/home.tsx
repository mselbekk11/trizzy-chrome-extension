import { UserButton, useUser } from "@clerk/chrome-extension"
import { Link } from "react-router"

import { Navigation } from "~popup/components/navigation"

export const Home = () => {
  const { isSignedIn, user } = useUser()

  return (
    <>
      <Navigation />
      {isSignedIn ? (
        <div>
          {/* Content that only logged-in users should see */}
          <div>Welcome, {user?.firstName || "User"}!</div>
        </div>
      ) : (
        <div className="plasmo-flex plasmo-flex-col plasmo-items-center plasmo-justify-center plasmo-h-screen plasmo-bg-blue-500">
          {/* Content for non-logged in users */}
          <div className="plasmo-flex plasmo-flex-col plasmo-items-center plasmo-h-screen plasmo-pt-12">
            <h1>Welcome to Trizzy</h1>
            <div>Please sign in to continue</div>
            <Link to="/sign-in">Sign In</Link>
            <Link to="/sign-up">Sign Up</Link>
          </div>
        </div>
      )}
      {/* <button
        onClick={() => {
          chrome.tabs.create({
            url: "./tabs/background-worker-demo.html"
          })
        }}>
        Open background worker demo in a new tab
      </button> */}
    </>
  )
}
