import PrimeVue from "primevue/config";
import Aura from '@primeuix/themes/aura';
import ToastService from 'primevue/toastservice';

export default (app: any) => {
  app.use(PrimeVue, { theme: { preset: Aura } });
  app.use(ToastService);
};
