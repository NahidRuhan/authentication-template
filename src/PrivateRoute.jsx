import { use } from "react"
import { AuthContext } from "./contexts/AuthContext"

const PrivateRoute = () => {
    const {user} = use(AuthContext)
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-3xl">Thanks for login in: {user.displayName}!</p>
    </div>
  )
}

export default PrivateRoute
