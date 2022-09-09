import { UseDisclosureReturn, useDisclosure } from "@chakra-ui/react";
import { createContext, ReactNode, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useAuthenticationContext } from "./AuthenticationContext";

interface SidebarDrawerProviderProps {
    children: ReactNode,
}

const SidebarDrawerContext = createContext({} as UseDisclosureReturn);

export function SidebarDrawerProvider({children}: SidebarDrawerProviderProps) {

    const disclosure = useDisclosure();

    return(
        <SidebarDrawerContext.Provider value={disclosure}>
            {children}
        </SidebarDrawerContext.Provider>
    );
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext);

