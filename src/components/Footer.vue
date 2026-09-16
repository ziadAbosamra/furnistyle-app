<template>
  <footer class="bg-dark text-light pt-5 pb-4 mt-auto border-top border-secondary">
    <div class="container">
      <div class="row g-4 justify-content-between">
        
        <!-- Logo & About -->
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

        <!-- Quick Links -->
        <div class="col-lg-2 col-md-6">
          <h5 class="fw-bold mb-3 text-white">Quick Links</h5>
          <ul class="list-unstyled d-flex flex-column gap-2">
            <li><router-link to="/home" class="text-secondary text-decoration-none hover-link">Home</router-link></li>
            <li><router-link to="/shop" class="text-secondary text-decoration-none hover-link">Shop</router-link></li>
            <li><router-link to="/favorites" class="text-secondary text-decoration-none hover-link">Favorites</router-link></li>
            <li><router-link to="/cart" class="text-secondary text-decoration-none hover-link">Cart</router-link></li>
          </ul>
        </div>

        <!-- Newsletter Subscription -->
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

      <!-- Copyright & Back to Top -->
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
        <p class="text-secondary small mb-0">&copy; 2026 FurniStyle. All rights reserved.</p>
        
        <!-- زرار العودة للأعلى (الاحترافي والواضح جداً) -->
        <button @click="scrollToTop" class="btn btn-outline-light btn-sm rounded-pill px-4 py-2 d-flex align-items-center gap-2 shadow-sm fw-semibold">
          <i class="bi bi-arrow-up"></i> Back to Top
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup>
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style scoped>
.hover-link:hover {
  color: #c5a880 !important;
  transition: color 0.2s ease;
}
.hover-gold:hover {
  color: #c5a880 !important;
  transition: color 0.2s ease;
}
</style>