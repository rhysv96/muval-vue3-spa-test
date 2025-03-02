import { useMutation } from '@tanstack/vue-query';
import type { AxiosInstance } from 'axios';
import useApi from '../useApi';
import type { Task } from './useTasksQuery';

export const useUpdateTaskMutation = () => {
    const api = useApi();

    return useMutation({
        mutationFn: (request: Request) => updateTask(api, request),
    });
};

type Request = {
    id: string;
    title?: string;
    description?: string;
    status?: string;
    user_id?: string | null;
};

const updateTask = async (api: AxiosInstance, request: Request): Promise<Task> => {
    return (await api.patch(`/api/tasks/${request.id}`, request)).data;
};
