import { useQuery } from '@tanstack/vue-query';
import useApi from '../useApi';
import type { AxiosInstance } from 'axios';
import type { Task } from './useTasksQuery';

type Request = {
    id: string;
};

export const useTaskQuery = (request: Request) => {
    const api = useApi();

    return useQuery({
        queryKey: ['task', request],
        queryFn: () => getTask(api, request),
        enabled: !!request.id,
    });
};

const getTask = async (api: AxiosInstance, request: Request): Promise<Task> => {
    return (
        await api.get(`/api/tasks/${request.id}`, {
            params: request,
        })
    ).data;
};
