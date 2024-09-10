import { supabase } from '../supabase/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BTNLogout = () => {

    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
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