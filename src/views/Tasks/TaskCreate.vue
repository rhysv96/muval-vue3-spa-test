<script setup lang="ts">
import { useWhoAmIQuery } from '@/composables/auth/useWhoAmIQuery';
import { useCreateTaskMutation } from '@/composables/tasks/useCreateTaskMutation';
import { createZodPlugin } from '@formkit/zod';
import { useQueryClient } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';
import { z } from 'zod';

const { data: whoami } = useWhoAmIQuery();
const createTaskMutation = useCreateTaskMutation();
const queryClient = useQueryClient();
const router = useRouter();

const taskFormSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1).max(255),
    status: z.enum([ 'pending', 'in_progress', 'complete' ]),
});

const [zodPlugin, submitHandler] = createZodPlugin(
    taskFormSchema,
    async (formData) => {
        await createTask(formData);
    }
)

const createTask = (data: z.infer<typeof taskFormSchema>) => {
    return createTaskMutation.mutateAsync(data, {
        onSuccess() {
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
        >
            <FormKit type="text" name="title" label="Title" />
            <FormKit type="textarea" name="description" label="Description" />
            <FormKit
                type="select"
                name="status"
                label="Status"
                :options="{
                    pending: 'Pending',
                    in_progress: 'In progress',
                    complete: 'Complete',
                }"
            />
        </FormKit>

    </div>
</template>
