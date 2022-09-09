import { User } from "../domain/model/User"
import { Api } from "./Api";

export class UserService {

    async getUser(): Promise<User> {
        try {
            const response = await Api.get("/user");
            return response.data;
        } catch(_e) {
            throw _e;
        }
    }

    async getUsers(): Promise<User[]> {
        try {
            const response = await Api.get("/user/all");
            return response.data;
        } catch(_e) {
            throw _e;
        }
    }
}