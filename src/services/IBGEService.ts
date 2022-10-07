import { Cep } from "../domain/models/Cep";
import { City } from "../domain/models/City";
import { Api } from "./Api";

export class IBGEService {

    async getCities(state: string): Promise<City[]> {
        try {
            const response = await Api.get("/ibge/cities/" + state);
            return response.data;
        } catch(_e) {
            throw _e;
        }
    }

    async getCep(cep: string): Promise<Cep> {
        try {
            const response = await Api.get("/cep/" + cep);
            return response.data;
        } catch(_e) {
            throw _e;
        }
    }
}