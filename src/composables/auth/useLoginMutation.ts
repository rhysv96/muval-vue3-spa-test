import { useMutation } from "@tanstack/vue-query"
import type { AxiosInstance } from "axios"
import useApi from "../useApi"
import type { WhoAmI } from "./useWhoAmIQuery";

export const useLoginMutation = () => {
    const api = useApi();

    return useMutation({
        mutationFn: (request: Request) => postLogin(api, request),
    });
}

type Request = {
    email: string,
    password: string,
}

const postLogin = async (api: AxiosInstance, request: Request): Promise<WhoAmI> => {
    return (await api.post('/api/login', request)).data;
}
