import { Person } from "./Person";
import { UserBindDependent } from "./UserBindDependent";
import { UserBindManager } from "./UserBindManager";

export interface UserBind {
    id: number,
    login: string,
    person: Person,
    rule: string,
    dependents: UserBindDependent[],
    managers: UserBindManager[]
}