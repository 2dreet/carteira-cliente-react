import { AxiosError } from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ErrorDTO } from "../domain/dto/ErrorDTO";
import { User } from "../domain/models/User";
import { Api } from "../services/Api";
import { AuthenticationService } from "../services/AuthenticationService";
import { UserService } from "../services/UserService";
import { UserStorageUtil } from "../utils/UserStorageUtil";
import { useMessageContext } from "./MessageContext";

export type UserAuth = {
    token: string
}

type AuthenticationContextProviderProps = {
    children: ReactNode
}

type AuthenticationContextData = {
    user: User | undefined,
    expired: boolean,
    setExpired(render: boolean): void
    authenticate(login: string, password: string): Promise<void>,
    logOut(render: boolean): void
}

const AuthenticationContext = createContext<AuthenticationContextData>({} as AuthenticationContextData);

export function AuthenticationContextProvider( { children }: AuthenticationContextProviderProps ) {

    const { pathname, search } = useLocation();

    const { setErrorMessage } = useMessageContext();

    const navigate = useNavigate();

    const [expired, setExpired] = useState(false)

    const userStorage = new UserStorageUtil();

    const userService = new UserService();

    const service = new AuthenticationService();

    const [user, setUser] = useState<User | undefined>();

    async function authenticate (login: string, password: string) {
        try { 
            const userAuth: UserAuth | undefined = await service.authtenticate(login, password);
            if(userAuth) {
                userStorage.setUser(userAuth);
                await getUser();
                navigate("/");
            }
        } catch (_e) {
            const error: AxiosError = (_e as AxiosError);
            const erroData = (error?.response?.data as ErrorDTO);
            setErrorMessage(erroData.message);
        }
    }

    async function getUser() {
        updateHeader();
        try{
            const user = await userService.getUser();
            if(user) {
                setUser(user);
            } 
        } catch (_e) {
            const error: AxiosError = (_e as AxiosError);
            const erroData = (error?.response?.data as ErrorDTO);
            setErrorMessage(erroData.message);
            logOut(true);
        }
    }

    function updateHeader() {
        Api.defaults.headers.common['Authorization'] = `Bearer ${userStorage.getUser()?.token}`;
    }

    function logOut(render: boolean) {
        userStorage.removeUser();
        setUser(undefined);
        if(render === true){
            navigate("/login");
        } else if(search.startsWith("?e=true")) {
            setExpired(true);
        }
    }

    // eslint-disable-next-line
    useEffect(() => {
        if(!user && !pathname.startsWith("/login")){
            const userAuth = userStorage.getUser();
            if(userAuth) {
                getUser();
            } else {
                logOut(true);
            }
        }
    },[]);

    return(
        <AuthenticationContext.Provider value={{authenticate, logOut, user, expired, setExpired}}>
            {children}
        </AuthenticationContext.Provider>
    );
}

export const useAuthenticationContext = () => useContext(AuthenticationContext);

