<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top py-3">
    <div class="container">
      <!-- الشعار / Logo -->
      <router-link to="/" class="navbar-brand fw-bold fs-3 text-dark d-flex align-items-center gap-2">
        <i class="bi bi-house-heart text-gold"></i>
        Furni<span class="text-gold">style</span>
      </router-link>

      <!-- زر القائمة للأجهزة الصغيرة -->
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

      <!-- روابط التنقل -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto gap-1 gap-lg-3 fw-semibold my-3 my-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link px-3" active-class="active-link" exact>
              Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/shop" class="nav-link px-3" active-class="active-link">
              Shop
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/favorites" class="nav-link px-3 position-relative d-inline-flex align-items-center gap-1" active-class="active-link">
              <i class="bi bi-heart me-1"></i> Favorites
              <span v-if="shopStore.favorites?.length" class="badge rounded-pill bg-danger ms-1" style="font-size: 11px;">
                {{ shopStore.favorites.length }}
              </span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/cart" class="nav-link px-3 position-relative d-inline-flex align-items-center gap-1" active-class="active-link">
              <i class="bi bi-bag me-1"></i> Cart
              <span v-if="shopStore.cartCount" class="badge rounded-pill bg-dark ms-1" style="font-size: 11px;">
                {{ shopStore.cartCount }}
              </span>
            </router-link>
          </li>
        </ul>

        <!-- قسم المستخدم (Login / Account Menu) -->
        <div class="d-flex align-items-center gap-2">
          <template v-if="!shopStore.currentUser">
            <router-link to="/auth" class="btn btn-outline-dark rounded-pill px-4 fw-semibold btn-sm">
              <i class="bi bi-box-arrow-in-right me-1"></i> Login / Register
            </router-link>
          </template>
          <template v-else>
            <div class="dropdown">
              <button class="btn btn-dark btn-sm rounded-pill px-3 py-2 dropdown-toggle d-flex align-items-center gap-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useShopStore } from '@/stores/shopStore'
import { useRouter } from 'vue-router'

const shopStore = useShopStore()
const router = useRouter()

function handleLogout() {
  if (typeof shopStore.logout === 'function') {
    shopStore.logout()
  } else {
    shopStore.currentUser = null
  }
  router.push('/auth')
}
</script>

<style scoped>
.text-gold {
  color: #c5a880;
}

.nav-link {
  color: #2c2724;
  transition: color 0.2s ease, background-color 0.2s ease;
  border-radius: 20px;
}

.nav-link:hover {
  color: #c5a880;
}

.active-link {
  color: #c5a880 !important;
  font-weight: 700;
}

.dropdown-item {
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background-color: #fdfbf7;
}
</style>