import { AxiosError } from "axios";
import { UserAuth } from "../contexts/AuthenticationContext";
import { Api } from "./Api";

export class AuthenticationService {

    async authtenticate ( login: string, password: string): Promise<UserAuth | undefined> {
        try {
            const response = await Api.post("/user/auth", {login, password});
            return response.data;
        } catch(_e) {
            throw _e;
        }
    }

}