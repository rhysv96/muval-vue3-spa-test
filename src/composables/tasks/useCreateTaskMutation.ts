import { useMutation } from "@tanstack/vue-query"
import type { AxiosInstance } from "axios"
import useApi from "../useApi"
import type { Task } from "./useTasksQuery";

export const useCreateTaskMutation = () => {
    const api = useApi();

    return useMutation({
        mutationFn: (request: Request) => createTask(api, request),
    });
}

type Request = {
    title: string,
    description: string,
    status: string,
    user_id: string | null,
}

const createTask = async (api: AxiosInstance, request: Request): Promise<Task> => {
    return (await api.post('/api/tasks', request)).data;
}
