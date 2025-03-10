import './assets/main.css'
import "primeicons/primeicons.css";

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import { ShoppingOutlined, HeartOutlined } from "@ant-design/icons-vue";

import PrimeVue from "primevue/config"
import Aura from '@primeuix/themes/aura';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

const app = createApp(App)
app.use(createPinia());
app.use(router);
app.use(Antd);
app.use(PrimeVue, {
  theme: {
      preset: Aura
  }
});
app.use(ConfirmationService);
app.use(ToastService);

app.component("ShoppingOutlined", ShoppingOutlined);
app.component("HeartOutlined", HeartOutlined);

app.mount('#app')




// // import * as AntIcons from "@ant-design/icons-vue";


// // Object.keys(AntIcons).forEach((key) => {
// //   app.component(key, AntIcons[key]);
// // });


