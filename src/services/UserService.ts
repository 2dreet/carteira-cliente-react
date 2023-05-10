import { SearchUser } from "../domain/dto/SearchUser";
import { User } from "../domain/models/User"
import { UserBind } from "../domain/models/UserBind";
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

    async searchUser(value:string, page:number): Promise<SearchUser> {
        try {
            const response = await Api.get(`/user/dependents/search?searchValue=${value}&page=${page}`);
            return response.data;
        } catch(_e) {
            throw _e;
        }
    }

    async getUserById(id: number): Promise<User> {
        try {
            const response = await Api.get("/user/" + id);
            return response.data;
        } catch(_e) {
            throw _e;
        }
    }

    async getUserBindById(id: number): Promise<UserBind> {
        try {
            const response = await Api.get("/user/bind/" + id);
            return response.data;
        } catch(_e) {
            throw _e;
        }
    }

    async getUsers(): Promise<User[]> {
        try {
            const response = await Api.get("/user/dependents");
            return response.data;
        } catch(_e) {
            throw _e;
        }
    }

    async sendUser(user: User): Promise<User> {
        try {
            if(user.id && user.id > 0) {
                return await this.updateUser(user);
            } else {
                return await this.createUser(user);
            }
        } catch(_e) {
            throw _e;
        }
    }

    async createUser(user: User): Promise<User> {
        try {
            const response = await Api.post("/user/dependent", user);
            return response.data;
        } catch(_e) {
            throw _e;
        }
    }

    async updateUser(user: User): Promise<User> {
        try {
            const response = await Api.put("/user/dependent", user);
            return response.data;
        } catch(_e) {
            throw _e;
        }
    }

    async updateCurrentUser(user: User): Promise<User> {
        try {
            const response = await Api.put("/user", user);
            return response.data;
        } catch(_e) {
            throw _e;
        }
    }

    async resetPasswrod(login: string): Promise<void> {
        try {
            await Api.put("/user/dependent/forgot-password", {login});
        } catch(_e) {
            throw _e;
        }
    }

}