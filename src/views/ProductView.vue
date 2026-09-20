<template>
  <div class="product-view min-vh-100 py-5 bg-light">
    <div class="container py-4" v-if="product">
      <!-- Navigation Back Button -->
      <nav class="mb-4">
        <router-link to="/shop" class="text-decoration-none text-muted fw-semibold back-link">
          <i class="bi bi-arrow-left me-2"></i> Back to Shop
        </router-link>
      </nav>

      <div class="row g-5 align-items-start bg-white p-4 p-lg-5 rounded-4 shadow-sm">
        <!-- Product Image & Canvas Recolor Area -->
        <div class="col-lg-6">
          <div class="mb-3 rounded-4 overflow-hidden shadow-sm bg-light position-relative" style="height: 380px;">
            <img 
              v-if="!canvasReady" 
              :src="product.image || defaultImg" 
              :alt="product.name" 
              class="w-100 h-100 object-fit-cover"
            />
            <canvas 
              v-show="canvasReady" 
              ref="canvasEl" 
              class="w-100 h-100 object-fit-cover"
            ></canvas>
          </div>

          <div class="d-flex align-items-center gap-2 text-muted small px-1">
            <i class="bi bi-star-fill text-warning"></i>
            <span class="fw-semibold text-dark">{{ product.rating || 5.0 }}</span>
            <span>({{ product.reviewsCount || 12 }} reviews)</span>
            <span class="ms-auto fw-medium" :class="(product.stock ?? 10) > 5 ? 'text-success' : 'text-danger'">
              {{ (product.stock ?? 10) > 0 ? (product.stock ?? 10) + ' in stock' : 'Out of stock' }}
            </span>
          </div>
        </div>

        <!-- Product Details & Actions -->
        <div class="col-lg-6">
          <span class="badge px-3 py-2 rounded-pill mb-3" style="background-color: #c5a880; color: #fff;">
            {{ product.category || 'Luxury Furniture' }}
          </span>
          <h1 class="fw-bold display-6 mb-3 text-dark">{{ product.name }}</h1>
          <h3 class="fw-bold fs-2 mb-4" style="color: #c5a880;">${{ product.price }}</h3>
          <p class="text-muted lh-base mb-4">{{ product.description }}</p>

          <!-- Dynamic Color Selector -->
          <div class="mb-4" v-if="productColors.length">
            <label class="fw-bold text-dark d-block mb-2">
              Select Color: <span class="text-muted fw-normal">({{ selectedColorName }})</span>
            </label>
            <div class="d-flex gap-2 align-items-center">
              <button
                v-for="color in productColors"
                :key="color.name"
                type="button"
                class="rounded-circle border border-2 color-swatch-btn p-0"
                :style="{
                  backgroundColor: color.hex,
                  width: '36px',
                  height: '36px',
                  borderColor: selectedColorName === color.name ? '#2c2724' : '#ddd',
                  transform: selectedColorName === color.name ? 'scale(1.15)' : 'scale(1)',
                  boxShadow: selectedColorName === color.name ? '0 0 0 2px #fff, 0 0 0 4px #2c2724' : 'none'
                }"
                @click="changeColor(color)"
                :title="color.name"
                :aria-label="`Select color ${color.name}`"
              ></button>
            </div>
          </div>

          <!-- Quantity Selector -->
          <div class="mb-4 d-flex align-items-center gap-3">
            <label class="fw-bold text-dark">Quantity:</label>
            <div class="input-group rounded-pill overflow-hidden border" style="width: 130px;">
              <button class="btn btn-light px-3" @click="quantity > 1 ? quantity-- : null">-</button>
              <input type="text" class="form-control text-center fw-bold bg-white border-0 py-2" v-model="quantity" readonly />
              <button class="btn btn-light px-3" @click="quantity++">+</button>
            </div>
          </div>

          <!-- Add to Cart & Favorite Actions -->
          <div class="d-flex gap-3 mb-4">
            <button 
              class="btn btn-lg btn-dark rounded-pill px-5 fw-semibold text-white shadow-sm flex-grow-1 main-add-btn"
              :disabled="product.stock === 0"
              @click="addToCart"
            >
              <i class="bi bi-bag-plus me-2"></i>
              {{ product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }}
            </button>
            <button 
              class="btn btn-lg btn-outline-dark rounded-circle p-0 shadow-sm d-flex align-items-center justify-content-center fav-btn" 
              @click="shopStore.toggleFavorite(product)"
              title="Toggle Favorite"
            >
              <i class="bi fs-5" :class="shopStore.isFavorite(product.id) ? 'bi-heart-fill text-danger' : 'bi-heart'"></i>
            </button>
          </div>

          <!-- Added to Cart Alert -->
          <transition name="fade">
            <div v-if="justAdded" class="alert alert-success border-0 shadow-sm rounded-4 py-2 px-3 mb-4 d-flex align-items-center gap-2">
              <i class="bi bi-check-circle-fill fs-5"></i>
              <div>Added {{ quantity }} × <strong>{{ product.name }}</strong> ({{ selectedColorName }}) to your cart.</div>
            </div>
          </transition>

          <!-- Specifications Tabs -->
          <div class="border-top pt-4">
            <ul class="nav nav-tabs mb-3 border-bottom-0">
              <li class="nav-item" v-for="tab in tabs" :key="tab">
                <button 
                  class="nav-link border-0 fw-semibold px-3 py-2 me-2 rounded-2" 
                  :class="{ 'active-tab': activeTab === tab, 'text-muted': activeTab !== tab }" 
                  @click="activeTab = tab"
                >
                  {{ tab }}
                </button>
              </li>
            </ul>

            <div v-if="activeTab === 'Details'">
              <ul class="list-unstyled small text-muted mb-0 vstack gap-2">
                <li><strong class="text-dark">Material:</strong> {{ product.material || 'Solid Wood & Premium Fabric' }}</li>
                <li><strong class="text-dark">Dimensions:</strong> {{ product.dimensions || 'Standard Living Size' }}</li>
                <li><strong class="text-dark">Warranty:</strong> {{ product.warranty || '2 Years Limited Warranty' }}</li>
              </ul>
            </div>

            <div v-else-if="activeTab === 'Shipping'">
              <p class="small text-muted mb-2">Estimated delivery: 5–10 business days depending on your location.</p>
              <p class="small text-muted mb-0">Free shipping on orders over $300. Assembly instructions included.</p>
            </div>

            <div v-else-if="activeTab === 'Reviews'">
              <p class="small text-muted mb-0">
                {{ product.rating || 5.0 }} / 5 average rating based on {{ product.reviewsCount || 12 }} verified reviews.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Fallback if Product Not Found -->
    <div class="container text-center py-5" v-else>
      <i class="bi bi-emoji-frown text-muted" style="font-size: 3rem;"></i>
      <h2 class="fw-bold text-dark mt-3">Product not found</h2>
      <p class="text-muted">The item you are looking for might have been removed or renamed.</p>
      <router-link to="/shop" class="btn btn-dark rounded-pill px-4 mt-2 fw-semibold">Back to Shop</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useShopStore } from '@/stores/shopStore'
