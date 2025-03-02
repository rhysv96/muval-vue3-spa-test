import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue'),
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/Auth/LoginView.vue'),
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/Auth/RegisterView.vue'),
        },
        {
            path: '/tasks',
            name: 'task-list',
            component: () => import('../views/Tasks/TaskListView.vue'),
        },
        {
            path: '/tasks/create',
            name: 'create-task',
            component: () => import('../views/Tasks/TaskCreate.vue'),
        },
        {
            path: '/tasks/:id',
            name: 'view-task',
            component: () => import('../views/Tasks/TaskView.vue'),
        },
    ],
});

export default router;
