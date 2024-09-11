import "./NavBar.css";
import logo from "../../assets/amazon.svg";
import Cart from "../Cart/Cart";
import logout from '../../assets/logout.svg'
const NavBar = () => {
  return (
    <nav className="nav-bar">
      <img className="nav-bar_logo" src={logo} alt="amazon" />
      <div className="nav-bar_actions">
      <img className="nav-bar_logo" src={logout} alt="logout" />
      <Cart/>
      </div>
    </nav>
  );
};
export default NavBar;
