import './assets/main.css'
import "primeicons/primeicons.css";

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import 'ant-design-vue/dist/reset.css';
import registerPlugins from './plugins';

const app = createApp(App)
app.use(createPinia());
app.use(router);

registerPlugins(app);
app.mount('#app')


