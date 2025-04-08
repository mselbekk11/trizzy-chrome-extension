import { UserProfile } from "@clerk/chrome-extension"
import { Navigation } from "~popup/components/navigation"

export const Settings = () => {
  return (
    <>
    <Navigation />
      <h1>Settings</h1>
      <UserProfile routing="virtual" />
    </>
  )
}
