<template>
  <div class="container py-5">
    <!-- Page Header -->
    <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
      <div>
        <h2 class="fw-bold mb-1" style="color: var(--text-main);">
          My Favorites <i class="bi bi-heart-fill ms-1" style="color: #c5a880;"></i>
        </h2>
        <p class="text-muted mb-0 fs-6">Saved items you love</p>
      </div>
      <span class="badge fs-6 px-3 py-2 rounded-pill shadow-sm text-white" style="background-color: #2c2724;">
        {{ shopStore.favorites.length }} Items
      </span>
    </div>

    <!-- Favorites Grid -->
    <div v-if="shopStore.favorites.length > 0" class="row g-4">
      <div v-for="product in shopStore.favorites" :key="product.id" class="col-12 col-md-6 col-lg-4">
        <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative product-card bg-white">
          
          <!-- Remove Favorite Button -->
          <button
            @click="shopStore.toggleFavorite(product)"
            class="btn btn-light rounded-circle shadow-sm position-absolute top-0 end-0 m-3 p-0 d-flex align-items-center justify-content-center fav-remove-btn"
            title="Remove from favorites"
            aria-label="Remove from favorites"
          >
            <i class="bi bi-heart-fill fs-5 text-danger"></i>
          </button>

          <!-- Product Image -->
          <router-link :to="`/product/${product.id}`" class="d-block text-decoration-none overflow-hidden" style="height: 240px; background-color: #fcfbf9;">
            <img :src="defaultImage(product)" :alt="product.name" class="w-100 h-100 object-fit-cover" loading="lazy" />
          </router-link>

          <!-- Card Content -->
          <div class="card-body d-flex flex-column justify-content-between p-4">
            <div>
              <span class="badge mb-2 px-2 py-1 fw-normal text-secondary border rounded-2 bg-light">
                {{ categoryLabel(product.category) }}
              </span>
              <h5 class="card-title fw-bold text-truncate mb-2 text-dark">{{ product.name }}</h5>
              <p class="card-text fw-bold fs-5 mb-3" style="color: #c5a880;">${{ product.price }}</p>
            </div>

            <div class="d-grid gap-2">
              <button 
                @click="shopStore.addToCart(product, product.variants?.[0], 1)" 
                class="btn btn-dark rounded-pill fw-bold py-2 shadow-sm main-btn"
              >
                <i class="bi bi-cart-plus me-1"></i> Add to Cart
              </button>
              <router-link 
                :to="`/product/${product.id}`" 
                class="btn btn-outline-secondary rounded-pill btn-sm text-center py-2 fw-semibold"
              >
                View Details
              </router-link>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-5 rounded-4 p-4 bg-white shadow-sm border">
      <div class="empty-icon-bg mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle">
        <i class="bi bi-heartbreak text-muted fs-1"></i>
      </div>
      <h4 class="fw-bold" style="color: var(--text-main);">No Favorites Yet</h4>
      <p class="text-muted fs-6 mb-4">Explore our collection and save the items you love!</p>
      <router-link to="/shop" class="btn btn-dark rounded-pill px-4 py-2 fw-bold shadow-sm">
        Discover Products
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useShopStore } from '@/stores/shopStore'
import { categories, defaultImage } from '@/data/products'

const shopStore = useShopStore()

function categoryLabel(id) {
  return categories.find((c) => c.id === id)?.label ?? 'Furniture'
}
</script>

<style scoped>
.product-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.08) !important;
}

.fav-remove-btn {
  width: 38px;
  height: 38px;
  z-index: 2;
  border: 1px solid rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;
}
.fav-remove-btn:hover {
  transform: scale(1.1);
}

.main-btn {
  background-color: #2c2724;
  border: none;
  transition: all 0.3s ease;
}
.main-btn:hover {
  background-color: #c5a880;
}

.empty-icon-bg {
  width: 80px;
  height: 80px;
  background-color: #f8f9fa;
}
</style>