<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
    <header>
        <div class="my-5">
            <h1 class="mb-2 text-2xl">Your new app</h1>

            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
            </nav>
        </div>

        <hr />
    </header>

    <div class="mt-5">
        <RouterView />
    </div>
</template>

<style scoped>
nav {
    @apply my-2;

    a {
        @apply mr-2;
    }
}
</style>
