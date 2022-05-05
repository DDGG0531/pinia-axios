import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/translate' },
    {
      path: '/translate',
      component: () => import('@/views/Translate/index.js')
    },
    { path: '/listPage', component: () => import('@/views/ListPage/index.js') }
  ]
})

export default router
