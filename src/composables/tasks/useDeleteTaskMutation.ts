import { useMutation } from "@tanstack/vue-query"
import type { AxiosInstance } from "axios"
import useApi from "../useApi"
import type { Task } from "./useTasksQuery";

export const useDeleteTaskMutation = () => {
    const api = useApi();

    return useMutation({
        mutationFn: (request: Request) => deleteTask(api, request),
    });
}

type Request = {
    id: string,
}

const deleteTask = async (api: AxiosInstance, request: Request): Promise<Task> => {
    return (await api.delete(`/api/tasks/${request.id}`)).data;
}
