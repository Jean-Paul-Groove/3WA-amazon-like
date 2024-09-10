import "./NavBar.css";
import logo from "../assets/amazon.svg";
import Cart from "./Cart";

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <img className="nav-bar_logo" src={logo} alt="amazon" />
      <Cart/>
    </nav>
  );
};
export default NavBar;
