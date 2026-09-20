<template>
  <div id="app" class="min-vh-100 d-flex flex-column bg-light">
    <!-- شريط التنقل العلوي الثابت -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top py-3">
      <div class="container">
        <!-- شعار الموقع -->
        <router-link to="/" class="navbar-brand fw-bold fs-4" style="color: #2c2724;">
          <i class="bi bi-house-heart me-2" style="color: #c5a880;"></i>FurniStyle
        </router-link>

        <!-- زر التجاوب للموبايل -->
        <button 
          class="navbar-toggler border-0 shadow-none" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- الروابط وأيقونات التنقل وحالة الدخول -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-3">
            <li class="nav-item">
              <router-link to="/" class="nav-link fw-semibold">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/shop" class="nav-link fw-semibold">Shop</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/favorites" class="nav-link fw-semibold d-flex align-items-center gap-1">
                <i class="bi bi-heart text-danger"></i> Favorites
                <span class="badge rounded-pill bg-danger text-white ms-1" v-if="shopStore.favorites && shopStore.favorites.length > 0">
                  {{ shopStore.favorites.length }}
                </span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/cart" class="nav-link fw-semibold d-flex align-items-center gap-1">
                <i class="bi bi-bag text-dark"></i> Cart
                <span class="badge rounded-pill bg-dark text-white ms-1" v-if="shopStore.cart && shopStore.cart.length > 0">
                  {{ totalCartItems }}
                </span>
              </router-link>
            </li>

            <!-- قسم تسجيل الدخول -->
            <li class="nav-item ms-lg-3 border-start ps-lg-3" v-if="shopStore.currentUser">
              <div class="d-flex align-items-center gap-2">
                <span class="fw-bold small text-dark"><i class="bi bi-person-circle me-1"></i> {{ shopStore.currentUser }}</span>
                <button @click="shopStore.logout()" class="btn btn-outline-danger btn-sm rounded-pill px-3">Logout</button>
              </div>
            </li>
            <li class="nav-item ms-lg-3 border-start ps-lg-3" v-else>
              <button @click="handleLogin" class="btn btn-dark btn-sm rounded-pill px-4 fw-semibold" style="background-color: #2c2724;">
                Login
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- منطقة عرض الصفحات -->
    <main class="flex-grow-1">
      <router-view />
    </main>

    <!-- الفوتر -->
    <footer class="bg-white text-muted py-4 border-top text-center mt-auto">
      <div class="container">
        <p class="mb-0 small">&copy; 2026 FurniStyle App. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { useShopStore } from '@/stores/shopStore'

export default {
  name: 'App',
  setup() {
    const shopStore = useShopStore()
    return { shopStore }
  },
  computed: {
    totalCartItems() {
      if (!this.shopStore.cart) return 0
      return this.shopStore.cart.reduce((total, item) => total + item.quantity, 0)
    }
  },
  methods: {
    handleLogin() {
      const name = prompt("Please enter your name for login:")
      if (name && name.trim() !== "") {
        this.shopStore.login(name.trim())
      }
    }
  }
}
</script>

<style>
.navbar-nav .nav-link {
  color: #6c757d;
  transition: color 0.2s ease;
}
.navbar-nav .nav-link:hover,
.navbar-nav .nav-link.router-link-active {
  color: #c5a880 !important;
}
</style>