import { defaultImage } from '@/data/products'

const route = useRoute()
const shopStore = useShopStore()

const quantity = ref(1)
const selectedColorName = ref('')
const selectedColorHex = ref('')
const canvasReady = ref(false)
const activeTab = ref('Details')
const tabs = ['Details', 'Shipping', 'Reviews']
const justAdded = ref(false)

const canvasEl = ref(null)
let baseImg = null

const product = computed(() => {
  const id = parseInt(route.params.id)
  return shopStore.getProductById(id)
})

const defaultImg = computed(() => {
  return product.value ? defaultImage(product.value) : ''
})

const productColors = computed(() => {
  if (!product.value) return []
  if (product.value.colors) return product.value.colors
  if (product.value.variants) {
    return product.value.variants.map((v) => ({
      name: v.colorName,
      hex: v.hex,
      image: v.image
    }))
  }
  return []
})

// Color Conversion Helpers
function hexToHsl(hex) {
  if (!hex || hex.length < 7) return { h: 0, s: 0 }
  let r = parseInt(hex.slice(1, 3), 16) / 255
  let g = parseInt(hex.slice(3, 5), 16) / 255
  let b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }
  return { h, s }
}

function hslToRgb(h, s, l) {
  let r, g, b
  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

function loadAndPrepareImage(src) {
  if (!src) return
  canvasReady.value = false
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.onload = () => {
    baseImg = img
    canvasReady.value = true
    nextTick(() => applyRecolor())
  }
  img.onerror = () => {
    canvasReady.value = false
  }
  img.src = src
}

function applyRecolor() {
  if (!baseImg || !canvasEl.value) return
  const canvas = canvasEl.value
  canvas.width = baseImg.naturalWidth
  canvas.height = baseImg.naturalHeight
  const ctx = canvas.getContext('2d')
  ctx.drawImage(baseImg, 0, 0)

  let imageData
  try {
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  } catch (e) {
    canvasReady.value = false
    return
  }

  const data = imageData.data
  const { h: targetH, s: targetS } = hexToHsl(selectedColorHex.value)
  const bgThreshold = 235

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2]
    if (r > bgThreshold && g > bgThreshold && b > bgThreshold) continue

    const max = Math.max(r, g, b) / 255
    const min = Math.min(r, g, b) / 255
    const l = (max + min) / 2

    const [nr, ng, nb] = hslToRgb(targetH, targetS, l)
    data[i] = nr
    data[i + 1] = ng
    data[i + 2] = nb
  }

  ctx.putImageData(imageData, 0, 0)
}

function changeColor(color) {
  selectedColorName.value = color.name
  selectedColorHex.value = color.hex
  applyRecolor()
}

function addToCart() {
  if (product.value) {
    const variant = {
      colorName: selectedColorName.value || 'Standard',
      hex: selectedColorHex.value || '#000000',
      image: defaultImg.value
    }
    shopStore.addToCart(product.value, variant, quantity.value)
    justAdded.value = true
    setTimeout(() => (justAdded.value = false), 3000)
  }
}

watch(
  product,
  (newVal) => {
    if (newVal) {
      const colors = productColors.value
      if (colors.length > 0) {
        selectedColorName.value = colors[0].name
        selectedColorHex.value = colors[0].hex
      }
      const imgSrc = newVal.image || defaultImage(newVal)
      nextTick(() => loadAndPrepareImage(imgSrc))
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.color-swatch-btn {
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.back-link:hover {
  color: #2c2724 !important;
}

.main-add-btn {
  background-color: #2c2724;
  border-color: #2c2724;
  transition: all 0.3s ease;
}

.main-add-btn:hover {
  background-color: #c5a880;
  border-color: #c5a880;
  transform: translateY(-2px);
}

.fav-btn {
  width: 48px;
  height: 48px;
}

.active-tab {
  background-color: #2c2724 !important;
  color: #ffffff !important;
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