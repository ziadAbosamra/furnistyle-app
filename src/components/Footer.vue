<template>
  <footer class="footer-section text-light pt-5 pb-4 mt-auto border-top border-secondary" style="background-color: #221e1c;">
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
            <a href="#" aria-label="Facebook" class="text-light text-decoration-none hover-gold"><i class="bi bi-facebook"></i></a>
            <a href="#" aria-label="Instagram" class="text-light text-decoration-none hover-gold"><i class="bi bi-instagram"></i></a>
            <a href="#" aria-label="Twitter" class="text-light text-decoration-none hover-gold"><i class="bi bi-twitter-x"></i></a>
            <a href="#" aria-label="Pinterest" class="text-light text-decoration-none hover-gold"><i class="bi bi-pinterest"></i></a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="col-lg-2 col-md-6">
          <h5 class="fw-bold mb-3 text-white fs-6 text-uppercase tracking-wider">Quick Links</h5>
          <ul class="list-unstyled d-flex flex-column gap-2 mb-0">
            <li><router-link to="/" class="text-secondary text-decoration-none hover-link">Home</router-link></li>
            <li><router-link to="/shop" class="text-secondary text-decoration-none hover-link">Shop</router-link></li>
            <li><router-link to="/favorites" class="text-secondary text-decoration-none hover-link">Favorites</router-link></li>
            <li><router-link to="/cart" class="text-secondary text-decoration-none hover-link">Cart</router-link></li>
            <li><router-link to="/settings" class="text-secondary text-decoration-none hover-link">Settings</router-link></li>
          </ul>
        </div>

        <!-- Newsletter Subscription -->
        <div class="col-lg-4 col-md-6">
          <h5 class="fw-bold mb-3 text-white fs-6 text-uppercase tracking-wider">Stay Updated</h5>
          <p class="text-secondary small">Subscribe to our newsletter for exclusive offers and new arrivals.</p>
          
          <form @submit.prevent="handleSubscribe">
            <div class="input-group mb-2">
              <input 
                type="email" 
                v-model="email" 
                required
                class="form-control bg-dark text-light border-secondary shadow-none px-3" 
                placeholder="Enter your email"
                aria-label="Email address"
              >
              <button class="btn text-white fw-semibold px-4 subscribe-btn" type="submit">
                Join
              </button>
            </div>
          </form>

          <transition name="fade">
            <div v-if="subscribed" class="text-success small d-flex align-items-center gap-1 mt-2">
              <i class="bi bi-check-circle-fill"></i> Thank you for subscribing!
            </div>
          </transition>
        </div>

      </div>

      <hr class="border-secondary my-4 opacity-25">

      <!-- Copyright & Back to Top -->
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
        <p class="text-secondary small mb-0">&copy; 2026 FurniStyle. All rights reserved.</p>
        
        <!-- Back to Top Button -->
        <button 
          @click="scrollToTop" 
          class="btn btn-outline-light btn-sm rounded-pill px-4 py-2 d-flex align-items-center gap-2 shadow-sm fw-semibold back-to-top-btn"
          aria-label="Scroll back to top"
        >
          <i class="bi bi-arrow-up"></i> Back to Top
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const subscribed = ref(false)

const handleSubscribe = () => {
  if (email.value.trim()) {
    subscribed.value = true
    email.value = ''
    setTimeout(() => {
      subscribed.value = false
    }, 4000)
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style scoped>
.hover-link {
  transition: color 0.2s ease, transform 0.2s ease;
  display: inline-block;
}

.hover-link:hover {
  color: #c5a880 !important;
  transform: translateX(3px);
}

.hover-gold:hover {
  color: #c5a880 !important;
  transition: color 0.2s ease;
}

.subscribe-btn {
  background-color: #c5a880;
  border-color: #c5a880;
  transition: background-color 0.2s ease;
}

.subscribe-btn:hover {
  background-color: #b09168;
  border-color: #b09168;
}

.back-to-top-btn {
  transition: all 0.2s ease;
}

.back-to-top-btn:hover {
  background-color: #c5a880;
  border-color: #c5a880;
  color: #fff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>