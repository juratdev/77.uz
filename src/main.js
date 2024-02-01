import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "./locales/i18n";
import VClickOutside from "./directives/VClickOutside";

const app = createApp(App);

app.use(router);
app.use(i18n);
app.directive("click-outside", VClickOutside);
app.mount("#app");
