import { createApp } from 'vue'
import App from './App.vue'
import router from "./plugins/router/router";
import i18n from "./plugins/i18n/i18n";
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options';

import appController from './Controller';
import '@/styles/text-size.scss'

createApp(App)
    .use(router)
    .use(i18n)
    .use(Quasar, quasarUserOptions)
    .provide('appController', appController )
    .mount('#app');
