
import type { App } from 'vue'
import Antd from './antd';
import PrimeVue from './primevue';
import Icons from './icons';
import ConfirmationService from 'primevue/confirmationservice';
import Components from './components';

export default function registerPlugins(app: App) {
  app.use(Antd);
  PrimeVue(app);
  Icons(app);
  Components(app);
  app.use(ConfirmationService);
}

