import { createContext, ReactNode, useContext, useState } from "react";
import { User } from "../domain/models/User";
import { UserBind } from "../domain/models/UserBind";

type UserFormContextType = {
    getUser(): User | undefined,
    setUser(user: User | undefined): void,
    setUserBind(user: UserBind | undefined): void,
    getUserBind(): UserBind,
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

    const [userBind, setUserBind] = useState<UserBind>();

    const [open, setOpen] = useState<boolean>(false);
    
    function getUser(): User | undefined {
        return user;
    }

    function getUserBind(): UserBind {
        return userBind ? userBind : {} as UserBind;
    }

    function showForm() {
        setOpen(true);
    }

    function hideForm() {
        setOpen(false);
    }

    return (
        <UserFormContext.Provider value={{ getUser, setUser, hideForm, open, showForm, setUserBind, getUserBind }}>
            { children }
        </UserFormContext.Provider>
    );
}

export const useUserForm = () => useContext(UserFormContext);