import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { VueQueryPlugin } from '@tanstack/vue-query';
import * as FormKit from '@formkit/vue';
import formkitConfig from './formkit/formkit.config';
import VuejsDialog from 'vuejs-dialog';
import 'vuejs-dialog/dist/vuejs-dialog.min.css';
import 'vue-select/dist/vue-select.css';

import App from './App.vue';
import router from './router';
import axios from 'axios';

(async () => {
    await axios({
        method: 'GET',
        baseURL: import.meta.env.VITE_API_URL,
        url: '/sanctum/csrf-cookie',
    });

    const app = createApp(App);

    app.use(createPinia());
    app.use(VueQueryPlugin);
    app.use(VuejsDialog);
    app.use(router);
    app.use(FormKit.plugin, FormKit.defaultConfig(formkitConfig));

    app.mount('#app');
})();

