import { SignUp } from "@clerk/chrome-extension"

import { Navigation } from "~popup/components/navigation"

export const SignUpPage = () => {
  return (
    <>
      <Navigation />
      <p>Sign Up</p>
      <SignUp routing="virtual" />
    </>
  )
}
