<template>
  <div class="product-view min-vh-100 py-5 bg-light">
    <div class="container py-4" v-if="product">
      <nav class="mb-4">
        <router-link to="/shop" class="text-decoration-none text-muted fw-semibold">
          <i class="bi bi-arrow-left me-2"></i> Back to Shop
        </router-link>
      </nav>

      <div class="row g-5 align-items-center bg-white p-4 p-lg-5 rounded-4 shadow-sm">
        <!-- الصورة: نفس صورة المنتج دايمًا، وبتتلوّن بـ CSS حسب اللون المختار -->
        <div class="col-lg-6">
          <div class="mb-3 rounded-4 overflow-hidden shadow-sm bg-light position-relative" style="height: 380px;">
            <img :src="product.image" :alt="product.name" class="w-100 h-100 object-fit-cover recolor-base">
            <div class="recolor-tint" :style="{ backgroundColor: selectedColorHex }"></div>
          </div>
        </div>

        <div class="col-lg-6">
          <span class="badge px-3 py-2 rounded-pill mb-3" style="background-color: #c5a880; color: #fff;">
            {{ product.category || 'Luxury Furniture' }}
          </span>
          <h1 class="fw-bold display-5 mb-3 text-dark">{{ product.name }}</h1>
          <h3 class="fw-bold fs-2 mb-4" style="color: #c5a880;">${{ product.price }}</h3>
          <p class="text-muted lh-base mb-4">{{ product.description }}</p>

          <div class="mb-4" v-if="product.colors && product.colors.length">
            <label class="fw-bold text-dark d-block mb-2">
              Select Color: <span class="text-muted fw-normal">({{ selectedColorName }})</span>
            </label>
            <div class="d-flex gap-2">
              <div
                v-for="color in product.colors"
                :key="color.name"
                class="rounded-circle cursor-pointer border border-2"
                :style="{
                  backgroundColor: color.hex,
                  width: '35px',
                  height: '35px',
                  borderColor: selectedColorName === color.name ? '#2c2724' : '#ddd',
                  transform: selectedColorName === color.name ? 'scale(1.15)' : 'scale(1)',
                  transition: 'transform 0.2s, border-color 0.2s'
                }"
                @click="changeColor(color)"
                :title="color.name">
              </div>
            </div>
          </div>

          <div class="mb-4 d-flex align-items-center gap-3">
            <label class="fw-bold text-dark">Quantity:</label>
            <div class="input-group" style="width: 130px;">
              <button class="btn btn-outline-secondary" @click="quantity > 1 ? quantity-- : null">-</button>
              <input type="text" class="form-control text-center fw-bold" v-model="quantity" readonly>
              <button class="btn btn-outline-secondary" @click="quantity++">+</button>
            </div>
          </div>

          <div class="d-flex gap-3">
            <button class="btn btn-lg btn-primary rounded-pill px-5 fw-semibold text-white shadow-sm flex-grow-1"
                    style="background-color: #2c2724; border-color: #2c2724;"
                    @click="addToCart">
              <i class="bi bi-bag-plus me-2"></i> Add to Cart
            </button>
            <button class="btn btn-lg btn-outline-dark rounded-circle p-3 shadow-sm d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;" @click="shopStore.toggleFavorite(product)">
              <i class="bi fs-5" :class="shopStore.isInWishlist(product.id) ? 'bi-heart-fill text-danger' : 'bi-heart'"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

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
      selectedColorName: '',
      selectedColorHex: ''
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
        if (newVal && newVal.colors && newVal.colors.length > 0) {
          this.selectedColorName = newVal.colors[0].name
          this.selectedColorHex = newVal.colors[0].hex
        }
      }
    }
  },
  methods: {
    changeColor(color) {
      this.selectedColorName = color.name
      this.selectedColorHex = color.hex
    },
    addToCart() {
      if (this.product) {
        this.shopStore.addToCart({
          ...this.product,
          selectedColor: this.selectedColorName,
          quantity: this.quantity
        })
        alert(`Successfully added ${this.quantity} item(s) in (${this.selectedColorName}) to your cart!`)
      }
    }
  }
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.recolor-base {
  filter: grayscale(70%) brightness(1.05);
}
.recolor-tint {
  position: absolute;
  inset: 0;
  mix-blend-mode: multiply;
  opacity: 0.55;
  pointer-events: none;
  transition: background-color 0.2s ease;
}
</style>