<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useWhoAmIQuery } from '../../composables/auth/useWhoAmIQuery';
import { useLogoutMutation } from '../../composables/auth/useLogoutMutation';
import { useQueryClient } from '@tanstack/vue-query';
import { useSendEmailVerificationLinkMutation } from '@/composables/auth/useSendEmailVerificationLinkMutation';
import { inject } from 'vue';
import { injectionKey } from 'vuejs-dialog';

const { data } = useWhoAmIQuery();
const logoutMutation = useLogoutMutation();
const sendEmailVerificationLinkMutation = useSendEmailVerificationLinkMutation();
const queryClient = useQueryClient();

const $dialog = inject(injectionKey);

const logout = () => {
    logoutMutation.mutate(undefined, {
        onSuccess() {
            queryClient.setQueryData(['whoami'], null);
        },
    });
};

const sendEmailVerificationLink = () => {
    sendEmailVerificationLinkMutation.mutate(undefined, {
        onSuccess() {
            $dialog?.alert('Email has been sent', { okText: 'Ok' });
        },
        onError() {
            $dialog?.alert('Failed to send email verification link');
        },
    });
};
</script>

<template>
    <header>
        <div class="my-5">
            <h1 class="mb-2 text-2xl dark:text-white">Tasks App</h1>

            <template v-if="data">
                <div class="text-sm dark:text-white">Hello, {{ data?.name }}!</div>
                <div
                    v-if="data && !data.verified"
                    class="text-xs dark:text-white"
                >
                    Your email is not verified.
                    <RouterLink
                        to="#"
                        @click="sendEmailVerificationLink"
                        >Verify now</RouterLink
                    >
                    to gain full access to the platform!
                </div>
            </template>

            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
                <template v-if="data">
                    <RouterLink to="/tasks">Tasks</RouterLink>
                    <RouterLink
                        to="/"
                        @click="logout"
                        >Logout</RouterLink
                    >
                </template>
                <template v-else>
                    <RouterLink to="/login">Log in</RouterLink>
                    <RouterLink to="/register">Register</RouterLink>
                </template>
            </nav>
        </div>

        <hr />
    </header>
</template>

<style scoped>
nav {
    @apply my-2;

    a {
        @apply mr-2;
    }
}
</style>
