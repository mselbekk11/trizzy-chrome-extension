import { SignIn } from "@clerk/chrome-extension"
import { Navigation } from "~popup/components/navigation"

export const SignInPage = () => {
  return (
    <>
      <Navigation />
      <p>Sign In</p>
      <SignIn routing="virtual" />
    </>
  )
}
