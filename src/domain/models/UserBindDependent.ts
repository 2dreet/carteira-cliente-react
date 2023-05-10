import { User } from "./User";

export interface UserBindDependent {
    id: number,
    dependent: User,
}