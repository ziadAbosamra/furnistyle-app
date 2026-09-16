<template>
  <div class="home-page min-vh-100 d-flex flex-column">
    <!-- Hero Section / الواجهة الترحيبية -->
    <header class="hero-section text-center py-5 mb-5 position-relative overflow-hidden">
      <div class="container-fluid py-5 px-4 position-relative z-index-2">
        <div class="row justify-content-center">
          <div class="col-lg-8 py-5">
            <span class="badge px-3 py-2 rounded-pill mb-3 fw-normal" style="background-color: var(--accent-warm); color: #fff;">New Modern Collection</span>
            <h1 class="display-3 fw-bold mb-4 tracking-tight" style="color: var(--text-main);">Transform Your Space Into a Masterpiece</h1>
            <p class="lead mb-5 mx-auto" style="color: var(--text-muted); max-width: 700px;">
              Discover handcrafted, elegant, and comfortable furniture pieces designed to elevate your living experience with unmatched style.
            </p>
            <div class="d-flex justify-content-center gap-3">
              <router-link to="/shop" class="btn btn-primary btn-lg px-5 rounded-pill shadow-sm text-white fw-semibold">Shop Now</router-link>
              <a href="#featured" class="btn btn-outline-dark btn-lg px-4 rounded-pill fw-semibold">Explore More</a>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Featured Products / منتجات مميزة سريعة في الرئيسية -->
    <section id="featured" class="container-fluid px-4 mb-5 flex-grow-1">
      <div class="text-center mb-5">
        <h2 class="fw-bold display-6 mb-2" style="color: var(--text-main);">Featured Highlights</h2>
        <p style="color: var(--text-muted);">A glimpse of our finest masterclasses for your home</p>
      </div>
      
      <div class="row g-4 px-lg-3">
        <div class="col-xl-4 col-md-6" v-for="product in featuredProducts" :key="product.id">
          <div class="card h-100 shadow-sm rounded-4 overflow-hidden product-card border-0 bg-white">
            <router-link :to="`/product/${product.id}`" class="position-relative overflow-hidden bg-white d-block text-decoration-none" style="height: 280px;">
              <img :src="product.image" :alt="product.name" class="w-100 h-100 object-fit-cover product-img">
              <span class="badge bg-dark position-absolute top-0 end-0 m-3 px-3 py-2 rounded-pill shadow-sm">Highlight</span>
            </router-link>
            
            <div class="card-body d-flex flex-column p-4">
              <router-link :to="`/product/${product.id}`" class="text-decoration-none">
                <h5 class="card-title fw-bold mb-2 text-dark">{{ product.name }}</h5>
              </router-link>
              <p class="card-text small mb-4 text-muted">{{ product.description }}</p>
              
              <div class="d-flex justify-content-between align-items-center mt-auto pt-3 border-top border-creamy">
                <div>
                  <span class="small d-block text-muted">Price</span>
                  <span class="fw-bold fs-4" style="color: var(--accent-warm);">${{ product.price }}</span>
                </div>
                
                <div class="d-flex gap-2">
                  <router-link :to="`/product/${product.id}`" class="btn btn-outline-dark rounded-pill px-3 py-2 fw-semibold btn-sm">
                    Details
                  </router-link>
                  <button class="btn btn-primary rounded-pill px-3 py-2 fw-semibold shadow-sm text-white add-btn btn-sm" @click="addToCart(product)">
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="text-center py-4 border-top border-creamy mt-auto px-4 bg-white">
      <div class="container-fluid d-flex flex-column flex-md-row justify-content-between align-items-center">
        <p class="small mb-2 mb-md-0" style="color: var(--text-muted);">&copy; 2026 FurniStyle. All rights reserved.</p>
        <div class="d-flex gap-3 small">
          <router-link to="/" class="text-decoration-none" style="color: var(--text-muted);">Privacy Policy</router-link>
          <router-link to="/" class="text-decoration-none" style="color: var(--text-muted);">Terms of Service</router-link>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { useShopStore } from '@/stores/shopStore'

export default {
  name: 'HomeView',
  data() {
    return {
      featuredProducts: [
        { 
          id: 1, 
          name: 'Minimalist Modern Sofa', 
          description: 'Comfortable 3-seater sofa with premium durable fabric and ergonomic support.', 
          price: 499, 
          image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
          colors: ['#2c3e50', '#8e44ad', '#27ae60']
        },
        { 
          id: 2, 
          name: 'Scandinavian Wooden Dining Table', 
          description: 'Solid oak wood table designed elegantly for warm family gatherings.', 
          price: 350, 
          image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80',
          colors: ['#d35400', '#7f8c8d', '#2c3e50']
        },
        { 
          id: 3, 
          name: 'Ergonomic Executive Office Chair', 
          description: 'Sleek professional chair built for maximum comfort during long work sessions.', 
          price: 150, 
          image: 'https://images.unsplash.com/photo-1580481077494-e3299acae5d2?auto=format&fit=crop&w=800&q=80',
          colors: ['#16a085', '#2c3e50', '#c0392b']
        }
      ]
    }
  },
  setup() {
    const shopStore = useShopStore()
    return { shopStore }
  },
  methods: {
    addToCart(product) {
      this.shopStore.addToCart({
        ...product,
        selectedColor: product.colors ? product.colors[0] : '#2c3e50',
        quantity: 1
      })
      alert(`Added ${product.name} to your cart successfully!`)
    }
  }
}
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #f5f0eb 0%, #eae5d9 100%);
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
}
.product-card {
  transition: all 0.3s ease-in-out;
}
.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 1rem 2rem rgba(44, 39, 36, 0.08) !important;
}
.product-img {
  transition: transform 0.5s ease;
}
.product-card:hover .product-img {
  transform: scale(1.05);
}
</style>