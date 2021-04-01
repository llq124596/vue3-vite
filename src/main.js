import { createApp } from 'vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css';
import '@/style/reset.scss'
import store from './store'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.mount('#app')
