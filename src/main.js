import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

export const app = createApp(App)
app.use(store).use(router).use(ElementPlus).use(VueAxios,axios).mount('#app')
