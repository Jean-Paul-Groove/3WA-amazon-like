import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar/NavBar"
import './Layout.css'
import CartDetails from "../components/CartDetails/CartDetails"
const Layout = () => {

  return (
    <section className="layout">
    <NavBar/><CartDetails />
    <Outlet/></section>
  )
}
export default Layout