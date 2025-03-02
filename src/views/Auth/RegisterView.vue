<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useQueryClient } from '@tanstack/vue-query';
import { z } from 'zod';
import { createZodPlugin } from '@formkit/zod';
import { useRegisterMutation } from '@/composables/auth/useRegisterMutation';

const registerMutation = useRegisterMutation();
const queryClient = useQueryClient();
const router = useRouter();

const registerFormSchema = z
    .object({
        name: z.string().min(1),
        email: z.string().min(1),
        password: z.string().min(6),
        password_confirmation: z.string().min(6),
    })
    .superRefine((val, ctx) => {
        if (val.password !== val.password_confirmation) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Passwords don't match",
                path: ['password'],
            });
        }
    });

const [zodPlugin, submitHandler] = createZodPlugin(registerFormSchema, async (formData) => {
    await register(formData);
});

const register = async (data: z.infer<typeof registerFormSchema>) => {
    registerMutation.mutate(data, {
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
        <h1 class="text-3xl dark:text-white">Register</h1>
        <FormKit
            type="form"
            :plugins="[zodPlugin]"
            @submit="submitHandler"
            submit-label="Register"
        >
            <FormKit
                type="text"
                name="name"
                label="Name"
            />
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
            <FormKit
                type="password"
                name="password_confirmation"
                label="Confirm password"
            />
        </FormKit>
    </div>
</template>
