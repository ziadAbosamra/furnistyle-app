<template>
  <div class="home-page d-flex flex-column">
    
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

    <!-- Hero Section -->
    <header class="hero-section text-center py-5 mb-5 position-relative overflow-hidden">
      <div class="container-fluid py-4 py-md-5 px-3 px-md-4 position-relative">
        <div class="row justify-content-center">
          <div class="col-lg-8 py-3 py-lg-4">
            <span class="badge px-3 py-2 rounded-pill mb-3 fw-normal shadow-sm" style="background-color: #c5a880; color: #fff;">
              New Modern Collection
            </span>
            <h1 class="display-4 display-md-3 fw-bold mb-4" style="color: #2c2724;">
              Transform Your Space Into a Masterpiece
            </h1>
            <p class="lead mb-5 mx-auto text-muted" style="max-width: 700px;">
              Discover handcrafted, elegant, and comfortable furniture pieces designed to elevate your living
              experience with unmatched style.
            </p>
            <div class="d-flex flex-wrap justify-content-center gap-3">
              <router-link to="/shop" class="btn btn-lg px-5 rounded-pill shadow-sm text-white fw-semibold main-btn">
                Shop Now <i class="bi bi-arrow-right ms-2"></i>
              </router-link>
              <a href="#featured" class="btn btn-outline-dark btn-lg px-4 rounded-pill fw-semibold">
                Explore Highlights
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Interactive Value Proposition Features Section -->
    <section class="container px-3 px-md-4 mb-5">
      <div class="row g-3 g-md-4 py-3 bg-white rounded-4 shadow-sm border border-light text-center">
        <div 
          v-for="feature in features" 
          :key="feature.id" 
          class="col-6 col-md-3"
        >
          <div 
            class="feature-card p-3 rounded-4 h-100 position-relative"
            @click="openFeatureModal(feature)"
            role="button"
            tabindex="0"
          >
            <div class="icon-wrapper mb-2 mx-auto d-flex align-items-center justify-content-center rounded-circle">
              <i :class="[feature.icon, 'fs-2']" style="color: #c5a880;"></i>
            </div>
            <h6 class="fw-bold mb-1 text-dark">{{ feature.title }}</h6>
            <span class="small text-muted d-block">{{ feature.subtitle }}</span>
            
            <!-- Hint Icon on hover -->
            <span class="click-hint position-absolute bottom-0 start-50 translate-middle-x mb-1 text-muted">
              <i class="bi bi-chevron-compact-down"></i>
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Feature Details Vue Native Modal (Teleport to body) -->
    <Teleport to="body">
      <div 
        v-if="isModalOpen && selectedFeature" 
        class="custom-modal-backdrop d-flex align-items-center justify-content-center"
        @click.self="closeFeatureModal"
      >
        <div class="modal-dialog modal-dialog-centered w-100 mx-3" style="max-width: 500px;">
          <div class="modal-content border-0 shadow-lg rounded-4 overflow-hidden bg-white">
            <div class="modal-header border-0 pb-0 bg-light p-4">
              <div class="d-flex align-items-center gap-3">
                <div class="modal-icon-badge rounded-circle p-3 d-flex align-items-center justify-content-center bg-white shadow-sm">
                  <i :class="[selectedFeature.icon, 'fs-2']" style="color: #c5a880;"></i>
                </div>
                <div>
                  <h5 class="modal-title fw-bold text-dark mb-0">{{ selectedFeature.title }}</h5>
                  <small class="text-muted">{{ selectedFeature.subtitle }}</small>
                </div>
              </div>
              <button type="button" class="btn-close ms-auto" @click="closeFeatureModal" aria-label="Close"></button>
            </div>
            
            <div class="modal-body p-4">
              <p class="text-secondary mb-4" style="line-height: 1.6;">
                {{ selectedFeature.description }}
              </p>

              <!-- Feature Bullet Highlights -->
              <ul class="list-unstyled mb-4">
                <li v-for="(point, idx) in selectedFeature.highlights" :key="idx" class="d-flex align-items-center gap-2 mb-2 text-dark small fw-semibold">
                  <i class="bi bi-check-circle-fill" style="color: #c5a880;"></i>
                  <span>{{ point }}</span>
                </li>
              </ul>

              <div class="d-flex justify-content-end gap-2 pt-2">
                <button type="button" class="btn btn-light rounded-pill px-4 fw-semibold" @click="closeFeatureModal">
                  Close
                </button>
                <button @click="handleAction(selectedFeature)" type="button" class="btn btn-dark rounded-pill px-4 fw-semibold shadow-sm">
                  {{ selectedFeature.actionText }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Featured Highlights Section -->
    <section id="featured" class="container-fluid px-3 px-md-4 mb-5 flex-grow-1">
      <div class="text-center mb-5">
        <span class="text-uppercase small fw-bold tracking-wider" style="color: #c5a880;">Curated Selection</span>
        <h2 class="fw-bold display-6 mb-2" style="color: #2c2724;">Featured Highlights</h2>
        <p class="text-muted">A glimpse of our finest pieces for your home</p>
      </div>

      <!-- Skeleton Loading State -->
      <div v-if="shopStore.productsLoading" class="row g-4 px-lg-3">
        <div class="col-xl-4 col-md-6" v-for="n in 3" :key="n">
          <div class="card h-100 rounded-4 border-0 placeholder-glow shadow-sm" style="height: 420px;">
            <div class="placeholder w-100 h-100 rounded-4"></div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="shopStore.productsError" class="alert alert-warning text-center rounded-4 shadow-sm">
        <i class="bi bi-exclamation-triangle me-2"></i> {{ shopStore.productsError }}
      </div>

      <!-- Products Grid -->
      <div v-else class="row g-4 px-lg-3">
        <div class="col-xl-4 col-md-6" v-for="product in featuredProducts" :key="product.id">
          <div class="card h-100 shadow-sm rounded-4 overflow-hidden product-card border-0 bg-white">
            
            <!-- Image & Quick Wishlist -->
            <div class="position-relative overflow-hidden bg-white d-block product-image-wrap">
              <router-link :to="`/product/${product.id}`">
                <img :src="defaultImage(product)" :alt="product.name" class="w-100 h-100 object-fit-cover product-img" loading="lazy" />
              </router-link>
              <span class="badge bg-dark position-absolute top-0 start-0 m-3 px-3 py-2 rounded-pill shadow-sm">Highlight</span>

              <!-- Wishlist Toggle -->
              <button 
                class="btn btn-light btn-sm rounded-circle position-absolute top-0 end-0 m-3 shadow-sm z-2 border-0 d-flex align-items-center justify-content-center"
                style="width: 36px; height: 36px; background-color: rgba(255, 255, 255, 0.9);"
                @click.prevent="toggleFavorite(product)"
                title="Toggle Favorite"
              >
                <i class="bi" :class="shopStore.isFavorite(product.id) ? 'bi-heart-fill text-danger' : 'bi-heart text-dark'"></i>
              </button>
            </div>

            <!-- Card Content -->
            <div class="card-body d-flex flex-column p-4">
              <router-link :to="`/product/${product.id}`" class="text-decoration-none">
                <h5 class="card-title fw-bold mb-2 text-dark text-truncate">{{ product.name }}</h5>
              </router-link>
              <p class="card-text small mb-4 text-muted line-clamp-2">{{ product.description }}</p>

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
    </section>

    <!-- Banner Call to Action -->
    <section class="container px-3 px-md-4 mb-5">
      <div class="rounded-4 p-4 p-md-5 text-white position-relative overflow-hidden shadow-sm" style="background-color: #2c2724;">
        <div class="row align-items-center position-relative z-1">
          <div class="col-lg-8 mb-3 mb-lg-0">
            <h3 class="fw-bold display-6 mb-2">Ready to redesign your home?</h3>
            <p class="text-white-50 mb-0">Browse through our full category collection and order with express delivery.</p>
          </div>
          <div class="col-lg-4 text-lg-end">
            <router-link to="/shop" class="btn btn-light rounded-pill px-4 py-2 fw-bold text-dark shadow-sm">
              Explore Full Catalog
            </router-link>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useShopStore } from '@/stores/shopStore'
