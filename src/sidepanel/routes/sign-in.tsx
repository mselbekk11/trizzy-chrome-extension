import { SignIn } from "@clerk/chrome-extension"

import { Navigation } from "~popup/components/navigation"

export const SignInPage = () => {
  return (
    <>
      <Navigation />
      <div className="plasmo-flex plasmo-flex-col plasmo-items-center plasmo-justify-center plasmo-h-screen plasmo-bg-[#F9F9F9]">
        <SignIn routing="virtual" />
      </div>
    </>
  )
}
