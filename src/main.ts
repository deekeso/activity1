import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import { createPinia } from "pinia";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import { useAuthStore } from "./stores/authStore";

const app = createApp(App);

app.use(createPinia());
app.use(ElementPlus);

const authStore = useAuthStore();
authStore.initializeAuth();

app.mount("#app");
