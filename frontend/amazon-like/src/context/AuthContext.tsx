import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
    user: undefined,
    setUser: () => {},
});

type UserTypes = {
    id: number | undefined;
    user_id?: string | undefined;
    name: string | undefined;
    email: string | undefined;
    profile_img: string | undefined;
    rating: Float32Array | undefined;
    address: string | undefined;
    type: "SELLER" | "CLIENT" | "ADMIN" | undefined;
}

export const AuthProvider = ({ children }) => {

    const [ user, setUser ] = useState<UserTypes>({
        id: undefined,
        name: undefined,
        email: undefined,
        profile_img: undefined,
        rating: undefined,
        address: undefined,
        type: undefined ,

    });


    

    useEffect(() => {
        console.log("AuthProvider user", user);
    }, [user]);
        
    const values = {
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

