import { createRouter, createWebHistory } from 'vue-router'
import { useShopStore } from '@/stores/shopStore'

// Views loaded eagerly (Core Store Pages)
import HomeView from '@/views/HomeView.vue'
import ShopView from '@/views/ShopView.vue'
import ProductDetailsView from '@/views/ProductDetailsView.vue'
import CartView from '@/views/CartView.vue'
import FavoritesView from '@/views/FavoritesView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const routes = [
  { 
    path: '/', 
    name: 'home', 
    component: HomeView,
    meta: { title: 'FurniStyle - Home' }
  },
  { 
    path: '/shop', 
    name: 'shop', 
    component: ShopView,
    meta: { title: 'FurniStyle - Shop Catalog' }
  },
  { 
    path: '/product/:id', 
    name: 'product-details', 
    component: ProductDetailsView, 
    props: true,
    meta: { title: 'FurniStyle - Product Details' }
  },
  { 
    path: '/cart', 
    name: 'cart', 
    component: CartView,
    meta: { title: 'FurniStyle - Shopping Cart' }
  },
  { 
    path: '/favorites', 
    name: 'favorites', 
    component: FavoritesView,
    meta: { title: 'FurniStyle - Saved Favorites' }
  },
  { 
    path: '/showcase', 
    name: 'showcase', 
    component: () => import('@/views/ProductShowcaseView.vue'),
    meta: { title: 'FurniStyle - Product Showcase' }
  },
  { 
    path: '/profile', 
    name: 'profile', 
    component: () => import('@/views/ProfileView.vue'),
    meta: { title: 'FurniStyle - My Profile' }
  },
  { 
    path: '/settings', 
    name: 'settings', 
    component: () => import('@/views/SettingsView.vue'),
    meta: { title: 'FurniStyle - Account Settings' }
  },
  { 
    path: '/auth', 
    name: 'auth', 
    component: () => import('@/views/AuthView.vue'),
    meta: { title: 'FurniStyle - Login / Register' }
  },
  { 
    path: '/:pathMatch(.*)*', 
    name: 'not-found', 
    component: NotFoundView,
    meta: { title: 'FurniStyle - Page Not Found' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Preserve scroll position when navigating back/forward
    if (savedPosition) {
      return savedPosition
    }
    // Scroll smoothly to anchor tag if provided
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    // Default scroll to top smoothly
    return { top: 0, behavior: 'smooth' }
  }
})

// 🔒 Global Navigation Guard: الإجبار على تسجيل الدخول أولاً
router.beforeEach((to, from, next) => {
  const shopStore = useShopStore()

  // إذا كان المستخدم غير مسجل وحاول دخول أي صفحة غير صفحة تسجيل الدخول
  if (!shopStore.currentUser && to.name !== 'auth') {
    next({ name: 'auth' })
  } 
  // إذا كان المستخدم مسجلاً بالفعل وحاول فتح صفحة تسجيل الدخول ينقله للرئيسية
  else if (shopStore.currentUser && to.name === 'auth') {
    next({ name: 'home' })
  } 
  else {
    next()
  }
})

// Navigation Guard to update document title
router.afterEach((to) => {
  document.title = to.meta.title || 'FurniStyle - Modern Furniture Store'
})

export default router