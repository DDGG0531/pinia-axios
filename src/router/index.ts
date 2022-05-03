import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/translate' },
    { path: '/translate', component: () => import('@/views/Translate.vue') },
    { path: '/listPage', component: () => import('@/views/ListPage.vue') }
  ]
})

export default router