import { defaultImage } from '@/data/products'

const router = useRouter()
const shopStore = useShopStore()
const toastMessage = ref('')

const selectedFeature = ref(null)
const isModalOpen = ref(false)

// Features Data
const features = [
  {
    id: 'delivery',
    icon: 'bi bi-truck',
    title: 'Free Delivery',
    subtitle: 'On orders over $300',
    description: 'We offer free, fully insured nationwide shipping on all furniture orders over $300. Our specialized delivery team handles your items with extreme care right to your doorstep.',
    highlights: ['Insured Transit', 'Scheduled Delivery Slots', 'White-Glove Handling'],
    actionText: 'Shop Now',
    targetRoute: '/shop'
  },
  {
    id: 'warranty',
    icon: 'bi bi-shield-check',
    title: '2-Year Warranty',
    subtitle: 'Guaranteed durability',
    description: 'Every piece of furniture from FurniStyle comes backed by a comprehensive 2-year warranty covering frame integrity, wood joinery, and manufacturing defects.',
    highlights: ['100% Structural Coverage', 'Hassle-Free Repairs/Replacements', 'Guaranteed Premium Quality'],
    actionText: 'Explore Catalog',
    targetRoute: '/shop'
  },
  {
    id: 'quality',
    icon: 'bi bi-award',
    title: 'Crafted Quality',
    subtitle: 'Premium materials',
    description: 'Our furniture is sustainably crafted using high-grade solid hardwood, eco-friendly finishes, and durable upholstery fabrics designed to last generations.',
    highlights: ['Sustainably Sourced Wood', 'Hand-stitched Upholstery', 'Non-Toxic Eco Finishes'],
    actionText: 'Explore Collections',
    targetRoute: '/shop'
  },
  {
    id: 'support',
    icon: 'bi bi-headset',
    title: '24/7 Support',
    subtitle: 'Dedicated assistance',
    description: 'Need help picking the right size or matching colors for your interior? Our support team and design consultants are available round the clock to assist you.',
    highlights: ['Real-Time Assistance', 'Order & Delivery Tracking', 'Custom Design Consultations'],
    actionText: 'Contact Support',
    targetRoute: '/shop'
  }
]

