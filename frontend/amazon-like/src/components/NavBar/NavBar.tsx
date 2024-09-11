import "./NavBar.css";
import logo from "../../assets/amazon.svg";
import Cart from "../Cart/Cart";
import Logout from "../Logout/Logout";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
const navigate = useNavigate()
  return (
    <nav className="nav-bar">
      <img onClick={()=> navigate('/products')} className="nav-bar_logo" src={logo} alt="amazon" />
      <div className="nav-bar_actions">
      <Cart/>
      <Logout/>
      </div>
    </nav>
  );
};
export default NavBar;
