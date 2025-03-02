<script setup lang="ts">
import TaskCard from '@/components/Tasks/TaskCard.vue';
import { useWhoAmIQuery } from '@/composables/auth/useWhoAmIQuery';
import { useTasksQuery } from '@/composables/tasks/useTasksQuery';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const page = ref(Number(route.query.page) || 1);

const { data: whoami } = useWhoAmIQuery();
const { data } = useTasksQuery({ page: page, per_page: 24 });

const navigateToUrl = (urlString: string | null) => {
    if (!urlString) {
        return;
    }

    const url = new URL(urlString);
    page.value = Number(url.searchParams.get('page')) || 1;

    router.push({
        query: {
            page: page.value,
        },
    });
};
</script>

<template>
    <div>
        <div class="flex max-w-screen-xl">
            <h1 class="flex-grow text-3xl dark:text-white">Tasks</h1>
            <RouterLink
                v-if="whoami?.verified"
                to="/tasks/create"
            >
                <button>Create task</button>
            </RouterLink>
        </div>
        <div
            v-if="data"
            class="mt-8 grid max-w-screen-xl grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
            <TaskCard
                v-for="task of data.data"
                :key="task.id"
                :task="task"
            />
        </div>

        <div class="flex gap-2">
            <div
                v-for="link of data?.links ?? []"
                :class="{
                    '!text-blue-600': link.active,
                    'cursor-pointer dark:text-white': !link.active && link.url,
                    'opacity-50 dark:text-white': !link.url,
                }"
                :key="link.label"
                v-html="link.label"
                @click="navigateToUrl(link.url)"
            />
        </div>
    </div>
</template>
