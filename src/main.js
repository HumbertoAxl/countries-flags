import { createApp } from 'vue'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
const app = createApp(App)
// app.component = ('Home', Home)
app.mount('#app')
const sweetAlertOptions = {
    allowOutsideClick: false
}
app.use(VueSweetalert2, sweetAlertOptions)