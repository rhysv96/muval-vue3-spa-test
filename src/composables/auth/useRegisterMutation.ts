import { useMutation } from '@tanstack/vue-query';
import type { AxiosInstance } from 'axios';
import useApi from '../useApi';
import type { WhoAmI } from './useWhoAmIQuery';

export const useRegisterMutation = () => {
    const api = useApi();

    return useMutation({
        mutationFn: (request: Request) => registerUser(api, request),
    });
};

type Request = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

const registerUser = async (api: AxiosInstance, request: Request): Promise<WhoAmI> => {
    return (await api.post('/api/register', request)).data;
};
