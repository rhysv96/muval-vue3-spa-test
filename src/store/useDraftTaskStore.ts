import type { Task } from "@/composables/tasks/useTasksQuery";
import type { User } from "@/composables/users/useUsersQuery";
import { defineStore } from "pinia";

type State = {
    title: string,
    description: string,
    status: Task['status'],
    user: User | null,
}

export const useDraftTaskStore = defineStore('draftTask', {
    state: (): State => ({
        title: '',
        description: '',
        status: 'pending',
        user: null,
    }),
});
