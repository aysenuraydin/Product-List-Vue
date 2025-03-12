import type { App } from 'vue';
import { ShoppingOutlined, HeartOutlined } from "@ant-design/icons-vue";

export default function registerComponents(app: App) {
  app.component("ShoppingOutlined", ShoppingOutlined);
  app.component("HeartOutlined", HeartOutlined);
}