<template>
  <div class="container py-5">
    <!-- Loading State -->
    <div v-if="shopStore.productsLoading" class="text-center py-5">
      <div class="spinner-border text-dark" role="status"></div>
      <p class="mt-3 text-muted">Loading product details…</p>
    </div>

    <!-- Product Not Found -->
    <div v-else-if="!product" class="text-center py-5 rounded-4 bg-white shadow-sm border p-5">
      <i class="bi bi-emoji-frown text-muted" style="font-size: 3.5rem;"></i>
      <h4 class="mt-3 fw-bold text-dark">We couldn't find that product</h4>
      <p class="text-muted">It may have been removed or the link is incorrect.</p>
      <router-link to="/shop" class="btn btn-dark rounded-pill px-4 mt-2 fw-bold">
        Back to Shop
      </router-link>
    </div>

    <!-- Product Details Content -->
    <div v-else class="row g-5 align-items-start">
      <!-- Image Gallery -->
      <div class="col-lg-6">
        <div class="card border-0 rounded-4 overflow-hidden shadow-sm p-3 bg-white">
          
          <!-- Image Box with Fade Animation -->
          <div class="main-img-box rounded-4 overflow-hidden position-relative">
            <transition name="img-fade" mode="out-in">
              <img
                :key="selectedVariant?.image || 'default'"
                :src="selectedVariant?.image || defaultImage(product)"
                :alt="`${product.name} — ${selectedVariant?.colorName || ''}`"
                class="img-fluid rounded-4 object-fit-cover w-100 main-image shadow-sm"
              />
            </transition>
          </div>

          <!-- Image Thumbnails -->
          <div v-if="product.variants?.length" class="d-flex gap-3 mt-3 justify-content-center flex-wrap">
            <button
              v-for="variant in product.variants"
              :key="variant.hex + variant.colorName"
              @click="selectedVariant = variant"
              class="thumb-btn p-0 border-0 bg-transparent"
              :aria-label="`View ${variant.colorName}`"
            >
              <img
                :src="variant.image"
                class="rounded-3"
                :class="selectedVariant?.hex === variant.hex ? 'thumb-active' : 'thumb-inactive'"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- Product Information -->
      <div class="col-lg-6">
        <span class="badge mb-2 px-3 py-2 text-uppercase bg-light text-secondary border rounded-pill">
          {{ categoryLabel }}
        </span>
        <h1 class="fw-bold mb-3 display-6 text-dark">{{ product.name }}</h1>
        <h3 class="fw-bold mb-4" style="color: #c5a880;">${{ product.price }}</h3>
        <p class="fs-6 mb-4 text-secondary leading-relaxed">{{ product.description }}</p>

        <!-- Color Swatches -->
        <div v-if="product.variants?.length" class="mb-4">
          <label class="form-label fw-semibold d-block text-dark mb-2">
            Color / Style: <span class="fw-bold text-dark">{{ selectedVariant?.colorName || 'Default' }}</span>
          </label>
          <div class="d-flex gap-3 flex-wrap align-items-center">
            <button
              v-for="variant in product.variants"
              :key="variant.hex + variant.colorName"
              @click="selectedVariant = variant"
              class="swatch-btn rounded-circle"
              :class="selectedVariant?.hex === variant.hex ? 'swatch-active' : 'swatch-inactive'"
              :style="{ backgroundColor: variant.hex }"
              :title="variant.colorName"
              :aria-label="`Select ${variant.colorName}`"
            ></button>
          </div>
        </div>

        <!-- Quantity & Action Buttons -->
        <div class="d-flex flex-wrap gap-3 align-items-center mb-4">
          <div class="input-group rounded-pill overflow-hidden border shadow-sm" style="width: 130px;">
            <button @click="quantity > 1 ? quantity-- : null" class="btn btn-light px-3 border-0">-</button>
            <span class="form-control text-center fw-bold bg-white border-0 py-2">{{ quantity }}</span>
            <button @click="quantity++" class="btn btn-light px-3 border-0">+</button>
          </div>

          <button @click="addToCart" class="btn btn-dark btn-lg flex-grow-1 rounded-pill fw-bold shadow-sm main-action-btn">
            <i class="bi bi-cart-plus me-2"></i> Add to Cart
          </button>

          <button @click="toggleFavorite" class="btn btn-outline-danger btn-lg rounded-circle p-0 fav-btn" title="Toggle Favorite">
            <i :class="isFavorite ? 'bi bi-heart-fill text-danger' : 'bi bi-heart'"></i>
          </button>
        </div>

        <!-- Notification Alert -->
        <transition name="fade">
          <div v-if="justAdded" class="alert alert-success border-0 shadow-sm rounded-4 py-3 mb-0 d-flex align-items-center gap-2">
            <i class="bi bi-check-circle-fill fs-5"></i>
            <div>
              Added <strong>{{ quantity }}</strong> × <strong>{{ product.name }}</strong>
              {{ selectedVariant?.colorName ? `(${selectedVariant.colorName})` : '' }} to your cart.
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useShopStore } from '@/stores/shopStore'
import { categories, defaultImage } from '@/data/products'

