import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/chrome-extension"

import { Gallery } from "./gallery"
import { TryForm } from "./try-form"

export const TryOn = () => {
  const { isSignedIn, user } = useUser()

  return (
    <div className="plasmo-flex plasmo-flex-col plasmo-h-screen plasmo-overflow-hidden">
      <div className="plasmo-flex-1 plasmo-overflow-auto plasmo-bg-[#F9F9F9] plasmo-p-4">
        <Gallery />
      </div>

      <div className="plasmo-h-[700px] plasmo-bg-white plasmo-border-t plasmo-p-4 plasmo-shadow-md">
        <TryForm />
      </div>
    </div>
  )
}
