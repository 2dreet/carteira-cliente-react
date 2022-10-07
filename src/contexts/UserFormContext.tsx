import { createContext, ReactNode, useContext, useState } from "react";
import { User } from "../domain/models/User";

type UserFormContextType = {
    getUser(): User | undefined,
    setUser(user: User | undefined): void,
    showForm(): void,
    hideForm(): void,
    open: boolean,
}

interface UserFormContextProps {
    children: ReactNode,
}

const UserFormContext = createContext<UserFormContextType>( {} as UserFormContextType);

export function UserFormContextProvider({ children }: UserFormContextProps) {

    const [user, setUser] = useState<User>();

    const [open, setOpen] = useState<boolean>(false);
    
    function getUser(): User | undefined {
        return user;
    }

    function showForm() {
        setOpen(true);
    }

    function hideForm() {
        setOpen(false);
    }

    return (
        <UserFormContext.Provider value={{ getUser, setUser, hideForm, open, showForm }}>
            { children }
        </UserFormContext.Provider>
    );
}

export const useUserForm = () => useContext(UserFormContext);