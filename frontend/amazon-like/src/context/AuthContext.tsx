import { createContext, useContext, useEffect, useState } from "react";
import { ChildrenType } from "../lib/types";
import { supabase } from "../supabase/supabaseClient";

const AuthContext = createContext({
  user: undefined,
  setUser: () => {},
});

export const AuthProvider = ({ children }: ChildrenType) => {

  const [user, setUser] = useState();

    const checkSession = async () => {
        const session = await supabase.auth.getSession();
        if (session) {
            await supabase.rpc('get_user_information', {
                user_id: session.data.session.user.id
            }).then(({ data, error }) => {
                if (error) {
                    console.error('Error:', error.message)
                    return
                }
                else{
                    console.log('Data:', data);
                    setUser(data)
                }
            })
        }
        else{
            console.log('No session');
    }

    useEffect(()=> {
        checkSession()

    },[])




  const values: any = {
    user,
    setUser,
  };
  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
