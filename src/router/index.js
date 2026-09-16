import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import ShopView from '../views/ShopView.vue'
import FavoritesViews from '../views/FavoritesViews.vue'
import CartView from '../views/CartView.vue'
import ProfileView from '../views/ProfileView.vue'
import SettingsView from '../views/SettingsView.vue'
import ProductDetailsView from '../views/ProductDetailsView.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/shop',
    name: 'shop',
    component: ShopView,
    meta: { requiresAuth: true }
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: FavoritesViews,
    meta: { requiresAuth: true }
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/product/:id',
    name: 'product-details',
    component: ProductDetailsView,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// حراسة التنقل: التحقق من الجلسة في sessionStorage عند كل انتقال أو تحديث للصفحة
router.beforeEach((to, from, next) => {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn')

  if (to.meta.requiresAuth && !isLoggedIn) {
    // لو الصفحة بتتطلب تسجيل دخول والمستخدم مش مسجل، وجهه لصفحة الـ auth
    next('/auth')
  } else if (to.path === '/auth' && isLoggedIn) {
    // لو هو مسجل دخول بالفعل وحاول يفتح صفحة الـ auth، وديه على الهوم
    next('/home')
  } else {
    next()
  }
})

export default router