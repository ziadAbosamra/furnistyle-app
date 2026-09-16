<template>
  <div class="shop-page min-vh-100 d-flex flex-column bg-light py-5">
    <div class="container px-4 flex-grow-1">
      <!-- عنوان المتجر -->
      <div class="text-center mb-5">
        <span class="badge px-3 py-2 rounded-pill mb-3 fw-normal" style="background-color: var(--accent-warm); color: #fff;">Full Catalog</span>
        <h1 class="fw-bold display-5 mb-2" style="color: var(--text-main);">All FurniStyle Categories</h1>
        <p style="color: var(--text-muted);">Explore our extensive inventory featuring unique lighting, bedroom sets, and decor items.</p>
      </div>

      <!-- شبكة المنتجات المختلفة -->
      <div class="row g-4">
        <div class="col-xl-4 col-md-6" v-for="product in shopProducts" :key="product.id">
          <div class="card h-100 shadow-sm rounded-4 overflow-hidden product-card border-0 bg-white">
            <router-link :to="`/product/${product.id}`" class="position-relative overflow-hidden bg-white d-block text-decoration-none" style="height: 280px;">
              <img :src="product.image" :alt="product.name" class="w-100 h-100 object-fit-cover product-img">
              <span class="badge bg-secondary position-absolute top-0 end-0 m-3 px-3 py-2 rounded-pill shadow-sm">In Store</span>
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
    </div>
  </div>
</template>

<script>
import { useShopStore } from '@/stores/shopStore'

export default {
  name: 'ShopView',
  data() {
    return {
      // منتجات مختلفة تماماً عن الصفحة الرئيسية
      shopProducts: [
        { 
          id: 101, 
          name: 'Luxury Velvet Accent Chair', 
          description: 'Deep cushioning and smooth velvet fabric designed to make a bold statement in any room.', 
          price: 280, 
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
          colors: ['#e74c3c', '#8e44ad', '#34495e']
        },
        { 
          id: 102, 
          name: 'Industrial Bookshelf & Display', 
          description: 'Combination of robust metal frames and rustic wood shelves for spacious storage.', 
          price: 210, 
          image: 'https://images.unsplash.com/photo-1594623930572-307a30006395?auto=format&fit=crop&w=800&q=80',
          colors: ['#2c3e50', '#d35400']
        },
        { 
          id: 103, 
          name: 'Nordic Pendant Ceiling Light', 
          description: 'Warm ambient hanging light fixture that brings a cozy modern atmosphere to dining areas.', 
          price: 95, 
          image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
          colors: ['#f1c40f', '#bdc3c7', '#2c3e50']
        },
        { 
          id: 104, 
          name: 'Upholstered Queen Bed Frame', 
          description: 'Sturdy platform bed upholstered in soft neutral linen with a tufted headboard.', 
          price: 650, 
          image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
          colors: ['#7f8c8d', '#ecf0f1', '#34495e']
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