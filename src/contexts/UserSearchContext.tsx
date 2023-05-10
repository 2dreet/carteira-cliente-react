import { createContext, ReactNode, useContext, useState } from "react";
import { User } from "../domain/models/User";

type UserSearchContextType = {
    searchUser: User[],
    setSearchUsers(user: User[]): void,
    showSearchUserForm(): void,
    hideSearchUserForm(): void,
    openSearchUser: boolean,
}

interface UserSearchContextProps {
    children: ReactNode,
}

const UserSearchContext = createContext<UserSearchContextType>( {} as UserSearchContextType);

export function UserSearchContextProvider({ children }: UserSearchContextProps) {

    const [searchUser, setSearchUsers] = useState<User[]>([]);

    const [openSearchUser, setOpenSearchUser] = useState<boolean>(false);
    
    function showSearchUserForm() {
        setOpenSearchUser(true);
    }

    function hideSearchUserForm() {
        setOpenSearchUser(false);
    }

    return (
        <UserSearchContext.Provider value={{ searchUser, setSearchUsers, hideSearchUserForm, openSearchUser, showSearchUserForm}}>
            { children }
        </UserSearchContext.Provider>
    );
}

export const useSearchContext = () => useContext(UserSearchContext);