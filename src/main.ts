// Import the necessary modules and files from Vue and other dependencies
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

// Import Element Plus (a UI component library) and its associated styles
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// Import the router and state management (Pinia) setup
import router from "./router";
import { createPinia } from "pinia";

// Create the main Vue app instance and set up Pinia
const app = createApp(App);
const pinia = createPinia();

// Configure the app to use the necessary plugins
app.use(router);
app.use(pinia);
app.use(ElementPlus);
app.mount("#app");
