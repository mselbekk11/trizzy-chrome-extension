import { UserButton, useUser } from "@clerk/chrome-extension"
import { Link } from "react-router"

import { Navigation } from "~popup/components/navigation"

export const Home = () => {
  const { isSignedIn, user } = useUser()

  return (
    <>
      <Navigation />
      {isSignedIn ? (
        <div className="plasmo-flex plasmo-flex-col plasmo-items-center plasmo-h-screen plasmo-bg-[#F9F9F9] plasmo-p-4">
          <div>Welcome, {user?.firstName || "User"}!</div>
        </div>
      ) : (
        <div className="plasmo-flex plasmo-flex-col plasmo-items-center plasmo-justify-center plasmo-h-screen plasmo-bg-[#F9F9F9]">
          {/* Content for non-logged in users */}
          <div className="plasmo-flex plasmo-flex-col plasmo-items-center plasmo-h-screen plasmo-pt-12">
            <div className="plasmo-flex plasmo-flex-col plasmo-items-center plasmo-gap-2 plasmo-mb-12">
              <h1 className="plasmo-text-2xl plasmo-font-bold">
                Welcome to Trizzy
              </h1>
              <h3 className="plasmo-text-1xl plasmo-font-bold">
                Please sign in to continue
              </h3>
            </div>
            <Link to="/sign-in">
              <button className="plasmo-bg-black plasmo-text-md plasmo-text-white plasmo-px-4 plasmo-py-2 plasmo-rounded-lg">
                Sign In
              </button>
            </Link>
            {/* <Link to="/sign-up">
              <button className="plasmo-bg-black plasmo-text-md plasmo-text-white plasmo-px-4 plasmo-py-2 plasmo-rounded-lg">
                Sign Up
              </button>
            </Link> */}
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
