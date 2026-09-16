<template>
  <div class="product-view min-vh-100 py-5 bg-light">
    <div class="container py-4" v-if="product">
      <!-- زر الرجوع -->
      <nav class="mb-4">
        <router-link to="/shop" class="text-decoration-none text-muted fw-semibold">
          <i class="bi bi-arrow-left me-2"></i> Back to Shop
        </router-link>
      </nav>

      <div class="row g-5 align-items-center bg-white p-4 p-lg-5 rounded-4 shadow-sm">
        <!-- معرض الصور -->
        <div class="col-lg-6">
          <div class="mb-3 rounded-4 overflow-hidden shadow-sm" style="height: 380px;">
            <img :src="activeImage" :alt="product.name" class="w-100 h-100 object-fit-cover">
          </div>
          <div class="d-flex gap-3" v-if="product.images">
            <div v-for="(img, idx) in product.images" :key="idx" 
                 class="rounded-3 overflow-hidden border cursor-pointer" 
                 style="width: 75px; height: 75px;"
                 @click="activeImage = img">
              <img :src="img" class="w-100 h-100 object-fit-cover">
            </div>
          </div>
        </div>

        <!-- تفاصيل المنتج والخيارات -->
        <div class="col-lg-6">
          <span class="badge px-3 py-2 rounded-pill mb-3" style="background-color: #c5a880; color: #fff;">{{ product.category || 'Luxury Furniture' }}</span>
          <h1 class="fw-bold display-5 mb-3 text-dark">{{ product.name }}</h1>
          <h3 class="fw-bold fs-2 mb-4" style="color: #c5a880;">${{ product.price }}</h3>
          <p class="text-muted lh-base mb-4">{{ product.description }}</p>

          <!-- اختيار اللون -->
          <div class="mb-4" v-if="product.colors">
            <label class="fw-bold text-dark d-block mb-2">Select Color:</label>
            <div class="d-flex gap-2">
              <div v-for="color in product.colors" :key="color" 
                   class="rounded-circle cursor-pointer border border-2"
                   :style="{ backgroundColor: color, width: '32px', height: '32px', borderColor: selectedColor === color ? '#2c2724 !important' : 'transparent !important' }"
                   @click="selectedColor = color">
              </div>
            </div>
          </div>

          <!-- اختيار الكمية -->
          <div class="mb-4 d-flex align-items-center gap-3">
            <label class="fw-bold text-dark">Quantity:</label>
            <div class="input-group" style="width: 130px;">
              <button class="btn btn-outline-secondary" @click="quantity > 1 ? quantity-- : null">-</button>
              <input type="text" class="form-control text-center fw-bold" v-model="quantity" readonly>
              <button class="btn btn-outline-secondary" @click="quantity++">+</button>
            </div>
          </div>

          <!-- زر الإضافة للسلة -->
          <div class="d-flex gap-3">
            <button class="btn btn-lg btn-primary rounded-pill px-5 fw-semibold text-white shadow-sm flex-grow-1" 
                    style="background-color: #2c2724; border-color: #2c2724;" 
                    @click="addToCart">
              <i class="bi bi-bag-plus me-2"></i> Add to Cart
            </button>
            <button class="btn btn-lg btn-outline-dark rounded-circle p-3 shadow-sm" @click="shopStore.toggleWishlist(product)">
              <i class="bi" :class="shopStore.isInWishlist(product.id) ? 'bi-heart-fill text-danger' : 'bi-heart'"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- لو المنتج مش موجود -->
    <div class="container text-center py-5" v-else>
      <h2 class="fw-bold text-muted">Product not found.</h2>
      <router-link to="/shop" class="btn btn-dark rounded-pill px-4 mt-3">Back to Shop</router-link>
    </div>
  </div>
</template>

<script>
import { useShopStore } from '@/stores/shopStore'

export default {
  name: 'ProductView',
  data() {
    return {
      quantity: 1,
      selectedColor: '',
      activeImage: ''
    }
  },
  setup() {
    const shopStore = useShopStore()
    return { shopStore }
  },
  computed: {
    product() {
      const id = parseInt(this.$route.params.id)
      return this.shopStore.products.find(p => p.id === id)
    }
  },
  watch: {
    product: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.activeImage = newVal.image
          this.selectedColor = newVal.colors ? newVal.colors[0] : ''
        }
      }
    }
  },
  methods: {
    addToCart() {
      if (this.product) {
        this.shopStore.addToCart({
          ...this.product,
          selectedColor: this.selectedColor,
          quantity: this.quantity
        })
        alert(`Successfully added ${this.quantity} item(s) to your cart!`)
      }
    }
  }
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>