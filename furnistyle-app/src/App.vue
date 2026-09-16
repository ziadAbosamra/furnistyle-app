<template>
  <div id="app">
    <!-- Navbar موحدة ومتناسقة بالكامل -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top px-4 py-3 border-bottom border-creamy">
      <div class="container-fluid">
        <router-link class="navbar-brand fw-bold text-main fs-3 text-decoration-none" to="/">
          Furni<span style="color: var(--accent-warm);">Style</span>
        </router-link>
        
        <button 
          class="navbar-toggler border-0 shadow-none" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#globalNavbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="globalNavbar">
          <!-- كل الأزرار والروابط بنفس الاستايل المنسق جنب بعض -->
          <div class="d-flex align-items-center flex-wrap gap-2 ms-auto mt-3 mt-lg-0">
            <router-link to="/" class="btn btn-outline-dark btn-sm rounded-pill px-3 fw-semibold">
              Home
            </router-link>
            <router-link to="/shop" class="btn btn-outline-dark btn-sm rounded-pill px-3 fw-semibold">
              Shop
            </router-link>
            <router-link to="/product/1" class="btn btn-outline-dark btn-sm rounded-pill px-3">
              Product Details
            </router-link>
            <router-link to="/favorites" class="btn btn-outline-danger btn-sm rounded-pill px-3">
              <i class="bi bi-heart me-1"></i> Favorites
            </router-link>
            <router-link to="/cart" class="btn btn-primary btn-sm rounded-pill px-4 text-white fw-semibold shadow-sm" style="background-color: var(--accent-warm); border: none;">
              <i class="bi bi-cart3 me-1"></i> Cart
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- عرض الصفحات -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html, body {
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow-x: hidden !important;
  background-color: #fcfbf9;
}

#app {
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
}
</style>