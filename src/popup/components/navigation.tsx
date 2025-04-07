import { UserButton } from "@clerk/chrome-extension"
import { Link } from "react-router"

export const Navigation = () => {
  return (
    <div className="plasmo-flex plasmo-items-center plasmo-justify-between plasmo-h-full plasmo-bg-red-500 plasmo-p-2">
      <Link to="/">
        <div>Trizzy</div>
      </Link>
      <div>
        <UserButton />
      </div>
    </div>
  )
}
