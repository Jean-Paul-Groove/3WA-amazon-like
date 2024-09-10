import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
    user: undefined,
    setUser: () => {},
});

interface User {
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

    const [ user, setUser ] = useState<User>({
        id: undefined,
        name: undefined,
        email: undefined,
        profile_img: undefined,
        rating: undefined,
        address: undefined,
        type: undefined ,

    });


    const values = {
        user,
        setUser,
    };

    useEffect(() => {
        console.log("AuthProvider user", user);
    }, [user]);
        

    return (
        <AuthContext.Provider value={values}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;

