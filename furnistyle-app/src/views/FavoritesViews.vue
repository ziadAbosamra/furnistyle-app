<template>
  <div class="container py-5">
    <!-- Header Section -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="fw-bold mb-1" style="color: #2c2724;">My Favorites ❤️</h2>
        <p class="text-muted mb-0 fs-6">Saved items you love</p>
      </div>
      <span class="badge fs-6 px-3 py-2 rounded-pill shadow-sm" style="background-color: #c5a880; color: #ffffff;">
        {{ shopStore.favorites.length }} Items
      </span>
    </div>

    <!-- Favorites Grid (Max 3 items per row) -->
    <div v-if="shopStore.favorites.length > 0" class="row g-4">
      <div 
        v-for="product in shopStore.favorites" 
        :key="product.id" 
        class="col-12 col-md-6 col-lg-4"
      >
        <div class="card h-100 border-0 rounded-4 overflow-hidden position-relative product-card" style="background-color: #ffffff; border: 1px solid #eae5d9 !important;">
          
          <!-- Favorite Toggle Button -->
          <button 
            @click="shopStore.toggleFavorite(product)"
            class="btn btn-light rounded-circle shadow-sm position-absolute top-0 end-0 m-3 p-0 d-flex align-items-center justify-content-center"
            style="width: 38px; height: 38px; z-index: 2; background-color: #fdfbf7; border: 1px solid #eae5d9;"
            title="Remove from favorites"
          >
            <i class="bi bi-heart-fill text-danger fs-5"></i>
          </button>

          <!-- Product Image -->
          <div class="overflow-hidden" style="height: 250px; background-color: #fdfbf7;">
            <img 
              :src="product.images ? product.images[0] : product.image" 
              :alt="product.name" 
              class="card-img-top w-100 h-100 object-fit-cover" 
            />
          </div>

          <!-- Product Body -->
          <div class="card-body d-flex flex-column justify-content-between p-4">
            <div>
              <span class="badge mb-2 px-2 py-1 fw-normal" style="background-color: #f7f3eb; color: #7c746e; border: 1px solid #eae5d9;">
                {{ product.category || 'Furniture' }}
              </span>
              <h5 class="card-title fw-bold text-truncate mb-2" style="color: #2c2724;">{{ product.name }}</h5>
              <p class="card-text fw-bold fs-5 mb-3" style="color: #c5a880;">${{ product.price }}</p>
            </div>

            <div class="d-grid gap-2">
              <button 
                @click="shopStore.addToCart(product)" 
                class="btn btn-primary rounded-pill fw-bold py-2 shadow-sm"
              >
                <i class="bi bi-cart-plus me-1"></i> Add to Cart
              </button>
              <router-link 
                :to="`/product/${product.id}`" 
                class="btn btn-outline-secondary rounded-pill btn-sm text-center py-2 fw-semibold"
                style="border-color: #eae5d9; color: #7c746e;"
              >
                View Details
              </router-link>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Empty Favorites State -->
    <div v-else class="text-center py-5 rounded-4 p-4" style="background-color: #ffffff; border: 1px solid #eae5d9;">
      <i class="bi bi-heartbreak text-muted display-3 mb-3" style="color: #c5a880 !important;"></i>
      <h4 class="fw-bold" style="color: #2c2724;">No Favorites Yet</h4>
      <p class="text-muted fs-6 mb-4">Explore our luxury collection and save the items you love!</p>
      <router-link to="/product/1" class="btn btn-primary rounded-pill px-4 py-2 fw-bold shadow-sm">
        Discover Products
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useShopStore } from '@/stores/shopStore'

const shopStore = useShopStore()
</script>

<style scoped>
.product-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 15px rgba(220, 210, 195, 0.2) !important;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 25px rgba(197, 168, 128, 0.25) !important;
}

.btn-outline-secondary:hover {
  background-color: #f7f3eb !important;
  color: #2c2724 !important;
}
</style>