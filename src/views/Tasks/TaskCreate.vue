<script setup lang="ts">
import { useWhoAmIQuery } from '@/composables/auth/useWhoAmIQuery';
import { useCreateTaskMutation } from '@/composables/tasks/useCreateTaskMutation';
import { useDraftTaskStore } from '@/store/useDraftTaskStore';
import { createZodPlugin } from '@formkit/zod';
import { useQueryClient } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';
import { z } from 'zod';

const draftTaskStore = useDraftTaskStore();
const { data: whoami } = useWhoAmIQuery();
const createTaskMutation = useCreateTaskMutation();
const queryClient = useQueryClient();
const router = useRouter();

const taskFormSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1).max(255),
    status: z.enum([ 'pending', 'in_progress', 'complete' ]),
    user: z.object({
        id: z.string(),
        name: z.string(),
    }).optional(),
});

const [zodPlugin, submitHandler] = createZodPlugin(
    taskFormSchema,
    async (formData) => {
        await createTask(formData);
    }
)

// const onFormChange = (data: z.infer<typeof taskFormSchema>) => {
const onFormChange = (data: z.infer<typeof taskFormSchema>) => {
    draftTaskStore.title = data.title;
    draftTaskStore.description = data.description;
    draftTaskStore.status = data.status;
    draftTaskStore.user = data.user ?? null;
}

const createTask = (data: z.infer<typeof taskFormSchema>) => {
    const payload = {
        title: data.title,
        description: data.description,
        status: data.status,
        user_id: data.user?.id ?? null,
    }
    return createTaskMutation.mutateAsync(payload, {
        onSuccess() {
            draftTaskStore.$reset();
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            router.push('/tasks');
        },
    });
}
</script>

<template>
    <div>
        <h1 class="text-3xl dark:text-white">Create task</h1>

        <FormKit
            type="form"
            :plugins="[zodPlugin]"
            @submit="submitHandler"
            submit-label="Create"
            :disabled="!whoami?.verified"
            @input="(onFormChange as any)"
        >
            <FormKit type="text" name="title" label="Title" :value="draftTaskStore.title" />
            <FormKit type="textarea" name="description" label="Description" :value="draftTaskStore.description" />
            <FormKit
                type="select"
                name="status"
                label="Status"
                :value="draftTaskStore.status"
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
                :value="draftTaskStore.user"
            />
        </FormKit>

    </div>
</template>
