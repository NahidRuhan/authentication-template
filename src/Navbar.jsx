import { NavLink } from "react-router"

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
    <div className="flex-1">
        <NavLink to='/' className="btn btn-ghost text-xl">daisyUI</NavLink>
    </div>
    <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
        <li><NavLink to='/'>Google/Github</NavLink></li>
        <li><NavLink to='/email'>Email/Password</NavLink></li>
        </ul>
    </div>
    </div>
  )
}

export default Navbar
