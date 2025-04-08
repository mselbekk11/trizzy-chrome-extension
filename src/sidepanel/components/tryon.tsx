import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/chrome-extension"

export const TryOn = () => {
  const { isSignedIn, user } = useUser()

  return (
    <div className="plasmo-flex-1 plasmo-flex plasmo-flex-col plasmo-items-center plasmo-bg-[#F9F9F9] plasmo-p-4 plasmo-overflow-auto plasmo-min-h-0 ">
      <div className="plasmo-mb-4">Welcome, {user?.firstName || "User"}!</div>
      <Button className="" variant="default">
        Click me
      </Button>
    </div>
  )
}
