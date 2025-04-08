import { useUser } from "@clerk/chrome-extension"
import { useState } from "react"

import { Navigation } from "~popup/components/navigation"
import { Landing } from "~sidepanel/components/landing"
import { TryOn } from "~sidepanel/components/tryon"

export const Home = () => {
  const { isSignedIn, user } = useUser()
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="plasmo-w-full plasmo-h-full plasmo-flex plasmo-flex-col">
      <Navigation />
      {isSignedIn ? <TryOn /> : <Landing />}
    </div>
  )
}
