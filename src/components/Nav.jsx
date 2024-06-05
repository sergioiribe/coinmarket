import { Link } from 'react-router-dom'
const Nav = () => {
  return (
    <>
      <header className="bg-green-500">
        <Link to="/">coinmarket</Link>

        <nav>
          <ul>
            <Link to="/home">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Nav
