<template>
  <div class="shop-page py-5" style="background-color: var(--bg-cream, #fdfbf7);">
    <div class="container px-3 px-md-4">
      
      <!-- Page Header -->
      <div class="text-center mb-4">
        <span class="badge px-3 py-2 rounded-pill mb-3 fw-normal shadow-sm" style="background-color: #c5a880; color: #fff;">
          Full Catalog
        </span>
        <h1 class="fw-bold display-5 mb-2" style="color: #2c2724;">All FurniStyle Categories</h1>
        <p class="text-muted">Explore our extensive inventory across every room in your home.</p>
      </div>

      <!-- Toast Feedback Notification -->
      <transition name="fade">
        <div 
          v-if="toastMessage" 
          class="position-fixed top-0 end-0 m-4 z-3 alert alert-dark border-0 shadow-lg rounded-4 py-2 px-4 d-flex align-items-center gap-2"
          style="background-color: #2c2724; color: #fff;"
        >
          <i class="bi bi-check-circle-fill text-warning"></i>
          <span>{{ toastMessage }}</span>
        </div>
      </transition>

      <!-- Category Filter Tabs -->
      <div class="d-flex flex-wrap justify-content-center gap-2 mb-4">
        <button
          class="btn btn-sm rounded-pill px-3 py-2 fw-semibold category-btn"
          :class="activeCategory === 'all' ? 'btn-dark' : 'btn-outline-dark'"
          @click="activeCategory = 'all'"
        >
          All
        </button>
        <button
          v-for="cat in shopStore.categories"
          :key="cat.id"
          class="btn btn-sm rounded-pill px-3 py-2 fw-semibold category-btn"
          :class="activeCategory === cat.id ? 'btn-dark' : 'btn-outline-dark'"
          @click="activeCategory = cat.id"
        >
          {{ cat.label }}
        </button>
      </div>

      <!-- Search & Sorting Controls Bar -->
      <div class="row g-3 justify-content-between align-items-center mb-5 bg-white p-3 rounded-4 shadow-sm">
        <div class="col-md-6 col-lg-5">
          <div class="input-group">
            <span class="input-group-text bg-light border-0 ps-3 rounded-start-pill text-muted">
              <i class="bi bi-search"></i>
            </span>
            <input 
              v-model="searchQuery" 
              type="text" 
              class="form-control bg-light border-0 py-2 pe-3 rounded-end-pill small" 
              placeholder="Search products by name..."
            />
          </div>
        </div>

        <div class="col-md-4 col-lg-3 d-flex align-items-center gap-2 justify-content-md-end">
          <label class="small text-muted fw-semibold text-nowrap">Sort by:</label>
          <select v-model="sortBy" class="form-select form-select-sm bg-light border-0 rounded-pill py-2 px-3 fw-medium">
            <option value="default">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>
      </div>

      <!-- Skeleton Loading State -->
      <div v-if="shopStore.productsLoading" class="row g-4">
        <div class="col-xl-4 col-md-6" v-for="n in 6" :key="n">
          <div class="card h-100 rounded-4 border-0 placeholder-glow shadow-sm" style="height: 420px;">
            <div class="placeholder w-100 h-100 rounded-4"></div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="shopStore.productsError" class="alert alert-warning text-center rounded-4 shadow-sm p-4">
        <i class="bi bi-exclamation-triangle-fill fs-3 d-block mb-2 text-warning"></i>
        {{ shopStore.productsError }}
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredProducts.length === 0" class="text-center py-5 bg-white rounded-4 shadow-sm my-4">
        <i class="bi bi-search text-muted opacity-50" style="font-size: 3.5rem;"></i>
        <h5 class="mt-3 fw-bold text-dark">No products found</h5>
        <p class="text-muted small">Try searching for something else or switch categories.</p>
        <button @click="resetFilters" class="btn btn-dark rounded-pill px-4 btn-sm fw-semibold mt-2">
          Reset Filters
        </button>
      </div>

      <!-- Product Cards Grid -->
      <div v-else class="row g-4">
        <div class="col-xl-4 col-md-6" v-for="product in filteredProducts" :key="product.id">
          <div class="card h-100 shadow-sm rounded-4 overflow-hidden product-card border-0 bg-white">
            
            <!-- Image Wrap & Actions -->
            <div class="position-relative overflow-hidden bg-white d-block product-image-wrap">
              <router-link :to="`/product/${product.id}`">
                <img :src="defaultImage(product)" :alt="product.name" class="w-100 h-100 object-fit-cover product-img" loading="lazy" />
              </router-link>
              
              <!-- Category / Stock Badge -->
              <span class="badge position-absolute top-0 start-0 m-3 px-3 py-2 rounded-pill shadow-sm bg-white text-dark fw-semibold small">
                {{ product.category || 'Furniture' }}
              </span>

              <!-- Wishlist Heart Toggle Button -->
              <button 
                class="btn btn-light btn-sm rounded-circle position-absolute top-0 end-0 m-3 shadow-sm z-2 border-0 d-flex align-items-center justify-content-center"
                style="width: 36px; height: 36px; background-color: rgba(255, 255, 255, 0.9);"
                @click.prevent="toggleFavorite(product)"
                title="Toggle Favorite"
              >
                <i class="bi" :class="shopStore.isFavorite(product.id) ? 'bi-heart-fill text-danger' : 'bi-heart text-dark'"></i>
              </button>
            </div>

            <!-- Card Body -->
            <div class="card-body d-flex flex-column p-4">
              <router-link :to="`/product/${product.id}`" class="text-decoration-none">
                <h5 class="card-title fw-bold mb-2 text-dark text-truncate">{{ product.name }}</h5>
              </router-link>
              <p class="card-text small mb-4 text-muted line-clamp-2">{{ product.description }}</p>

              <!-- Card Footer / Price & Add Button -->
              <div class="d-flex justify-content-between align-items-center mt-auto pt-3 border-top border-light">
                <div>
                  <span class="small d-block text-muted">Price</span>
                  <span class="fw-bold fs-4" style="color: #c5a880;">${{ product.price }}</span>
                </div>

                <div class="d-flex gap-2">
                  <router-link :to="`/product/${product.id}`" class="btn btn-outline-dark rounded-pill px-3 py-2 fw-semibold btn-sm">
                    Details
                  </router-link>
                  <button class="btn btn-dark rounded-pill px-3 py-2 fw-semibold shadow-sm text-white btn-sm main-add-btn" @click="addToCart(product)">
                    <i class="bi bi-bag-plus me-1"></i> Add
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

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useShopStore } from '@/stores/shopStore'
import { defaultImage } from '@/data/products'

