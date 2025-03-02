import { useQuery } from '@tanstack/vue-query';
import useApi from '../useApi';
import type { AxiosInstance } from 'axios';
import { unref, type MaybeRef } from 'vue';

type Request = {
    page: MaybeRef<number>;
    per_page: MaybeRef<number>;
    query: MaybeRef<string>;
};

export const useUsersQuery = (request: Request) => {
    const api = useApi();

    return useQuery({
        queryKey: ['users', request],
        queryFn: () => getUsers(api, request),
        retry: false,
    });
};

export type User = {
    id: string;
    name: string;
};

type UsersResponse = {
    data: User[];
    from: number;
    to: number;
    first_page: number;
    last_page: number;
    per_page: number;
    total: number;
};

const getUsers = async (api: AxiosInstance, request: Request): Promise<UsersResponse> => {
    return (
        await api.get('/api/users', {
            params: {
                page: unref(request.page),
                per_page: unref(request.per_page),
                query: unref(request.query),
            },
        })
    ).data;
};
