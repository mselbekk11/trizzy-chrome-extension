import { UserButton, useUser } from "@clerk/chrome-extension"
import { useQuery } from "convex/react"
import { useEffect, useState } from "react"
import { Link } from "react-router"

import { Navigation } from "~popup/components/navigation"

import { api } from "../../../convex/_generated/api"

export const Home = () => {
  const { isSignedIn, user } = useUser()
  const [isLoading, setIsLoading] = useState(true)

  console.log("User ID:", user?.id)

  // Query headshot models for the current user directly
  const models = useQuery(api.headshot_models.listUserModels, {
    user_id: user?.id ?? ""
  })

  // Update loading state when models data is available
  useEffect(() => {
    if (models !== undefined) {
      setIsLoading(false)
    }
  }, [models])

  console.log("Models:", models)

  return (
    <div className="plasmo-w-full plasmo-h-full plasmo-flex plasmo-flex-col">
      <Navigation />
      {isSignedIn ? (
        <div className="plasmo-flex-1 plasmo-flex plasmo-flex-col plasmo-items-center plasmo-bg-[#F9F9F9] plasmo-p-4 plasmo-overflow-auto plasmo-min-h-0">
          <div className="plasmo-mb-4">
            Welcome, {user?.firstName || "User"}!
          </div>

          {/* Display headshot models */}
          <div className="plasmo-w-full plasmo-max-w-md">
            <h2 className="plasmo-text-xl plasmo-font-bold plasmo-mb-4">
              Your Headshot Models
            </h2>

            {isLoading ? (
              <div className="plasmo-text-center plasmo-py-4">
                Loading models...
              </div>
            ) : models && models.length > 0 ? (
              <div className="plasmo-grid plasmo-grid-cols-1 plasmo-gap-4">
                {models.map((model) => (
                  <div
                    key={model._id}
                    className="plasmo-bg-white plasmo-shadow-md plasmo-rounded-lg plasmo-p-4 plasmo-border plasmo-border-gray-200">
                    <div className="plasmo-flex plasmo-justify-between plasmo-items-center">
                      <h3 className="plasmo-font-semibold">{model.name}</h3>
                      <span
                        className={`plasmo-text-xs plasmo-px-2 plasmo-py-1 plasmo-rounded-full ${
                          model.status === "finished"
                            ? "plasmo-bg-green-100 plasmo-text-green-800"
                            : "plasmo-bg-yellow-100 plasmo-text-yellow-800"
                        }`}>
                        {model.status || "processing"}
                      </span>
                    </div>

                    {model.images && model.images.length > 0 && (
                      <div className="plasmo-mt-3 plasmo-flex plasmo-space-x-2">
                        {model.images.slice(0, 3).map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Model image ${index + 1}`}
                            className="plasmo-w-12 plasmo-h-12 plasmo-rounded plasmo-object-cover"
                          />
                        ))}
                        {model.images.length > 3 && (
                          <div className="plasmo-w-12 plasmo-h-12 plasmo-rounded plasmo-bg-gray-200 plasmo-flex plasmo-items-center plasmo-justify-center plasmo-text-gray-500 plasmo-text-xs">
                            +{model.images.length - 3}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="plasmo-mt-2 plasmo-text-xs plasmo-text-gray-500 plasmo-flex plasmo-justify-between">
                      <span>Type: {model.gender || "Unknown"}</span>
                      <span>
                        Created:{" "}
                        {new Date(model.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="plasmo-text-center plasmo-py-4 plasmo-bg-white plasmo-shadow-sm plasmo-rounded-lg plasmo-border plasmo-border-gray-200">
                No headshot models found. Models created in the web app will
                appear here.
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="plasmo-flex-1 plasmo-flex plasmo-flex-col plasmo-items-center plasmo-justify-center plasmo-bg-[#F9F9F9] plasmo-overflow-auto">
          {/* Content for non-logged in users */}
          <div className="plasmo-flex plasmo-flex-col plasmo-items-center plasmo-gap-2 plasmo-mb-12 plasmo-pt-12">
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
      )}
    </div>
  )
}
