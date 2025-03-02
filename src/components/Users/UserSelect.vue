<script setup lang="ts">
import { useUsersQuery, type User } from '@/composables/users/useUsersQuery';
import type { FormKitFrameworkContext } from '@formkit/core';
import { ref, watch } from 'vue';
// @ts-expect-error no types available
import VueSelect from 'vue-select';

const props = defineProps<{
    context: FormKitFrameworkContext;
}>();

const search = ref('');
const { data } = useUsersQuery({ page: 1, per_page: 20, query: search });

const value = ref<User | null>(props.context._value);

watch(value, (value) => {
    props.context.node.input(value || null);
});
</script>

<template>
    <div class="max-w-[20em]">
        <div class="mb-1 text-sm font-bold dark:text-white">{{ props.context.label }}</div>
        <VueSelect
            v-model="value"
            class="mb-4 shadow"
            label="name"
            :options="data?.data ?? []"
            :disabled="context.disabled"
            @search="(query: string) => (search = query)"
        />
    </div>
</template>

<style scoped>
@media (prefers-color-scheme: dark) {
    >>> {
        --vs-disabled-bg: rgba(0, 0, 0, 0);
        --vs-controls-color: rgb(115, 115, 115);
        --vs-border-color: rgb(115, 115, 115);

        --vs-dropdown-bg: #282c34;
        --vs-dropdown-color: #cc99cd;
        --vs-dropdown-option-color: #ffffff;

        --vs-selected-bg: #664cc3;
        --vs-selected-color: #eeeeee;

        --vs-search-input-color: #eeeeee;

        --vs-dropdown-option--active-bg: #664cc3;
        --vs-dropdown-option--active-color: #eeeeee;
    }
}
</style>
