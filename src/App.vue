<template>
  <div id="app">
    <!-- Main Navigation Bar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top px-3 px-md-4 py-3 border-bottom border-creamy">
      <div class="container-fluid">
        <!-- Brand Logo -->
        <router-link class="navbar-brand fw-bold text-main fs-3 text-decoration-none d-flex align-items-center gap-2" to="/">
          <i class="bi bi-house-heart" style="color: var(--accent-warm);"></i>
          Furni<span style="color: var(--accent-warm);">Style</span>
        </router-link>

        <!-- Responsive Mobile Toggler -->
        <button
          class="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#globalNavbar"
          aria-controls="globalNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navbar Navigation Links -->
        <div class="collapse navbar-collapse" id="globalNavbar">
          <div class="d-flex align-items-center flex-wrap gap-2 ms-auto mt-3 mt-lg-0">
            <router-link to="/" class="btn btn-outline-dark btn-sm rounded-pill px-3 fw-semibold" active-class="nav-active" exact>
              Home
            </router-link>
            
            <router-link to="/shop" class="btn btn-outline-dark btn-sm rounded-pill px-3 fw-semibold" active-class="nav-active">
              Shop
            </router-link>

            <router-link to="/favorites" class="btn btn-outline-danger btn-sm rounded-pill px-3 position-relative">
              <i class="bi bi-heart me-1"></i> Favorites
              <span v-if="shopStore.favorites?.length" class="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle" style="font-size: 0.65rem;">
                {{ shopStore.favorites.length }}
              </span>
            </router-link>

            <router-link
              to="/cart"
              class="btn btn-primary btn-sm rounded-pill px-4 text-white fw-semibold shadow-sm position-relative me-lg-2"
              style="background-color: var(--accent-warm); border: none;"
            >
              <i class="bi bi-cart3 me-1"></i> Cart
              <span v-if="shopStore.cartCount" class="badge rounded-pill bg-dark position-absolute top-0 start-100 translate-middle" style="font-size: 0.65rem;">
                {{ shopStore.cartCount }}
              </span>
            </router-link>

            <!-- User Auth / Account Section -->
            <template v-if="!shopStore.currentUser">
              <router-link to="/auth" class="btn btn-outline-dark btn-sm rounded-pill px-3 fw-semibold ms-lg-1">
                <i class="bi bi-box-arrow-in-right me-1"></i> Login
              </router-link>
            </template>
            <template v-else>
              <div class="dropdown ms-lg-1">
                <button 
                  class="btn btn-dark btn-sm rounded-pill px-3 py-1 dropdown-toggle d-flex align-items-center gap-2" 
                  type="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  <i class="bi bi-person-circle"></i>
                  <span>{{ shopStore.currentUser.name || 'Account' }}</span>
                </button>
                <ul class="dropdown-menu dropdown-menu-end shadow border-0 rounded-3 mt-2">
                  <li>
                    <router-link to="/profile" class="dropdown-item py-2">
                      <i class="bi bi-person me-2 text-muted"></i> Profile
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/settings" class="dropdown-item py-2">
                      <i class="bi bi-gear me-2 text-muted"></i> Settings
                    </router-link>
                  </li>
                  <li><hr class="dropdown-divider"></li>
                  <li>
                    <button class="dropdown-item text-danger py-2 d-flex align-items-center gap-2" @click="handleLogout">
                      <i class="bi bi-box-arrow-right"></i> Logout
                    </button>
                  </li>
                </ul>
              </div>
            </template>

            <!-- Settings Gear Icon -->
            <router-link 
              to="/settings" 
              class="btn btn-light btn-sm rounded-circle shadow-sm d-flex align-items-center justify-content-center border"
              style="width: 34px; height: 34px;"
              title="Settings"
              active-class="bg-dark text-white border-dark"
            >
              <i class="bi bi-gear-fill"></i>
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main View Content -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="text-center py-4 border-top border-creamy mt-auto px-4 bg-white">
      <div class="container-fluid d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
        <p class="small mb-0" style="color: var(--text-muted);">&copy; 2026 FurniStyle. All rights reserved.</p>
        
        <div class="d-flex align-items-center gap-3 small">
          <router-link to="/settings" class="text-decoration-none" style="color: var(--text-muted);">Settings</router-link>
          <a href="#" class="text-decoration-none" style="color: var(--text-muted);">Privacy Policy</a>
          <a href="#" class="text-decoration-none" style="color: var(--text-muted);">Terms of Service</a>
          
          <button 
            @click="scrollToTop" 
            class="btn btn-outline-secondary btn-sm rounded-pill px-3 py-1 d-flex align-items-center gap-1 border-0 ms-md-2"
            style="font-size: 0.8rem;"
          >
            <i class="bi bi-arrow-up"></i> Top
          </button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useShopStore } from '@/stores/shopStore'

const shopStore = useShopStore()
const router = useRouter()

const handleLogout = () => {
  if (typeof shopStore.logout === 'function') {
    shopStore.logout()
  } else {
    shopStore.currentUser = null
  }
  router.push('/auth')
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  // Initialize dark mode theme if saved in settings
  const savedSettings = localStorage.getItem('furni_settings')
  if (savedSettings) {
    try {
      const parsed = JSON.parse(savedSettings)
      if (parsed.darkMode) {
        document.body.classList.add('dark-mode-theme')
      }
    } catch (e) {
      console.error('Failed to parse settings from localStorage:', e)
    }
  }
})
</script>

<style>
:root {
  --accent-warm: #c5a880;
  --accent-warm-dark: #2c2724;
  --text-main: #2c2724;
  --text-muted: #7c746e;
  --bg-cream: #fdfbf7;
  --border-creamy: #eae5d9;
}

html, body {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  background-color: var(--bg-cream);
  color: var(--text-main);
  transition: background-color 0.3s ease, color 0.3s ease;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1 0 auto;
}

.border-creamy {
  border-color: var(--border-creamy) !important;
}

.btn-primary {
  background-color: var(--accent-warm) !important;
  border-color: var(--accent-warm) !important;
}
.btn-primary:hover {
  background-color: var(--accent-warm-dark) !important;
  border-color: var(--accent-warm-dark) !important;
}

.nav-active {
  background-color: var(--text-main) !important;
  color: #fff !important;
  border-color: var(--text-main) !important;
}

.text-main { 
  color: var(--text-main); 
}

/* Global Dark Mode Override Styles */
body.dark-mode-theme {
  --bg-cream: #1c1a19;
  --text-main: #f5f0eb;
  --text-muted: #a39b94;
  --border-creamy: #332e2a;
  background-color: var(--bg-cream) !important;
  color: var(--text-main) !important;
}

body.dark-mode-theme .bg-white {
  background-color: #272320 !important;
  color: #f5f0eb !important;
}

body.dark-mode-theme .bg-light {
  background-color: #332e2a !important;
  color: #f5f0eb !important;
}

body.dark-mode-theme .text-dark {
  color: #f5f0eb !important;
}

body.dark-mode-theme .card {
  background-color: #272320 !important;
  color: #f5f0eb !important;
}

body.dark-mode-theme .dropdown-menu {
  background-color: #272320 !important;
  border-color: #332e2a !important;
}

body.dark-mode-theme .dropdown-item {
  color: #f5f0eb !important;
}

body.dark-mode-theme .dropdown-item:hover {
  background-color: #332e2a !important;
}

body.dark-mode-theme .border,
body.dark-mode-theme .border-bottom,
body.dark-mode-theme .border-top {
  border-color: #332e2a !important;
}
</style>