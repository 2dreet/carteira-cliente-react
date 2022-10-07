import { Person } from "./Person";

export interface User {
    id: number,
    login: string,
    person: Person,
    rule: string
}