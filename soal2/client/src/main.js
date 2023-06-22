// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { markRaw } from 'vue'
import ToastPlugin from 'vue-toast-notification'
// Import one of the available themes
import 'vue-toast-notification/dist/theme-default.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

pinia.use(({ store }) => {
  store.router = markRaw(router)
  store.$toast = app.config.globalProperties.$toast
})

app.use(pinia)
app.use(router)
app.use(ToastPlugin, {
  // One of the options
  position: 'top'
})
app.mount('#app')
