import axios from 'axios';

export default function useApi() {
    return axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        withCredentials: true,
        withXSRFToken: true,
        headers: {
            Accept: 'application/json',
        },
    });
}
