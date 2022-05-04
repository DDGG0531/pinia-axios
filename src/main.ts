import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from 'vue-query'
import { MotionPlugin } from '@vueuse/motion'

import Btn from './components/Btn.vue'

import '@/assets/base.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin)
app.use(MotionPlugin)

app.component('Btn', Btn)
app.mount('#app')
