import { createRouter, createWebHistory } from 'vue-router'

// استيراد الصفحات
import ProductShowcaseView from '@/views/ProductShowcaseView.vue'

const routes = [
  {
    path: '/',
    redirect: '/showcase/living-room'
  },
  {
    path: '/showcase/:id?',
    name: 'product-showcase',
    component: ProductShowcaseView,
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/showcase/living-room'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

/* 
  Navigation Guard محدّث يتوافق مع معايير Vue Router 4
  تم إزالة next() لمنع ظهور تحذير [VUE_ROUTER_R0025]
*/
router.beforeEach((to, from) => {
  // عند التوجيه مستقبلاً استخدم return بدلاً من next()
})

export default router