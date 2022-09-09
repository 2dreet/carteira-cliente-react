import axios, { AxiosError } from 'axios';

export const Api = axios.create({
    baseURL: "http://localhost:8080"
})

Api.interceptors.response.use(response => {
    return response;
}, (error: AxiosError) => {
    if(error.response?.status === 403) {
        window.location.replace("/login?e=true");
    }
    throw error;
});