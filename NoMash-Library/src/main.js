import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import router from './router/index'

import './firebase/init.js'

const app = createApp(App)

app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)
app.mount('#app')