onMounted(() => {
  shopStore.loadCatalog()
})

const featuredProducts = computed(() => {
  const all = shopStore.products || []
  const featured = all.filter((p) => p.featured)
  return featured.length > 0 ? featured : all.slice(0, 3)
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

function openFeatureModal(feature) {
  selectedFeature.value = feature
  isModalOpen.value = true
}

function closeFeatureModal() {
  isModalOpen.value = false
}

function handleAction(feature) {
  closeFeatureModal()
  if (feature.targetRoute) {
    router.push(feature.targetRoute)
  }
}
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #fdfbf7 0%, #f4ede4 100%);
  border-bottom-left-radius: 2.5rem;
  border-bottom-right-radius: 2.5rem;
}

/* Feature Cards Interactivity */
.feature-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  background-color: transparent;
}

.feature-card:hover {
  background-color: #fdfbf7;
  transform: translateY(-4px);
}

.icon-wrapper {
  width: 58px;
  height: 58px;
  background-color: #fcf9f2;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.feature-card:hover .icon-wrapper {
  transform: scale(1.1);
  background-color: #f4efe6;
}

.click-hint {
  opacity: 0;
  transition: opacity 0.3s ease;
  font-size: 0.8rem;
}

.feature-card:hover .click-hint {
  opacity: 0.5;
}

/* Vue Native Modal Styling */
.custom-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1050;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-icon-badge {
  width: 52px;
  height: 52px;
  background-color: #fdfbf7;
}

.main-btn {
  background-color: #2c2724;
  border-color: #2c2724;
  transition: all 0.3s ease;
}

.main-btn:hover {
  background-color: #c5a880;
  border-color: #c5a880;
  transform: translateY(-2px);
}

.product-image-wrap {
  height: 280px;
}

.product-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
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