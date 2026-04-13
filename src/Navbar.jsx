import { use } from "react"
import { NavLink } from "react-router"
import { AuthContext } from "./contexts/AuthContext"
import { Link } from "react-router"

const Navbar = () => {
  const {user,signOutUser} = use(AuthContext)
  const handleClick = ()=> {
    signOutUser().then().catch(error=>console.log(error.message))
  }
  return (
    <div className="navbar bg-base-100 shadow-sm">
    <div className="flex-1">
        <NavLink to='/' className="btn btn-ghost text-xl">Authentication</NavLink>
    </div>
    <div className="flex-none">
        <ul className="menu menu-horizontal px-1 flex items-center gap-5">
        <li><NavLink to='/'>Google/Github</NavLink></li>
        <li><NavLink to='/email'>Email/Password</NavLink></li>
        <li><NavLink to='/private'>Private Route</NavLink></li>
        { user ? <li onClick={handleClick}>Sign Out</li> : <Link to='/login'><li>Login</li></Link>}
        </ul>
    </div>
    </div>
  )
}

export default Navbar
