<template>
  <div class="shop-page container py-5">
    <div class="text-center mb-5">
      <h1 class="fw-bold display-5" style="color: #2c2724;">Explore Our Complete Collection</h1>
      <p class="text-muted">Discover over 20+ handcrafted masterclasses designed to elevate your living spaces.</p>
    </div>

    <!-- شبكة المنتجات (20 منتج) -->
    <div class="row g-4">
      <div class="col-xl-3 col-lg-4 col-md-6" v-for="product in products" :key="product.id">
        <div class="card h-100 shadow-sm rounded-4 overflow-hidden product-card border-0 bg-white position-relative">
          
          <!-- زر القلب للمفضلة -->
          <button 
            @click.stop="toggleFavorite(product)" 
            class="btn position-absolute top-0 end-0 m-3 rounded-circle p-2 shadow-sm bg-white border-0 d-flex align-items-center justify-content-center"
            style="width: 40px; height: 40px; z-index: 10;"
          >
            <i :class="isFavorite(product.id) ? 'bi bi-heart-fill text-danger fs-5' : 'bi bi-heart text-dark fs-5'"></i>
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
  name: 'ShopView',
  data() {
    return {
      products: [
        { id: 1, name: 'Minimalist Modern Sofa', category: 'Living Room', description: 'Comfortable 3-seater sofa with premium durable fabric and ergonomic support.', price: 499, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80'], colors: ['#2c3e50', '#8e44ad', '#27ae60'] },
        { id: 2, name: 'Scandinavian Wooden Dining Table', category: 'Dining', description: 'Solid oak wood table designed elegantly for warm family gatherings.', price: 350, image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=800&q=80'], colors: ['#d35400', '#7f8c8d'] },
        { id: 3, name: 'Ergonomic Executive Office Chair', category: 'Office', description: 'Sleek professional chair built for maximum comfort during long work sessions.', price: 150, image: 'https://images.unsplash.com/photo-1580481077494-e3299acae5d2?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1580481077494-e3299acae5d2?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'], colors: ['#16a085', '#2c3e50'] },
        { id: 4, name: 'Luxury Velvet Accent Chair', category: 'Living Room', description: 'Deep cushioning and smooth velvet fabric designed to make a bold statement.', price: 299, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80'], colors: ['#e74c3c', '#34495e'] },
        { id: 5, name: 'Industrial Bookshelf & Display', category: 'Office', description: 'Combination of robust metal frames and rustic wood shelves for spacious storage.', price: 210, image: 'https://images.unsplash.com/photo-1594626119524-77a83d780dd2?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1594626119524-77a83d780dd2?auto=format&fit=crop&w=800&q=80'], colors: ['#795548', '#212121'] },
        { id: 6, name: 'Nordic Pendant Ceiling Light', category: 'Lighting', description: 'Warm ambient hanging light fixture that brings a cozy modern atmosphere.', price: 95, image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80'], colors: ['#ffffff', '#f1c40f'] },
        { id: 7, name: 'Rattan Lounge Armchair', category: 'Outdoor', description: 'Natural handcrafted rattan chair offering breezy comfort for indoor and outdoor spaces.', price: 180, image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80'], colors: ['#d7ccc8', '#8d6e63'] },
        { id: 8, name: 'Minimalist Glass Coffee Table', category: 'Living Room', description: 'Tempered clear glass top with architectural wooden base geometry.', price: 220, image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80'], colors: ['#607d8b', '#37474f'] },
        { id: 9, name: 'Queen Size Upholstered Bed', category: 'Bedroom', description: 'Plush tufted headboard with hydraulic storage base and solid wooden slats.', price: 650, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80'], colors: ['#9e9e9e', '#3f51b5'] },
        { id: 10, name: 'Mid-Century Wooden Dresser', category: 'Bedroom', description: 'Six-drawer spacious dresser featuring clean lines and warm walnut finish.', price: 420, image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80'], colors: ['#8d6e63', '#4e342e'] },
        { id: 11, name: 'Contemporary Marble Dining Table', category: 'Dining', description: 'Authentic white marble top supported by striking matte black metal legs.', price: 850, image: 'https://images.unsplash.com/photo-1617806118233-18e1c0c17290?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1617806118233-18e1c0c17290?auto=format&fit=crop&w=800&q=80'], colors: ['#f5f5f5', '#212121'] },
        { id: 12, name: 'L-Shaped Sectional Sofa', category: 'Living Room', description: 'Spansive sectional sofa built for ultimate family movie nights and relaxation.', price: 950, image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80'], colors: ['#78909c', '#455a64'] },
        { id: 13, name: 'Minimalist Bedside Nightstand', category: 'Bedroom', description: 'Compact wooden nightstand with a single soft-close drawer and open shelf.', price: 90, image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=800&q=80'], colors: ['#d7ccc8', '#3e2723'] },
        { id: 14, name: 'Modern Standing Floor Lamp', category: 'Lighting', description: 'Arched metallic floor lamp with a warm linen drum shade.', price: 130, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80'], colors: ['#ffd54f', '#cfd8dc'] },
        { id: 15, name: 'Executive Wooden L-Desk', category: 'Office', description: 'Spacious workspace surface with built-in cable management ports.', price: 540, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80'], colors: ['#5d4037', '#263238'] },
        { id: 16, name: 'Tufted Leather Ottoman', category: 'Living Room', description: 'Versatile genuine leather footrest or extra seating pouf with rich texture.', price: 160, image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=800&q=80'], colors: ['#8d6e63', '#212121'] },
        { id: 17, name: 'Velvet Dining Chair (Set of 2)', category: 'Dining', description: 'Gold-tipped metal legs with plush velvet upholstery for luxury dining.', price: 240, image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80'], colors: ['#ab47bc', '#1976d2'] },
        { id: 18, name: 'Decorative Gold Wall Mirror', category: 'Decor', description: 'Large round wall mirror encased in a brushed antique gold metal frame.', price: 110, image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'], colors: ['#ffb300', '#757575'] },
        { id: 19, name: 'Minimalist TV Media Console', category: 'Living Room', description: 'Low-profile wooden entertainment center with slatted cabinet doors.', price: 380, image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=800&q=80'], colors: ['#d7ccc8', '#37474f'] },
        { id: 20, name: 'Ergonomic Gaming & Desk Chair', category: 'Office', description: 'High-back adjustable posture support chair for intensive computer use.', price: 270, image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80'], colors: ['#e53935', '#212121'] }
      ]
    }
  },
  setup() {
    const shopStore = useShopStore()
    return { shopStore }
  },
  methods: {
    isFavorite(productId) {
      return this.shopStore.favorites.some(p => p.id === productId)
    },
    toggleFavorite(product) {
      this.shopStore.toggleFavorite(product)
    },
    addToCart(product) {
      this.shopStore.addToCart({
        ...product,
        selectedColor: product.colors ? product.colors[0] : '#2c3e50',
        quantity: 1
      })
      // تم مسح الـ alert تماماً وبقي التنبيه العصري شغال من الـ Store
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
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>