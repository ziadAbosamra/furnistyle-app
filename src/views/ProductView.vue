<template>
  <div class="product-view min-vh-100 py-5 bg-light">
    <div class="container py-4" v-if="product">
      <nav class="mb-4">
        <router-link to="/shop" class="text-decoration-none text-muted fw-semibold">
          <i class="bi bi-arrow-left me-2"></i> Back to Shop
        </router-link>
      </nav>

      <div class="row g-5 align-items-start bg-white p-4 p-lg-5 rounded-4 shadow-sm">
        <div class="col-lg-6">
          <div class="mb-3 rounded-4 overflow-hidden shadow-sm bg-light position-relative" style="height: 380px;">
            <img v-if="!canvasReady" :src="product.image" :alt="product.name" class="w-100 h-100 object-fit-cover">
            <canvas v-show="canvasReady" ref="canvasEl" class="w-100 h-100" style="object-fit: cover;"></canvas>
          </div>
          <div class="d-flex align-items-center gap-2 text-muted small">
            <i class="bi bi-star-fill text-warning"></i>
            <span class="fw-semibold text-dark">{{ product.rating }}</span>
            <span>({{ product.reviewsCount }} reviews)</span>
            <span class="ms-auto" :class="product.stock > 5 ? 'text-success' : 'text-danger'">
              {{ product.stock > 0 ? product.stock + ' in stock' : 'Out of stock' }}
            </span>
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

          <div class="d-flex gap-3 mb-4">
            <button class="btn btn-lg btn-primary rounded-pill px-5 fw-semibold text-white shadow-sm flex-grow-1"
                    style="background-color: #2c2724; border-color: #2c2724;"
                    :disabled="product.stock === 0"
                    @click="addToCart">
              <i class="bi bi-bag-plus me-2"></i>
              {{ product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }}
            </button>
            <button class="btn btn-lg btn-outline-dark rounded-circle p-3 shadow-sm d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;" @click="shopStore.toggleFavorite(product)">
              <i class="bi fs-5" :class="shopStore.isInWishlist(product.id) ? 'bi-heart-fill text-danger' : 'bi-heart'"></i>
            </button>
          </div>

          <div class="border-top pt-4">
            <ul class="nav nav-tabs mb-3">
              <li class="nav-item" v-for="tab in tabs" :key="tab">
                <button class="nav-link" :class="{ active: activeTab === tab }" @click="activeTab = tab">
                  {{ tab }}
                </button>
              </li>
            </ul>

            <div v-if="activeTab === 'Details'">
              <ul class="list-unstyled small text-muted mb-0">
                <li class="mb-2"><strong class="text-dark">Material:</strong> {{ product.material }}</li>
                <li class="mb-2"><strong class="text-dark">Dimensions:</strong> {{ product.dimensions }}</li>
                <li class="mb-2"><strong class="text-dark">Warranty:</strong> {{ product.warranty }}</li>
              </ul>
            </div>

            <div v-else-if="activeTab === 'Shipping'">
              <p class="small text-muted mb-2">Estimated delivery: 5–10 business days depending on your location.</p>
              <p class="small text-muted mb-0">Free shipping on orders over $300. Assembly instructions included.</p>
            </div>

            <div v-else-if="activeTab === 'Reviews'">
              <p class="small text-muted mb-0">
                {{ product.rating }} / 5 average rating based on {{ product.reviewsCount }} verified reviews.
              </p>
            </div>
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

function hexToHsl(hex) {
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

export default {
  name: 'ProductView',
  data() {
    return {
      quantity: 1,
      selectedColorName: '',
      selectedColorHex: '',
      canvasReady: false,
      activeTab: 'Details',
      tabs: ['Details', 'Shipping', 'Reviews'],
      _baseImg: null
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
          this.$nextTick(() => this.loadAndPrepareImage(newVal.image))
        }
      }
    }
  },
  methods: {
    loadAndPrepareImage(src) {
      this.canvasReady = false
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        this._baseImg = img
        this.canvasReady = true
        this.$nextTick(() => this.applyRecolor())
      }
      img.onerror = () => {
        // لو الصورة رفضت CORS، هتفضل الصورة الأصلية ظاهرة زي ما هي من غير تلوين
        this.canvasReady = false
      }
      img.src = src
    },
    applyRecolor() {
      if (!this._baseImg || !this.$refs.canvasEl) return
      const canvas = this.$refs.canvasEl
      canvas.width = this._baseImg.naturalWidth
      canvas.height = this._baseImg.naturalHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(this._baseImg, 0, 0)

      let imageData
      try {
        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      } catch (e) {
        this.canvasReady = false
        return
      }

      const data = imageData.data
      const { h: targetH, s: targetS } = hexToHsl(this.selectedColorHex)
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
    },
    changeColor(color) {
      this.selectedColorName = color.name
      this.selectedColorHex = color.hex
      this.applyRecolor()
    },
    addToCart() {
      if (this.product && this.product.stock > 0) {
        this.shopStore.addToCart({
          id: this.product.id,
          name: this.product.name,
          price: this.product.price,
          image: this.product.image,
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
canvas {
  display: block;
  object-fit: cover;
}
.nav-tabs .nav-link {
  color: #6c757d;
  border: none;
  border-bottom: 2px solid transparent;
}
.nav-tabs .nav-link.active {
  color: #2c2724;
  border-bottom: 2px solid #c5a880;
  background: none;
}
</style>