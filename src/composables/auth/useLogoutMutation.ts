import { useMutation } from '@tanstack/vue-query';
import type { AxiosInstance } from 'axios';
import useApi from '../useApi';

export const useLogoutMutation = () => {
    const api = useApi();

    return useMutation({
        mutationFn: () => postLogout(api),
    });
};

const postLogout = async (api: AxiosInstance): Promise<unknown> => {
    return (await api.post('/api/logout')).data;
};
