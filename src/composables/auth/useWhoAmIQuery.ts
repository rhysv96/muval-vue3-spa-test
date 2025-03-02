import { useQuery } from "@tanstack/vue-query";
import useApi from "../useApi";
import type { AxiosInstance } from "axios";

export type WhoAmI = {
    id: string,
    name : string,
    email : string,
    email_verified_at : string|null,
    verified : boolean,
}

export const useWhoAmIQuery = () => {
    const api = useApi();

    return useQuery({
        queryKey: ['whoami'],
        queryFn: () => getWhoAmI(api),
        retry: 1,
    });
}

const getWhoAmI = async (api: AxiosInstance): Promise<WhoAmI> => {
    return (await api.get('/api/whoami')).data;
}
