import { createContext, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { useAuthenticationContext } from "./AuthenticationContext";

type AppAuthenticationContexProps = {
    children: ReactNode;
}

const AppAuthenticationContex = createContext({});

export function AppAuthenticationContexProvider({children}: AppAuthenticationContexProps) {

    const { user } = useAuthenticationContext();
    const { pathname } = useLocation();

    return (
        <AppAuthenticationContex.Provider value={{children}}>
            {(!!user || pathname.startsWith("/login")) && children}
            {(!user && !pathname.startsWith("/login")) && 
                <LoadingScreen />
            }
        </ AppAuthenticationContex.Provider>
    );
}