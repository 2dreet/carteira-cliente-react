import { UserAuth } from "../contexts/AuthenticationContext";

export class UserStorageUtil {

    key:string  = "client-wallet-user-authenticated";

    setUser(userAuth: UserAuth):void {
        localStorage.setItem(this.key, JSON.stringify(userAuth));
    }

    getUser():UserAuth | undefined {
        const userAuth = localStorage.getItem(this.key);
        return !! userAuth ? JSON.parse(userAuth) : undefined;
    }

    removeUser():void {
        localStorage.removeItem(this.key);
    }
}