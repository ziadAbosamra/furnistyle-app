import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ShopView from '@/views/ShopView.vue'
import ProductDetailsView from '@/views/ProductDetailsView.vue'
import CartView from '@/views/CartView.vue'
import FavoritesViews from '@/views/FavoritesViews.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/shop',
    name: 'shop',
    component: ShopView
  },
  {
    path: '/product/:id',
    name: 'product-details',
    component: ProductDetailsView
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: FavoritesViews
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router