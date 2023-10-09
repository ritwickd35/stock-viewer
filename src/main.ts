import "./assets/main.css";
import "./assets/base.css";
import PrimeVue from "primevue/config";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import "primevue/resources/themes/lara-light-teal/theme.css";
import "bootstrap/dist/css/bootstrap.css";
import "primevue/resources/primevue.min.css";

import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

app.use(PrimeVue);
app.use(ToastService);
app.component("Toast", Toast);

app.mount("#app");
