<script setup lang="ts">
import { useWhoAmIQuery } from '@/composables/auth/useWhoAmIQuery';
import { useTaskQuery } from '@/composables/tasks/useTaskQuery';
import { useUpdateTaskMutation } from '@/composables/tasks/useUpdateTaskMutation';
import { createZodPlugin } from '@formkit/zod';
import { useQueryClient } from '@tanstack/vue-query';
import { useRoute } from 'vue-router';
import { z } from 'zod';

const route = useRoute();
const id = route.params.id.toString();

const { data } = useTaskQuery({ id });
const { data: whoami } = useWhoAmIQuery();
const updateTaskMutation = useUpdateTaskMutation();
const queryClient = useQueryClient();

const taskFormSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1).max(255),
    status: z.enum(['pending', 'in_progress', 'complete']),
    user: z
        .object({
            id: z.string(),
            name: z.string(),
        })
        .nullable(),
});

const [zodPlugin, submitHandler] = createZodPlugin(taskFormSchema, async (formData) => {
    await updateTask({
        id,
        title: formData.title,
        description: formData.description,
        status: formData.status,
        user_id: formData.user?.id ?? null,
    });
});

const updateTask = (data: (typeof updateTaskMutation)['variables']['value']) => {
    return updateTaskMutation.mutateAsync(
        { id, ...data },
        {
            onSuccess() {
                queryClient.invalidateQueries({ queryKey: ['task'] });
            },
        },
    );
};
</script>

<template>
    <div>
        <h1 class="text-3xl dark:text-white">Task - {{ data?.title }}</h1>

        <FormKit
            v-if="data"
            type="form"
            :plugins="[zodPlugin]"
            @submit="submitHandler"
            submit-label="Update"
            :disabled="!whoami?.verified"
        >
            <FormKit
                type="text"
                name="title"
                label="Title"
                :value="data?.title"
            />
            <FormKit
                type="textarea"
                name="description"
                label="Description"
                :value="data?.description"
            />
            <FormKit
                type="select"
                name="status"
                label="Status"
                :value="data?.status"
                :options="{
                    pending: 'Pending',
                    in_progress: 'In progress',
                    complete: 'Complete',
                }"
            />
            <FormKit
                type="userSelect"
                name="user"
                label="Assignee"
                :value="data?.assignee"
            />
        </FormKit>
    </div>
</template>
