<template>
  <div class="container py-5 text-light">
    <div v-if="product" class="row g-5 align-items-center">
      <!-- Product Images -->
      <div class="col-lg-6">
        <div class="card border-0 rounded-4 overflow-hidden shadow-lg p-3" style="background: #181818;">
          <img :src="selectedImage" :alt="product.name" class="img-fluid rounded-4 object-fit-cover w-100" style="max-height: 500px;">
          <div class="d-flex gap-3 mt-3 justify-content-center">
            <img 
              v-for="(img, idx) in product.images" 
              :key="idx" 
              :src="img" 
              @click="selectedImage = img"
              class="rounded-3 cursor-pointer border"
              :class="selectedImage === img ? 'border-primary border-2' : 'border-secondary opacity-50'"
              style="width: 70px; height: 70px; object-fit: cover; cursor: pointer;"
            >
          </div>
        </div>
      </div>

      <!-- Product Info -->
      <div class="col-lg-6">
        <span class="badge bg-secondary mb-2 px-3 py-2 text-uppercase tracking-wider">{{ product.category }}</span>
        <h1 class="fw-bold mb-3 display-5">{{ product.name }}</h1>
        <h3 class="text-success fw-bold mb-4">${{ product.price }}</h3>
        <p class="text-secondary fs-5 mb-4">{{ product.description }}</p>

        <!-- Color Selection -->
        <div class="mb-4">
          <label class="form-label fw-semibold text-secondary d-block">Select Color</label>
          <div class="d-flex gap-3">
            <button 
              v-for="color in product.colors" 
              :key="color"
              @click="selectedColor = color"
              class="btn rounded-circle p-3 border-2"
              :class="selectedColor === color ? 'border-white' : 'border-transparent'"
              :style="{ backgroundColor: color }"
            ></button>
          </div>
        </div>

        <!-- Quantity & Add to Cart -->
        <div class="d-flex gap-3 align-items-center mb-4">
          <div class="input-group" style="width: 130px;">
            <button @click="quantity > 1 ? quantity-- : null" class="btn btn-outline-secondary text-light">-</button>
            <span class="form-control text-center bg-dark text-light border-secondary fw-bold">{{ quantity }}</span>
            <button @click="quantity++" class="btn btn-outline-secondary text-light">+</button>
          </div>

          <button @click="addToCart" class="btn btn-primary btn-lg flex-grow-1 rounded-3 fw-bold">
            <i class="bi bi-cart-plus me-2"></i> Add to Cart
          </button>
          <button @click="toggleFavorite" class="btn btn-outline-danger btn-lg rounded-3">
            <i :class="isFavorite ? 'bi bi-heart-fill' : 'bi bi-heart'"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useShopStore } from '@/stores/shopStore'

const route = useRoute()
const shopStore = useShopStore()

const product = ref({
  id: 1,
  name: 'Modern Soft Dark Chair',
  category: 'Living Room',
  price: 299,
  description: 'Crafted with premium materials for ultimate comfort and high-end modern aesthetics.',
  images: [
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600',
    'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600'
  ],
  colors: ['#2c3e50', '#8e44ad', '#27ae60']
})

const selectedImage = ref(product.value.images[0])
const selectedColor = ref(product.value.colors[0])
const quantity = ref(1)

const isFavorite = computed(() => shopStore.favorites.some(p => p.id === product.value.id))

const addToCart = () => {
  shopStore.addToCart({
    ...product.value,
    selectedColor: selectedColor.value,
    quantity: quantity.value
  })
}

const toggleFavorite = () => {
  shopStore.toggleFavorite(product.value)
}
</script>