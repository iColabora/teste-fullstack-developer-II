import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import store, { storeKey } from './store';
import i18n from './i18n';
import PrimeVue from 'primevue/config';
import Toast from 'vue-toastification';

import 'vue-toastification/dist/index.css';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const app = createApp(App);
app.use(router);
app.use(store, storeKey);
app.use(i18n);
app.use(PrimeVue);
app.use(Toast);
app.mount('#app');

export { app };
