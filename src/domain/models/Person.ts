import { Address } from "./Address";

export interface Person {
    id: number,
    name: string,
    email?: string,
    addresses: Address[]
}