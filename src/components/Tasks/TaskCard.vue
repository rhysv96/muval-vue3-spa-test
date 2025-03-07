<script setup lang="ts">
import { TrashIcon } from '@heroicons/vue/16/solid';
import type { Task } from '@/composables/tasks/useTasksQuery';
import { computed, inject } from 'vue';
import { useUpdateTaskMutation } from '@/composables/tasks/useUpdateTaskMutation';
import { useQueryClient } from '@tanstack/vue-query';
import { useDeleteTaskMutation } from '@/composables/tasks/useDeleteTaskMutation';
import { injectionKey } from 'vuejs-dialog';
import _ from 'lodash';
import { useWhoAmIQuery } from '@/composables/auth/useWhoAmIQuery';

const props = defineProps<{
    task: Task;
}>();

const { data: whoami } = useWhoAmIQuery();

const updateTaskMutation = useUpdateTaskMutation();
const deleteTaskMutation = useDeleteTaskMutation();
const queryClient = useQueryClient();

const $dialog = inject(injectionKey);

const task = computed(() => ({
    ...props.task,
    ...(updateTaskMutation.isPending.value || queryClient.isFetching({ queryKey: ['tasks'] }) ?
        _.pickBy(updateTaskMutation.variables.value)
    :   {}),
}));

const statuses = computed(() => {
    return [
        { label: 'Pending', value: 'pending', selected: task.value.status === 'pending' },
        { label: 'In progress', value: 'in_progress', selected: task.value.status === 'in_progress' },
        { label: 'Complete', value: 'complete', selected: task.value.status === 'complete' },
    ];
});

const pending = computed(() => {
    return updateTaskMutation.isPending.value || deleteTaskMutation.isPending.value;
});

const containerStatusStyles = computed(() => {
    const status = task.value.status;

    if (status === 'pending') {
        return 'border-blue-800 bg-blue-100 dark:bg-blue-950 dark:text-white';
    }

    if (status === 'in_progress') {
        return 'border-yellow-800 bg-yellow-100 dark:bg-yellow-950 dark:text-white';
    }

    if (status === 'complete') {
        return 'border-green-800 bg-green-100 dark:bg-green-950 dark:text-white';
    }

    status satisfies never;

    // runtime fallback
    return 'border-slate-800 bg-slate-100';
});

const onTaskStatusChange = (task: Task, status: string) => {
    updateTaskMutation.mutate(
        { id: task.id, status },
        {
            onSuccess() {
                queryClient.invalidateQueries({ queryKey: ['tasks'] });
            },
        },
    );
};

const deleteTask = async (task: Task) => {
    const result = await $dialog?.confirm(
        {
            title: `Are you sure you'd like to delete the task "${task.title}"?`,
            body: 'This action cannot be reversed!',
        },
        {
            okText: 'Yes',
            cancelText: 'Cancel',
        },
    );

    if (result?.canceled) {
        return;
    }

    deleteTaskMutation.mutate(
        { id: task.id },
        {
            onSuccess() {
                queryClient.invalidateQueries({ queryKey: ['tasks'] });
            },
        },
    );
};
</script>

<template>
    <RouterLink
        :to="`/tasks/${task.id}`"
        class="m-2 flex flex-col gap-2 rounded-md border p-4 text-black shadow hover:no-underline"
        :class="[containerStatusStyles, { 'opacity-75': pending }]"
    >
        <div class="flex items-center gap-1">
            <div
                class="flex-grow truncate font-bold"
                :title="task.title"
            >
                {{ task.title }}
            </div>
            <div class="flex items-center gap-1">
                <select
                    class="cursor-pointer appearance-none rounded border border-black bg-white p-0.5 text-sm text-black opacity-75"
                    @change="onTaskStatusChange(task, ($event.target as HTMLSelectElement).value)"
                    @click.stop.prevent="() => {}"
                    :disabled="pending || !whoami?.verified"
                >
                    <option
                        v-for="status of statuses"
                        :key="status.value"
                        :value="status.value"
                        :selected="status.selected"
                    >
                        {{ status.label }}
                    </option>
                </select>
                <TrashIcon
                    v-if="whoami?.verified"
                    class="h-4 w-4 cursor-pointer text-red-800"
                    @click.stop.prevent="deleteTask(task)"
                />
            </div>
        </div>

        <p class="line-clamp-4 h-20 text-sm">{{ task.description }}</p>

        <p
            v-if="task.assignee"
            class="text-sm italic"
        >
            Assigned to <span class="font-bold">{{ task.assignee.name }}</span>
        </p>
        <p
            v-else
            class="text-sm italic"
        >
            Unassigned
        </p>
    </RouterLink>
</template>
