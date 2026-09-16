<template>
  <div class="container py-5 text-dark" v-if="product">
    <div class="row g-5 align-items-center">
      <!-- Product Image & Gallery -->
      <div class="col-lg-6">
        <div class="card border-0 rounded-4 overflow-hidden shadow-lg p-3 bg-white">
          <img 
            :src="currentImage" 
            :alt="product.name" 
            class="img-fluid rounded-4 object-fit-cover w-100" 
            style="max-height: 500px; transition: opacity 0.3s ease;"
          >
          <!-- مصغرات الألوان -->
          <div class="d-flex gap-3 mt-3 justify-content-center" v-if="product.colors && product.colors.length > 1">
            <div 
              v-for="(colorObj, idx) in product.colors" 
              :key="idx" 
              @click="selectColor(colorObj)"
              class="rounded-3 cursor-pointer border p-1 text-center bg-light"
              :class="selectedColor === colorObj.hex ? 'border-primary border-3 shadow' : 'border-secondary opacity-75'"
              style="width: 75px;"
            >
              <img :src="colorObj.image" class="rounded-2 w-100" style="height: 50px; object-fit: cover;">
              <small class="d-block text-dark mt-1 fw-bold" style="font-size: 11px;">{{ colorObj.name }}</small>
            </div>
          </div>
        </div>
      </div>

      <!-- Product Info -->
      <div class="col-lg-6 text-dark">
        <span class="badge bg-secondary mb-2 px-3 py-2 text-uppercase tracking-wider text-white">{{ product.category || 'Furniture' }}</span>
        <h1 class="fw-bold mb-3 display-5 text-dark">{{ product.name }}</h1>
        <h3 class="text-success fw-bold mb-4">${{ product.price }}</h3>
        <p class="text-muted fs-5 mb-4">{{ product.description }}</p>

        <!-- Color Selection Buttons -->
        <div class="mb-4" v-if="product.colors && product.colors.length">
          <label class="form-label fw-semibold text-dark d-block">Select Color: <span class="text-primary fw-bold">{{ selectedColorName }}</span></label>
          <div class="d-flex gap-3 align-items-center">
            <button 
              v-for="colorObj in product.colors" 
              :key="colorObj.hex"
              @click="selectColor(colorObj)"
              class="btn rounded-circle p-3 border-2 position-relative"
              :class="selectedColor === colorObj.hex ? 'border-dark shadow-lg scale-up ring' : 'border-transparent'"
              :style="{ backgroundColor: colorObj.hex }"
              :title="colorObj.name"
              style="width: 40px; height: 40px;"
            ></button>
          </div>
        </div>

        <!-- Quantity & Add to Cart -->
        <div class="d-flex gap-3 align-items-center mb-4">
          <div class="input-group" style="width: 140px;">
            <button @click="quantity > 1 ? quantity-- : null" class="btn btn-outline-dark">-</button>
            <span class="form-control text-center bg-white text-dark border-dark fw-bold d-flex align-items-center justify-content-center">{{ quantity }}</span>
            <button @click="quantity++" class="btn btn-outline-dark">+</button>
          </div>

          <button @click="addToCart" class="btn btn-primary btn-lg flex-grow-1 rounded-3 fw-bold text-white shadow-sm" style="background-color: #2c2724; border-color: #2c2724;">
            <i class="bi bi-cart-plus me-2"></i> Add to Cart
          </button>
          
          <button @click="toggleFavorite" class="btn btn-outline-danger btn-lg rounded-3 d-flex align-items-center justify-content-center shadow-sm" style="width: 50px; height: 50px;">
            <i :class="isFavorite ? 'bi bi-heart-fill text-danger fs-4' : 'bi bi-heart fs-4'"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center py-5">
    <h3 class="text-danger">Product not found!</h3>
    <router-link to="/shop" class="btn btn-dark mt-3">Back to Shop</router-link>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useShopStore } from '@/stores/shopStore'

const route = useRoute()
const shopStore = useShopStore()

