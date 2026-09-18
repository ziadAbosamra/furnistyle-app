<template>
  <div :class="{ 'dark-mode-theme': isDarkMode }" class="app-wrapper min-vh-100 d-flex flex-column position-relative">
    
    <!-- التنبيه العصري (Toast Notification) يظهر في زاوية الشاشة -->
    <transition name="fade">
      <div v-if="shopStore.toast.show" class="position-fixed bottom-0 end-0 m-4 p-3 rounded-4 shadow-lg text-white d-flex align-items-center gap-3 z-index-toast" style="background-color: #2c2724; border: 1px solid #c5a880;">
        <div class="rounded-circle d-flex align-items-center justify-content-center text-white shadow-sm" style="width: 38px; height: 38px; background-color: #c5a880;">
          <i class="bi bi-bag-check fs-5"></i>
        </div>
        <div>
          <h6 class="fw-bold mb-0" style="color: #c5a880;">FurniStyle Cart</h6>
          <small class="text-light opacity-75">{{ shopStore.toast.message }}</small>
        </div>
      </div>
    </transition>

    <!-- Navbar الاحترافي -->
    <nav v-if="showNavbar" class="navbar navbar-expand-lg bg-white border-bottom sticky-top py-3 px-4 shadow-sm">
      <div class="container-fluid">
        <router-link to="/home" class="navbar-brand fw-bold fs-4 text-decoration-none" style="color: #2c2724;">
          Furni<span style="color: #c5a880;">Style</span>
        </router-link>

        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="mainNavbar">
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0 gap-3">
            <li class="nav-item">
              <router-link to="/home" class="nav-link fw-semibold" active-class="text-dark fw-bold border-bottom border-dark border-2">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/shop" class="nav-link fw-semibold" active-class="text-dark fw-bold border-bottom border-dark border-2">Shop</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/favorites" class="nav-link fw-semibold d-flex align-items-center gap-1" active-class="text-dark fw-bold border-bottom border-dark border-2">
                Favorites 
                <span v-if="favoritesCount > 0" class="badge rounded-pill bg-danger" style="font-size: 0.7rem;">{{ favoritesCount }}</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/cart" class="nav-link fw-semibold d-flex align-items-center gap-1" active-class="text-dark fw-bold border-bottom border-dark border-2">
                Cart 
                <span v-if="cartCount > 0" class="badge rounded-pill bg-success" style="font-size: 0.7rem;">{{ cartCount }}</span>
              </router-link>
            </li>
          </ul>

          <!-- أزرار البروفايل والإعدادات -->
          <div class="d-flex align-items-center gap-3">
            <router-link to="/profile" class="btn btn-outline-dark rounded-pill px-3 py-2 btn-sm fw-semibold">
              <i class="bi bi-person me-1"></i> Profile
            </router-link>
            <router-link to="/settings" class="btn btn-dark rounded-pill px-3 py-2 btn-sm fw-semibold" style="background-color: #2c2724;">
              <i class="bi bi-gear me-1"></i> Settings
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- عرض الصفحات -->
    <div class="flex-grow-1">
      <router-view :key="$route.fullPath" />
    </div>

    <!-- Footer الاحترافي -->
    <footer v-if="showNavbar" class="bg-dark text-light pt-5 pb-4 mt-auto border-top border-secondary">
      <div class="container">
        <div class="row g-4 justify-content-between">
          <div class="col-lg-4 col-md-6">
            <h3 class="fw-bold mb-3" style="color: #c5a880;">
              Furni<span class="text-white">Style</span>
            </h3>
            <p class="text-secondary small mb-3">
              Transform your space into a masterpiece with our modern handcrafted furniture collections and high-end aesthetics.
            </p>
            <div class="d-flex gap-3 fs-5">
              <a href="#" class="text-light text-decoration-none hover-gold"><i class="bi bi-facebook"></i></a>
              <a href="#" class="text-light text-decoration-none hover-gold"><i class="bi bi-instagram"></i></a>
              <a href="#" class="text-light text-decoration-none hover-gold"><i class="bi bi-twitter"></i></a>
            </div>
          </div>

          <div class="col-lg-2 col-md-6">
            <h5 class="fw-bold mb-3 text-white">Quick Links</h5>
            <ul class="list-unstyled d-flex flex-column gap-2">
              <li><router-link to="/home" class="text-secondary text-decoration-none hover-link">Home</router-link></li>
              <li><router-link to="/shop" class="text-secondary text-decoration-none hover-link">Shop</router-link></li>
              <li><router-link to="/favorites" class="text-secondary text-decoration-none hover-link">Favorites</router-link></li>
              <li><router-link to="/cart" class="text-secondary text-decoration-none hover-link">Cart</router-link></li>
            </ul>
          </div>

          <div class="col-lg-4 col-md-6">
            <h5 class="fw-bold mb-3 text-white">Stay Updated</h5>
            <p class="text-secondary small">Subscribe to our newsletter for exclusive offers and new arrivals.</p>
            <div class="input-group mb-3">
              <input type="email" class="form-control bg-secondary text-light border-0 shadow-none" placeholder="Enter your email">
              <button class="btn text-white fw-semibold px-4" style="background-color: #c5a880; border-color: #c5a880;" type="button">
                Join
              </button>
            </div>
          </div>
        </div>

        <hr class="border-secondary my-4">

        <div class="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <p class="text-secondary small mb-0">&copy; 2026 FurniStyle. All rights reserved.</p>
          <button @click="scrollToTop" class="btn btn-outline-light btn-sm rounded-pill px-4 py-2 d-flex align-items-center gap-2 shadow-sm fw-semibold">
            <i class="bi bi-arrow-up"></i> Back to Top
          </button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useShopStore } from '@/stores/shopStore'

const route = useRoute()
const shopStore = useShopStore()
const isDarkMode = ref(false)

const showNavbar = computed(() => route.path !== '/auth')

const cartCount = computed(() => shopStore.cartTotalItems)
const favoritesCount = computed(() => shopStore.favoritesCount)

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  const checkDarkMode = () => {
    const savedSettings = localStorage.getItem('furni_settings')
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        isDarkMode.value = parsed.darkMode || false
      } catch (e) {
        console.error(e)
      }
    }
  }
  
  checkDarkMode()
  // تحديث دوري بسيط لو المستخدم غير الدارك مود من صفحة الإعدادات
  window.addEventListener('storage', checkDarkMode)
})
</script>

<style>
.z-index-toast {
  z-index: 9999;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.dark-mode-theme,
body.dark-mode-theme {
  background-color: #121212 !important;
  color: #f8f9fa !important;
}
.dark-mode-theme .navbar,
.dark-mode-theme .card,
.dark-mode-theme .bg-white {
  background-color: #1e1e1e !important;
  color: #f8f9fa !important;
  border-color: #2c2c2c !important;
}
.dark-mode-theme .navbar-brand,
.dark-mode-theme .nav-link {
  color: #f8f9fa !important;
}
.dark-mode-theme .form-control,
.dark-mode-theme .bg-light {
  background-color: #2a2a2a !important;
  color: #fff !important;
  border-color: #333 !important;
}
.hover-link:hover {
  color: #c5a880 !important;
  transition: color 0.2s ease;
}
.hover-gold:hover {
  color: #c5a880 !important;
  transition: color 0.2s ease;
}
</style>