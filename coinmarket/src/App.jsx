import { Routes, Route, Navigate } from "react-router-dom"
import { Nav } from "./components/Nav"
import { About } from "./routes/About"
import { Home } from "./routes/Home"
import { Contact } from "./routes/Contact"

export const App = () => {
  return (
    <>
      <Nav></Nav>

      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/*" element={ <Navigate to='/'/>}></Route>
      </Routes>
    </>
    )
}
