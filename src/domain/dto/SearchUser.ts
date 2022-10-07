import { User } from "../models/User";

export interface SearchUser {

    users: User[],
	total: number,
	totalByPage: number,
	totalPage: number
}