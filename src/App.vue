<template>
  <div class="app-wrapper min-vh-100 d-flex flex-column" style="background-color: #fdfbf7;">
    
    <!-- Creamy Warm Navbar -->
    <nav class="navbar navbar-expand-lg px-4 py-3" style="background-color: #f7f3eb; border-bottom: 1px solid #eae5d9;">
      <div class="container-fluid">
        <!-- Site Logo -->
        <router-link to="/" class="navbar-brand fw-bold fs-4 text-uppercase tracking-wider" style="color: #2c2724;">FurniStyle 🛋️</router-link>
        
        <!-- Navigation Links -->
        <div class="d-flex gap-3 align-items-center">
          <router-link to="/product/1" class="nav-link-custom">Product Details</router-link>
          <router-link to="/favorites" class="nav-link-custom">Favorites</router-link>
          <router-link to="/cart" class="btn btn-primary btn-sm rounded-pill px-3 fw-bold">
            <i class="bi bi-cart3 me-1"></i> Cart
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-grow-1 py-5">
      <div class="container-xl">
        <router-view />
      </div>
    </main>

    <!-- Footer -->
    <footer class="py-3 text-center border-top mt-auto" style="background-color: #f7f3eb; border-color: #eae5d9 !important; color: #7c746e;">
      <small>© 2026 FurniStyle. All Rights Reserved.</small>
    </footer>

  </div>
</template>

<script setup>
</script>

<style scoped>
.nav-link-custom {
  color: #59524c;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.2s ease;
}

.nav-link-custom:hover {
  color: #c5a880;
}
</style>