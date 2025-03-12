
import type { App } from 'vue'
import Antd from './antd';
import PrimeVue from './primevue';
import Icons from './icons';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import Components from './components';

export default function registerPlugins(app: App) {
  app.use(Antd);
  PrimeVue(app);
  Icons(app);
  Components(app);
  app.use(ConfirmationService);
  app.use(ToastService);
}



// // import * as AntIcons from "@ant-design/icons-vue";


// // Object.keys(AntIcons).forEach((key) => {
// //   app.component(key, AntIcons[key]);
// // });


