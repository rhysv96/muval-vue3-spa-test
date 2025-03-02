import { defineStore } from "pinia";

type State = {
    theme: 'system' | 'light' | 'dark',
}

export const useAuthStore = defineStore('settings', {
    state: (): State => ({
        theme: localStorage.getItem('theme') as State['theme'] ?? 'system',
    }),
    actions: {
        setTheme(theme: State['theme']) {
            this.theme = theme;
            localStorage.setItem('theme', theme);
        },
    },
});