const shopStore = useShopStore()

const activeCategory = ref('all')
const searchQuery = ref('')
const sortBy = ref('default')
const toastMessage = ref('')

onMounted(() => {
  shopStore.loadCatalog()
})

const filteredProducts = computed(() => {
  let list = shopStore.products || []

  // Filter by category
  if (activeCategory.value !== 'all') {
    list = list.filter((p) => p.category === activeCategory.value || p.categoryId === activeCategory.value)
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim()
    list = list.filter((p) => p.name.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q)))
  }

  // Sort products
  if (sortBy.value === 'price-asc') {
    list = [...list].sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'price-desc') {
    list = [...list].sort((a, b) => b.price - a.price)
  } else if (sortBy.value === 'name') {
    list = [...list].sort((a, b) => a.name.localeCompare(b.name))
  }

  return list
})

function showToast(msg) {
  toastMessage.value = msg
  setTimeout(() => {
    toastMessage.value = ''
  }, 2500)
}

function addToCart(product) {
  const variant = product.variants?.[0] || {
    colorName: 'Standard',
    hex: '#000000',
    image: defaultImage(product)
  }
  shopStore.addToCart(product, variant, 1)
  showToast(`Added "${product.name}" to cart!`)
}

function toggleFavorite(product) {
  shopStore.toggleFavorite(product)
  const isFav = shopStore.isFavorite(product.id)
  showToast(isFav ? `Saved "${product.name}" to favorites.` : `Removed "${product.name}" from favorites.`)
}

function resetFilters() {
  activeCategory.value = 'all'
  searchQuery.value = ''
  sortBy.value = 'default'
}
</script>

<style scoped>
.product-image-wrap {
  height: 280px;
}

.product-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 1rem 2rem rgba(44, 39, 36, 0.08) !important;
}

.product-img {
  transition: transform 0.5s ease;
}

.product-card:hover .product-img {
  transform: scale(1.05);
}

.main-add-btn {
  background-color: #2c2724;
  border-color: #2c2724;
  transition: all 0.2s ease;
}

.main-add-btn:hover {
  background-color: #c5a880;
  border-color: #c5a880;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.category-btn {
  transition: all 0.2s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 575.98px) {
  .product-image-wrap {
    height: 220px;
  }
}
</style>