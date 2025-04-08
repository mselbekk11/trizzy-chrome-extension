import { Link } from "react-router"

export const Landing = () => {
  return (
    <div className="plasmo-flex-1 plasmo-flex plasmo-flex-col plasmo-items-center plasmo-justify-center plasmo-bg-[#F9F9F9] plasmo-overflow-auto">
      {/* Content for non-logged in users */}
      <div className="plasmo-flex plasmo-flex-col plasmo-items-center plasmo-gap-2 plasmo-mb-12 plasmo-pt-12">
        <h1 className="plasmo-text-2xl plasmo-font-bold">Welcome to Trizzy</h1>
        <h3 className="plasmo-text-1xl plasmo-font-bold">
          Please sign in to continue
        </h3>
      </div>
      <Link to="/sign-in">
        <button className="plasmo-bg-black plasmo-text-md plasmo-text-white plasmo-px-4 plasmo-py-2 plasmo-rounded-lg">
          Sign In
        </button>
      </Link>
    </div>
  )
}
