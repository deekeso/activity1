/**
 * main.ts - Application Entry Point
 *
 * Sets up the Vue application, registers global dependencies,
 * and configures key modules.
 *
 */

import "./assets/styles/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import router from "./router";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/es/components/message/style/css";
import "element-plus/theme-chalk/display.css";

// Pinia Creation
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

// Element Plus
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// Registrations
app.use(pinia);
app.use(router).mount("#app");
