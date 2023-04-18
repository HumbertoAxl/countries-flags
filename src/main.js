import { createApp } from "vue";
import App from "@/App.vue";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import router from "../router/router";

const app = createApp(App);
const sweetAlertOptions = {
    allowOutsideClick: false,
};
app.use(VueSweetalert2, sweetAlertOptions)
app.use(router);
app.mount("#app");