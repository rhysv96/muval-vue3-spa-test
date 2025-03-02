<script setup lang="ts">
import { RouterView } from 'vue-router';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import AppNav from './components/Base/AppNav.vue';

const showVueQueryDevTools = import.meta.env.DEV;
</script>

<template>
    <AppNav />

    <div class="mt-5">
        <RouterView />
    </div>

    <VueQueryDevtools v-if="showVueQueryDevTools" />
</template>

<style scoped>
nav {
    @apply my-2;

    a {
        @apply mr-2;
    }
}
</style>
