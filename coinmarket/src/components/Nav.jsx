import { NavLink } from "react-router-dom"

export const Nav = () => {
  return (
    <div className="bg-green-700 p-5 flex justify-between border-b border-gray-200">
      <div>
        <NavLink to='/' className="text-lg font-bold text-white">coinmarket</NavLink>
      </div>
      <div>
        <ul className="flex gap-5">
          <li className="text-white">
            <NavLink to='/'>Home</NavLink>
          </li>
          <li className="text-white">
            <NavLink to='/about'>About</NavLink>
          </li>
          <li className="text-white">
            <NavLink to='/contact'>Contact</NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}
