import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"
import './Layout.css'
const Layout = () => {

  return (
    <section className="layout">
    <NavBar/>
    <Outlet/></section>
  )
}
export default Layout