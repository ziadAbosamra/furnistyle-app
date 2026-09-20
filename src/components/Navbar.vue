<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top py-3">
    <div class="container">
      <!-- شعار الموقع -->
      <router-link to="/" class="navbar-brand fw-bold fs-3 text-dark">
        Furni<span style="color: #c5a880;">style</span>
      </router-link>

      <!-- زر القائمة للأجهزة الصغيرة -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- روابط التنقل -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto gap-3 fw-semibold">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/shop" class="nav-link" active-class="active-link">Shop</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/favorites" class="nav-link position-relative" active-class="active-link">
              Favorites
              <span v-if="shopStore.wishlist.length > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style="font-size: 10px;">
                {{ shopStore.wishlist.length }}
              </span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/cart" class="nav-link position-relative" active-class="active-link">
              Cart
              <span v-if="shopStore.cart.length > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark" style="font-size: 10px;">
                {{ shopStore.cart.length }}
              </span>
            </router-link>
          </li>
        </ul>

        <!-- قسم المستخدم (Login / Logout) -->
        <div class="d-flex align-items-center gap-3">
          <template v-if="!shopStore.currentUser">
            <router-link to="/login" class="btn btn-outline-dark rounded-pill px-4 fw-semibold">
              Login
            </router-link>
          </template>
          <template v-else>
            <div class="dropdown">
              <button class="btn btn-dark rounded-pill px-4 dropdown-toggle" type="button" data-bs-toggle="dropdown">
                <i class="bi bi-person-circle me-1"></i> {{ shopStore.currentUser.name || 'Account' }}
              </button>
              <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0">
                <li><a class="dropdown-item text-danger" href="#" @click.prevent="shopStore.logout">Logout</a></li>
              </ul>
            </div>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useShopStore } from '@/stores/shopStore'

export default {
  name: 'Navbar',
  setup() {
    const shopStore = useShopStore()
    return { shopStore }
  }
}
</script>

<style scoped>
.nav-link {
  color: #555;
  transition: color 0.2s;
}
.nav-link:hover, .active-link {
  color: #c5a880 !important;
}
</style>