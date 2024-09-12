import "./NavBar.css";
import logo from "../../assets/amazon.svg";
import Cart from "../Cart/Cart";
import Logout from "../Logout/Logout";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store";
import AccountLogo from "../AccountLogo.tsx/AccountLogo";
const NavBar = () => {
const navigate = useNavigate()
const currentUser = useAppSelector(state => state.user.currentUser)
  return (
    <nav className="nav-bar">
      <img onClick={()=> navigate('/products')} className="nav-bar_logo" src={logo} alt="amazon" />
      <div className="nav-bar_actions">
        <div className="nav-bar_account-logo" onClick={(e)=>{e.stopPropagation()
          navigate(currentUser ? '/account':'/login')
        }}>
          <AccountLogo/>
        </div>
      <Cart/>
      <Logout/>
      </div>
    </nav>
  );
};
export default NavBar;
