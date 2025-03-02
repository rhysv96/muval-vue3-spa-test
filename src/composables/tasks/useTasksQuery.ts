import { useQuery } from "@tanstack/vue-query";
import useApi from "../useApi";
import type { AxiosInstance } from "axios";
import { unref, type MaybeRef } from "vue";

type Request = {
    page: MaybeRef<number>,
    per_page: MaybeRef<number>,
}

export const useTasksQuery = (request: Request) => {
    const api = useApi();

    return useQuery({
        queryKey: ['tasks', request],
        queryFn: () => getTasks(api, request),
        retry: false,
    });
}

export type Task = {
    id: string,
    title: string,
    description: string,
    status: 'pending' | 'in_progress' | 'complete',
    assignee: {
        id: string,
        name: string,
    } | null,
}

type Link = {
    label: string,
    active: boolean,
    url: string,
}

type TasksResponse = {
    data: Task[],
    links: Link[],
    from: number,
    to: number,
    first_page: number,
    last_page: number,
    per_page: number,
    total: number,
}

const getTasks = async (api: AxiosInstance, request: Request): Promise<TasksResponse> => {
    return (await api.get('/api/tasks', {
        params: {
            page: unref(request.page),
            per_page: unref(request.per_page),
        },
    })).data;
}