const route = useRoute()
const shopStore = useShopStore()

const quantity = ref(1)
const selectedVariant = ref(null)
const justAdded = ref(false)

const product = computed(() => shopStore.getProductById(route.params.id))

const categoryLabel = computed(() => {
  const match = categories?.find((c) => c.id === product.value?.category)
  return match?.label ?? product.value?.category ?? 'Furniture'
})

const isFavorite = computed(() => (product.value ? shopStore.isFavorite(product.value.id) : false))

function resetForProduct() {
  quantity.value = 1
  justAdded.value = false
  if (product.value) {
    selectedVariant.value = product.value.variants?.[0] || {
      colorName: 'Standard',
      hex: '#000000',
      image: defaultImage(product.value)
    }
  } else {
    selectedVariant.value = null
  }
}

onMounted(async () => {
  await shopStore.loadCatalog()
  resetForProduct()
})

watch(
  () => product.value,
  (newVal) => {
    if (newVal) resetForProduct()
  },
  { immediate: true }
)

watch(
  () => route.params.id,
  () => {
    if (shopStore.products?.length) resetForProduct()
  }
)

function addToCart() {
  if (!product.value) return
  const variant = selectedVariant.value || {
    colorName: 'Standard',
    hex: '#000000',
    image: defaultImage(product.value)
  }
  shopStore.addToCart(product.value, variant, quantity.value)
  justAdded.value = true
  setTimeout(() => (justAdded.value = false), 3000)
}

function toggleFavorite() {
  if (product.value) shopStore.toggleFavorite(product.value)
}
</script>

<style scoped>
.main-img-box {
  min-height: 480px;
  background-color: #fcfbf9;
}

.main-image {
  max-height: 480px;
  height: 480px;
}

/* Image Switch Animation */
.img-fade-enter-active,
.img-fade-leave-active {
  transition: opacity 0.25s ease;
}

.img-fade-enter-from,
.img-fade-leave-to {
  opacity: 0;
}

.thumb-btn img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  cursor: pointer;
  transition: all 0.2s ease;
}

.thumb-active {
  border: 2px solid #2c2724;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transform: scale(1.05);
}

.thumb-inactive {
  border: 2px solid transparent;
  opacity: 0.5;
}

.thumb-inactive:hover {
  opacity: 1;
}

.swatch-btn {
  width: 38px;
  height: 38px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s ease;
}

.swatch-active {
  box-shadow: 0 0 0 2px #fff, 0 0 0 4px #2c2724;
  transform: scale(1.1);
}

.swatch-inactive:hover {
  transform: scale(1.1);
}

.main-action-btn {
  background-color: #2c2724;
  border: none;
  transition: all 0.3s ease;
}

.main-action-btn:hover {
  background-color: #c5a880;
  transform: translateY(-2px);
}

.fav-btn {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 575.98px) {
  .main-image, .main-img-box {
    height: 320px;
    min-height: 320px;
  }
}
</style>