import { supabase } from '../../supabase/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { setCurrentUSer } from '../../store/userReducer';

const BTNLogout = () => {

    const dispatch= useDispatch<AppDispatch>()
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        dispatch(setCurrentUSer(null))
        navigate("/login");
    }
  return (
    <button 
      className='btn-logout'
        onClick={handleLogout}
    >
        BTNLogout
    </button>
  )
}

export default BTNLogout