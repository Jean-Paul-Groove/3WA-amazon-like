// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import { Token, User } from "../utils/types";

// Lorsque je lance la function 
// cela cherche si il y a une session en cours
// si il y a une session en cours alors ça cherche si il y a des informations sur l'utilisateur
// si il n'y a pas d'informations sur l'utilisateur alors on redirige vers la page de première connexion
// si il n'y a pas de session en cours alors on redirige vers la page de login

const checkSession = async (login:boolean): Promise<null |User &Token> => {
   // const navigate = useNavigate();
    const session = await supabase.auth.getSession();
  

    if (!session.data.session && !login) {
      const isLoginPage = location.pathname === "/login";
  
      if (!isLoginPage) document.location.href = "/login";
      return null;
    } else {
      const userId = session.data.session?.user.id;
  
      if (userId) {
        const data = await supabase.rpc("get_user_informations", {
          session_id: userId,
        });
        
        if (data.length === 0) {
          console.log("Pas d'informations sur l'utilisateur, data vide : ", data);
          
          return null;
        }
  
        if (data) {
          console.log("Données de l'utilisateur : ", data);
          
            const userData:User &{supabase_token:string|undefined} = {
              ...data.data,
              supabase_token: session?.data?.session?.access_token,
            };
    
            return userData;
          } else return null;
      }
      return null
    }
  };
  
  export default checkSession;  