const allProducts = [
  { 
    id: 1, 
    name: 'Minimalist Modern Sofa', 
    category: 'Living Room', 
    description: 'Comfortable 3-seater sofa with premium durable fabric and ergonomic support.', 
    price: 499, 
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80', 
    colors: [
      { name: 'Dark Navy', hex: '#2c3e50', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80' },
      { name: 'Teal Blue', hex: '#00838f', image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80' }
    ] 
  },
  { 
    id: 2, 
    name: 'Scandinavian Wooden Dining Table', 
    category: 'Dining', 
    description: 'Solid oak wood table designed elegantly for warm family gatherings.', 
    price: 350, 
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80', 
    colors: [
      { name: 'Natural Oak', hex: '#d35400', image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80' },
      { name: 'Light Wood', hex: '#e59866', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80' }
    ] 
  },
  { 
    id: 3, 
    name: 'Ergonomic Executive Office Chair', 
    category: 'Office', 
    description: 'Sleek professional chair built for maximum comfort during long work sessions.', 
    price: 150, 
    image: 'https://images.unsplash.com/photo-1580481077494-e3299acae5d2?auto=format&fit=crop&w=800&q=80', 
    colors: [
      { name: 'Pure White', hex: '#ecf0f1', image: 'https://images.unsplash.com/photo-1580481077494-e3299acae5d2?auto=format&fit=crop&w=800&q=80' },
      { name: 'Charcoal Black', hex: '#2c3e50', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80' }
    ] 
  },
  { 
    id: 4, 
    name: 'Luxury Velvet Accent Chair', 
    category: 'Living Room', 
    description: 'Deep cushioning and smooth velvet fabric designed to make a bold statement.', 
    price: 299, 
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80', 
    colors: [
      { name: 'Mustard Yellow', hex: '#f1c40f', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80' },
      { name: 'Dark Emerald', hex: '#16a085', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80' }
    ] 
  },
  { 
    id: 5, 
    name: 'Industrial Bookshelf & Display', 
    category: 'Office', 
    description: 'Combination of robust metal frames and rustic wood shelves for spacious storage.', 
    price: 210, 
    image: 'https://images.unsplash.com/photo-1594626119524-77a83d780dd2?auto=format&fit=crop&w=800&q=80', 
    colors: [
      { name: 'Rustic Brown', hex: '#795548', image: 'https://images.unsplash.com/photo-1594626119524-77a83d780dd2?auto=format&fit=crop&w=800&q=80' },
      { name: 'Dark Wood', hex: '#4e342e', image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=800&q=80' }
    ] 
  },
  { 
    id: 6, 
    name: 'Nordic Pendant Ceiling Light', 
    category: 'Lighting', 
    description: 'Warm ambient hanging light fixture that brings a cozy modern atmosphere.', 
    price: 95, 
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80', 
    colors: [
      { name: 'Matte White', hex: '#ffffff', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80' },
      { name: 'Warm Gold', hex: '#d4ac0d', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80' }
    ] 
  },
  { 
    id: 7, 
    name: 'Rattan Lounge Armchair', 
    category: 'Outdoor', 
    description: 'Natural handcrafted rattan chair offering breezy comfort for indoor and outdoor spaces.', 
    price: 180, 
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80', 
    colors: [
      { name: 'Light Rattan', hex: '#d7ccc8', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80' },
      { name: 'Dark Rattan', hex: '#6d4c41', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80' }
    ] 
  },
  { 
    id: 8, 
    name: 'Minimalist Glass Coffee Table', 
    category: 'Living Room', 
    description: 'Tempered clear glass top with architectural wooden base geometry.', 
    price: 220, 
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80', 
    colors: [
      { name: 'Clear Wood', hex: '#8d6e63', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80' },
      { name: 'Dark Oak', hex: '#4e342e', image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80' }
    ] 
  },
  { 
    id: 9, 
    name: 'Queen Size Upholstered Bed', 
    category: 'Bedroom', 
    description: 'Plush tufted headboard with hydraulic storage base and solid wooden slats.', 
    price: 650, 
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80', 
    colors: [
      { name: 'Soft Gray', hex: '#9e9e9e', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80' },
      { name: 'Beige Linen', hex: '#d7ccc8', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80' }
    ] 
  },
  { 
    id: 10, 
    name: 'Mid-Century Wooden Dresser', 
    category: 'Bedroom', 
    description: 'Six-drawer spacious dresser featuring clean lines and warm walnut finish.', 
    price: 420, 
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80', 
    colors: [
      { name: 'Warm Oak', hex: '#8d6e63', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80' },
      { name: 'Espresso', hex: '#4e342e', image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=800&q=80' }
    ] 
  },
  { 
    id: 11, 
    name: 'Contemporary Marble Dining Table', 
    category: 'Dining', 
    description: 'Authentic white marble top supported by striking matte black metal legs.', 
    price: 850, 
    image: 'https://images.unsplash.com/photo-1617806118233-18e1c0c17290?auto=format&fit=crop&w=800&q=80', 
    colors: [
      { name: 'White Marble', hex: '#f5f5f5', image: 'https://images.unsplash.com/photo-1617806118233-18e1c0c17290?auto=format&fit=crop&w=800&q=80' },
      { name: 'Gray Stone', hex: '#95a5a6', image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80' }
    ] 
  },
  { 
    id: 12, 
    name: 'L-Shaped Sectional Sofa', 
    category: 'Living Room', 
    description: 'Spansive sectional sofa built for ultimate family movie nights and relaxation.', 
    price: 950, 
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80', 
    colors: [
      { name: 'Ice Gray', hex: '#78909c', image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80' },
      { name: 'Deep Navy', hex: '#2c3e50', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80' }
    ] 
  },
  { 
    id: 13, 
    name: 'Minimalist Bedside Nightstand', 
    category: 'Bedroom', 
    description: 'Compact wooden nightstand with a single soft-close drawer and open shelf.', 
    price: 90, 
    image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=800&q=80', 
    colors: [
      { name: 'Beige Wood', hex: '#d7ccc8', image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=800&q=80' },
      { name: 'Dark Mahogany', hex: '#3e2723', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80' }
    ] 
  },
  { 
    id: 14, 
    name: 'Modern Standing Floor Lamp', 
    category: 'Lighting', 
    description: 'Arched metallic floor lamp with a warm linen drum shade.', 
    price: 130, 
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80', 
    colors: [
      { name: 'Amber Gold', hex: '#ffd54f', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80' },
      { name: 'Silver Steel', hex: '#cfd8dc', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80' }
    ] 
  },
  { 
    id: 15, 
    name: 'Executive Wooden L-Desk', 
    category: 'Office', 
    description: 'Spacious workspace surface with built-in cable management ports.', 
    price: 540, 
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80', 
    colors: [
      { name: 'Rich Brown', hex: '#5d4037', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80' },
      { name: 'Graphite', hex: '#263238', image: 'https://images.unsplash.com/photo-1594626119524-77a83d780dd2?auto=format&fit=crop&w=800&q=80' }
    ] 
  },
  { 
    id: 16, 
    name: 'Tufted Leather Ottoman', 
    category: 'Living Room', 
    description: 'Versatile genuine leather footrest or extra seating pouf with rich texture.', 
    price: 160, 
    image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=800&q=80', 
    colors: [
      { name: 'Tan Leather', hex: '#8d6e63', image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=800&q=80' },
      { name: 'Black Leather', hex: '#212121', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80' }
    ] 
  },
  { 
    id: 17, 
    name: 'Velvet Dining Chair (Set of 2)', 
    category: 'Dining', 
    description: 'Gold-tipped metal legs with plush velvet upholstery for luxury dining.', 
    price: 240, 
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80', 
    colors: [
      { name: 'Royal Violet', hex: '#ab47bc', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80' },
      { name: 'Teal Velvet', hex: '#00838f', image: 'https://images.unsplash.com/photo-1580481077494-e3299acae5d2?auto=format&fit=crop&w=800&q=80' }
    ] 
  },
  { 
    id: 18, 
    name: 'Decorative Gold Wall Mirror', 
    category: 'Decor', 
    description: 'Large round wall mirror encased in a brushed antique gold metal frame.', 
    price: 110, 
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80', 
    colors: [
      { name: 'Antique Gold', hex: '#ffb300', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80' },
      { name: 'Brushed Silver', hex: '#757575', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80' }
    ] 
  },
  { 
    id: 19, 
    name: 'Minimalist TV Media Console', 
    category: 'Living Room', 
    description: 'Low-profile wooden entertainment center with slatted cabinet doors.', 
    price: 380, 
    image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=800&q=80', 
    colors: [
      { name: 'Light Birch', hex: '#d7ccc8', image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=800&q=80' },
      { name: 'Dark Oak', hex: '#37474f', image: 'https://images.unsplash.com/photo-1594626119524-77a83d780dd2?auto=format&fit=crop&w=800&q=80' }
    ] 
  },
  { 
    id: 20, 
    name: 'Ergonomic Gaming & Desk Chair', 
    category: 'Office', 
    description: 'High-back adjustable posture support chair for intensive computer use.', 
    price: 270, 
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80', 
    colors: [
      { name: 'Racing Red', hex: '#e53935', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80' },
      { name: 'Stealth Black', hex: '#212121', image: 'https://images.unsplash.com/photo-1580481077494-e3299acae5d2?auto=format&fit=crop&w=800&q=80' }
    ] 
  }
]

const product = ref(null)
const selectedColor = ref('')
const selectedColorName = ref('')
const quantity = ref(1)

const currentImage = computed(() => {
  if (!product.value) return ''
  const foundColor = product.value.colors?.find(c => c.hex === selectedColor.value)
  if (foundColor && foundColor.image) {
    return foundColor.image
  }
  return product.value.image
})

const loadProduct = () => {
  const productId = parseInt(route.params.id)
  const found = allProducts.find(p => p.id === productId)
  if (found) {
    product.value = JSON.parse(JSON.stringify(found))
    if (product.value.colors && product.value.colors.length > 0) {
      selectedColor.value = product.value.colors[0].hex
      selectedColorName.value = product.value.colors[0].name
    }
    quantity.value = 1
  }
}

onMounted(loadProduct)
watch(() => route.params.id, loadProduct)

const selectColor = (colorObj) => {
  selectedColor.value = colorObj.hex
  selectedColorName.value = colorObj.name
}

const isFavorite = computed(() => {
  return product.value ? shopStore.favorites.some(p => p.id === product.value.id) : false
})

const addToCart = () => {
  if (!product.value) return
  shopStore.addToCart({
    ...product.value,
    image: currentImage.value,
    selectedColor: selectedColor.value,
    selectedColorName: selectedColorName.value,
    quantity: quantity.value
  })
}

const toggleFavorite = () => {
  if (!product.value) return
  shopStore.toggleFavorite(product.value)
}
</script>

<style scoped>
.scale-up {
  transform: scale(1.15);
  transition: transform 0.2s ease-in-out;
}
.cursor-pointer {
  cursor: pointer;
}
</style>