<template>
  <div class="favorites-page container py-5">
    <div class="text-center mb-5">
      <h1 class="fw-bold display-5" style="color: #2c2724;">My Favorite Products</h1>
      <p class="text-muted">Here are all the items you've saved for later.</p>
    </div>

    <!-- لو مفيش منتجات في المفضلة -->
    <div v-if="shopStore.favorites.length === 0" class="text-center py-5">
      <div class="mb-4">
        <i class="bi bi-heart text-muted display-1"></i>
      </div>
      <h3 class="fw-bold text-dark">Your favorites list is empty</h3>
      <p class="text-muted mb-4">Explore our shop and save your favorite items to view them here.</p>
      <router-link to="/shop" class="btn btn-dark rounded-pill px-4 py-2 fw-semibold">
        Go to Shop
      </router-link>
    </div>

    <!-- شبكة المنتجات المفضلة -->
    <div class="row g-4" v-else>
      <div class="col-xl-3 col-lg-4 col-md-6" v-for="product in shopStore.favorites" :key="product.id">
        <div class="card h-100 shadow-sm rounded-4 overflow-hidden product-card border-0 bg-white position-relative">
          
          <!-- زر إزالة من المفضلة (القلب الممتلئ) -->
          <button 
            @click.stop="toggleFavorite(product)" 
            class="btn position-absolute top-0 end-0 m-3 rounded-circle p-2 shadow-sm bg-white border-0 d-flex align-items-center justify-content-center"
            style="width: 40px; height: 40px; z-index: 10;"
          >
            <i class="bi bi-heart-fill text-danger fs-5"></i>
          </button>

          <!-- صورة المنتج -->
          <router-link :to="`/product/${product.id}`" class="position-relative overflow-hidden bg-light d-block text-decoration-none" style="height: 240px;">
            <img :src="product.image" :alt="product.name" class="w-100 h-100 object-fit-cover product-img">
            <span class="badge bg-dark position-absolute top-0 start-0 m-3 px-3 py-2 rounded-pill shadow-sm small">{{ product.category }}</span>
          </router-link>
          
          <!-- التفاصيل -->
          <div class="card-body d-flex flex-column p-4">
            <router-link :to="`/product/${product.id}`" class="text-decoration-none">
              <h5 class="card-title fw-bold fs-6 mb-2 text-dark text-truncate">{{ product.name }}</h5>
            </router-link>
            <p class="card-text small mb-4 text-muted text-truncate-2" style="font-size: 0.85rem;">{{ product.description }}</p>
            
            <div class="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
              <div>
                <span class="small d-block text-muted" style="font-size: 0.75rem;">Price</span>
                <span class="fw-bold fs-5" style="color: #c5a880;">${{ product.price }}</span>
              </div>
              
              <div class="d-flex gap-2">
                <router-link :to="`/product/${product.id}`" class="btn btn-outline-dark rounded-pill px-2 py-1 fw-semibold" style="font-size: 0.8rem;">
                  Details
                </router-link>
                <button class="btn btn-primary rounded-pill px-3 py-1 fw-semibold text-white add-btn" style="background-color: #2c2724; border-color: #2c2724; font-size: 0.8rem;" @click="addToCart(product)">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useShopStore } from '@/stores/shopStore'

export default {
  name: 'FavoritesView',
  setup() {
    const shopStore = useShopStore()
    return { shopStore }
  },
  methods: {
    toggleFavorite(product) {
      this.shopStore.toggleFavorite(product)
    },
    addToCart(product) {
      // التحقق من الألوان المتاحة للمنتج لتحديد اللون الافتراضي بشكل صحيح
      const defaultColor = product.colors && product.colors.length > 0 ? product.colors[0].name : 'Default'
      const defaultImage = product.colors && product.colors.length > 0 ? product.colors[0].image : product.image

      this.shopStore.addToCart({
        ...product,
        image: defaultImage,
        selectedColor: defaultColor,
        quantity: 1
      })
    }
  }
}
</script>

<style scoped>
.product-card {
  transition: all 0.3s ease-in-out;
}
.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 1rem 2rem rgba(44, 39, 36, 0.08) !important;
}
.product-img {
  transition: transform 0.5s;
}
.product-card:hover .product-img {
  transform: scale(1.05);
}
.text-truncate-2 {
  display: -webkit-box;

  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>