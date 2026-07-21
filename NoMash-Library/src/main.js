import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import router from './router/index'
import { initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1lrbD4xhhet7P690py7UxTG7yZkRzBXM",
  authDomain: "week5-zhihaojin.firebaseapp.com",
  projectId: "week5-zhihaojin",
  storageBucket: "week5-zhihaojin.firebasestorage.app",
  messagingSenderId: "546789952167",
  appId: "1:546789952167:web:1265110d6cff948a10e982"
};

const firebaseApp = initializeApp(firebaseConfig)
export const auth = getAuth(firebaseApp)

const app = createApp(App)

app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)
app.mount('#app')