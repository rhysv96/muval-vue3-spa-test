import { useMutation } from '@tanstack/vue-query';
import type { AxiosInstance } from 'axios';
import useApi from '../useApi';

export const useSendEmailVerificationLinkMutation = () => {
    const api = useApi();

    return useMutation({
        mutationFn: () => sendEmailVerificationLink(api),
    });
};

const sendEmailVerificationLink = async (api: AxiosInstance): Promise<unknown> => {
    return (await api.post('/api/send-verification')).data;
};
