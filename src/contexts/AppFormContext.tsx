import { createContext, ReactNode } from "react";
import { UserFormContextProvider } from "./UserFormContext";

const AppFormContext = createContext("");

interface AppFormContextProviderProps {
    children: ReactNode
}

export function AppFormContextProvider({children}: AppFormContextProviderProps) {
    return (
        <AppFormContext.Provider value={""}>
            <UserFormContextProvider>
                { children }
            </UserFormContextProvider>
        </AppFormContext.Provider>
    )
}