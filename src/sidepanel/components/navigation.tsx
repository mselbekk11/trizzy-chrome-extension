import { UserButton } from "@clerk/chrome-extension"
import { Link } from "react-router"

import Logo from "./logo"

export const Navigation = () => {
  return (
    <div className="plasmo-flex plasmo-items-center plasmo-justify-between plasmo-h-full plasmo-bg-white plasmo-p-4 plasmo-border-b plasmo-border-gray-200">
      {/* <Link to="/">
      <div className="">
      <Logo />
      </div>
        <div>Trizzy</div>
      </Link> */}
      <div className="plasmo-flex plasmo-w-full plasmo-justify-between plasmo-lg:plasmo-w-auto">
        <Link
          to="/"
          className="plasmo-flex plasmo-items-center plasmo-space-x-2">
          <div className="plasmo-flex plasmo-aspect-square plasmo-size-8 plasmo-items-center plasmo-justify-center plasmo-rounded-lg plasmo-text-sidebar-primary-foreground">
            {/* <LogoThree /> */}
            <Logo />
          </div>
          <span className="plasmo-font-extrabold plasmo-text-1xl plasmo-text-slate-800">
            Trizzy
          </span>
        </Link>
      </div>
      <div>
        <UserButton />
      </div>
    </div>
  )
}
