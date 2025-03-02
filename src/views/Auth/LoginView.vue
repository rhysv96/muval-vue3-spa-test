<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useLoginMutation } from '../../composables/auth/useLoginMutation';
import { useQueryClient } from '@tanstack/vue-query';
import { z } from 'zod';
import { createZodPlugin } from '@formkit/zod';

const loginMutation = useLoginMutation();
const queryClient = useQueryClient();
const router = useRouter();

const loginFormSchema = z.object({
    email: z.string().min(1),
    password: z.string().min(1),
});

const [zodPlugin, submitHandler] = createZodPlugin(loginFormSchema, async (formData) => {
    await login(formData);
});

const login = async (data: z.infer<typeof loginFormSchema>) => {
    loginMutation.mutate(data, {
        onSuccess(data) {
            queryClient.setQueryData(['whoami'], data);
            queryClient.invalidateQueries({ queryKey: ['whoami'] });
            router.push('/');
        },
    });
};
</script>

<template>
    <div>
        <h1 class="text-3xl dark:text-white">Log in</h1>
        <FormKit
            type="form"
            :plugins="[zodPlugin]"
            @submit="submitHandler"
            submit-label="Log in"
        >
            <FormKit
                type="email"
                name="email"
                label="Email"
            />
            <FormKit
                type="password"
                name="password"
                label="Password"
            />
        </FormKit>
    </div>
</template>
