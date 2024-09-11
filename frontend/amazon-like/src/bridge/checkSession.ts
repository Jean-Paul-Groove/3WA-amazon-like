import { Navigate } from "react-router-dom";
import { AppDispatch } from "../store";
import { fetchUserById } from "../store/userReducer";
import { supabase } from "../supabase/supabaseClient";
import { Token, User } from "../utils/types";
import { useDispatch } from "react-redux";
// Lorsque je lance la function 
// cela cherche si il y a une session en cours
// si il y a une session en cours alors ça cherche si il y a des informations sur l'utilisateur
// si il n'y a pas d'informations sur l'utilisateur alors on redirige vers la page de première connexion
// si il n'y a pas de session en cours alors on redirige vers la page de login

const checkSession = async (login:boolean) => {

    const session = await supabase.auth.getSession();
  

    if (!session.data.session && !login) {
      const isLoginPage = location.pathname === "/login";
  
      if (!isLoginPage) document.location.href = "/login";
      return null;
    } else {
      const userSession = {
        user_id:session.data.session?.user.id,
        supabase_token:session.data.session?.access_token
      }

      if(userSession.user_id){
        return userSession
      }
      else{
        document.location.href = "/login";
    }
  }
};
  
  export default checkSession;