import { useDispatch } from 'react-redux'
import './Logout.css'
import { AppDispatch, useAppSelector } from '../../store'
import { setCurrentUSer } from '../../store/userReducer'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../supabase/supabaseClient'

const Logout = () => {

    const isConnected = useAppSelector(state => state.user.currentUser!=null)
    const dispatch= useDispatch<AppDispatch>()
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        dispatch(setCurrentUSer(null))
        navigate("/login");
    }
  return (isConnected ?
    <div className="logout_container" onClick={()=>handleLogout()}><svg className="logout_svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 12L13 12" stroke="inherit" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M18 15L20.913 12.087V12.087C20.961 12.039 20.961 11.961 20.913 11.913V11.913L18 9" stroke="inherit" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M16 5V4.5V4.5C16 3.67157 15.3284 3 14.5 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H14.5C15.3284 21 16 20.3284 16 19.5V19.5V19" stroke="inherit" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg></div>
 :<></> )
}
export default Logout