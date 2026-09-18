<template>
  <div class="shop-page container py-5">
    <div class="text-center mb-5">
      <h1 class="fw-bold display-5" style="color: #2c2724;">Explore Our Complete Collection</h1>
      <p class="text-muted">Discover over 20+ handcrafted masterclasses designed to elevate your living spaces.</p>
    </div>

    <div class="row g-4">
      <div class="col-xl-3 col-lg-4 col-md-6" v-for="product in products" :key="product.id">
        <div class="card h-100 shadow-sm rounded-4 overflow-hidden product-card border-0 bg-white position-relative">
          
          <button 
            @click.stop="toggleFavorite(product)" 
            class="btn position-absolute top-0 end-0 m-3 rounded-circle p-2 shadow-sm bg-white border-0 d-flex align-items-center justify-content-center"
            style="width: 40px; height: 40px; z-index: 10;"
          >
            <i :class="isFavorite(product.id) ? 'bi bi-heart-fill text-danger fs-5' : 'bi bi-heart text-dark fs-5'"></i>
          </button>

          <router-link :to="`/product/${product.id}`" class="position-relative overflow-hidden bg-light d-block text-decoration-none" style="height: 240px;">
            <img :src="product.image" :alt="product.name" class="w-100 h-100 object-fit-cover product-img">
            <span class="badge bg-dark position-absolute top-0 start-0 m-3 px-3 py-2 rounded-pill shadow-sm small">{{ product.category }}</span>
          </router-link>
          
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
        { 
          id: 1, 
          name: 'Minimalist Modern Sofa', 
          category: 'Living Room', 
          description: 'Comfortable 3-seater sofa with premium durable fabric and ergonomic support.', 
          price: 499, 
          image: 'https://i.pinimg.com/1200x/3b/2e/d2/3b2ed204ab7fe663b8ad079b6e997049.jpg', 
          colors: [
            { name: 'Dark Navy', hex: '#2c3e50', image: 'https://i.pinimg.com/1200x/3b/2e/d2/3b2ed204ab7fe663b8ad079b6e997049.jpg' },
            { name: 'Purple Velvet', hex: '#8e44ad', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80' }
          ] 
        },
        { 
          id: 2, 
          name: 'Scandinavian Wooden Dining Table', 
          category: 'Dining', 
          description: 'Solid oak wood table designed elegantly for warm family gatherings.', 
          price: 350, 
          image: 'https://i.pinimg.com/736x/21/4c/77/214c771329631edcfe04588df7f42b7c.jpg', 
          colors: [
            { name: 'Natural Oak', hex: '#d35400', image: 'https://i.pinimg.com/736x/21/4c/77/214c771329631edcfe04588df7f42b7c.jpg' },
            { name: 'Gray Oak', hex: '#7f8c8d', image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80' }
          ] 
        },
        { 
          id: 3, 
          name: 'Ergonomic Executive Office Chair', 
          category: 'Office', 
          description: 'Sleek professional chair built for maximum comfort during long work sessions.', 
          price: 150, 
          image: 'https://i.pinimg.com/736x/d3/48/d3/d348d348b33acc57c6225866fb2463d1.jpg', 
          colors: [
            { name: 'Teal', hex: '#16a085', image: 'https://i.pinimg.com/736x/d3/48/d3/d348d348b33acc57c6225866fb2463d1.jpg' },
            { name: 'Dark', hex: '#2c3e50', image: 'https://images.unsplash.com/photo-1580481077494-e3299acae5d2?auto=format&fit=crop&w=800&q=80' }
          ] 
        },
        { 
          id: 4, 
          name: 'Luxury Velvet Accent Chair', 
          category: 'Living Room', 
          description: 'Deep cushioning and smooth velvet fabric designed to make a bold statement.', 
          price: 299, 
          image: 'https://i.pinimg.com/736x/63/cb/2d/63cb2deed1e8cc5aff7e787400d21303.jpg', 
          colors: [
            { name: 'Red', hex: '#e74c3c', image: 'https://i.pinimg.com/736x/63/cb/2d/63cb2deed1e8cc5aff7e787400d21303.jpg' },
            { name: 'Dark Slate', hex: '#34495e', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80' }
          ] 
        },
        { 
          id: 5, 
          name: 'Industrial Bookshelf & Display', 
          category: 'Office', 
          description: 'Combination of robust metal frames and rustic wood shelves for spacious storage.', 
          price: 210, 
          image: 'https://i.pinimg.com/1200x/fa/c3/fe/fac3fef937d2c7c8ba4e1b64c225cce9.jpg', 
          colors: [
            { name: 'Rustic Brown', hex: '#795548', image: 'https://i.pinimg.com/1200x/fa/c3/fe/fac3fef937d2c7c8ba4e1b64c225cce9.jpg' },
            { name: 'Black Metal', hex: '#212121', image: 'https://images.unsplash.com/photo-1594626119524-77a83d780dd2?auto=format&fit=crop&w=800&q=80' }
          ] 
        },
        { 
          id: 6, 
          name: 'Nordic Pendant Ceiling Light', 
          category: 'Lighting', 
          description: 'Warm ambient hanging light fixture that brings a cozy modern atmosphere.', 
          price: 95, 
          image: 'https://i.pinimg.com/736x/4f/09/65/4f09655259581998f0533918b393fdbf.jpg', 
          colors: [
            { name: 'White', hex: '#ffffff', image: 'https://i.pinimg.com/736x/4f/09/65/4f09655259581998f0533918b393fdbf.jpg' },
            { name: 'Gold', hex: '#f1c40f', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80' }
          ] 
        },
        { 
          id: 7, 
          name: 'Rattan Lounge Armchair', 
          category: 'Outdoor', 
          description: 'Natural handcrafted rattan chair offering breezy comfort for indoor and outdoor spaces.', 
          price: 180, 
          image: 'https://i.pinimg.com/736x/85/89/f7/8589f75061d283e6530472d30ea3e7cd.jpg', 
          colors: [
            { name: 'Light Rattan', hex: '#d7ccc8', image: 'https://i.pinimg.com/736x/85/89/f7/8589f75061d283e6530472d30ea3e7cd.jpg' },
            { name: 'Brown', hex: '#8d6e63', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80' }
          ] 
        },
        { 
          id: 8, 
          name: 'Minimalist Glass Coffee Table', 
          category: 'Living Room', 
          description: 'Tempered clear glass top with architectural wooden base geometry.', 
          price: 220, 
          image: 'https://i.pinimg.com/736x/40/28/e7/4028e702e79a90c014f7a8f995ae4015.jpg', 
          colors: [
            { name: 'Blue Gray', hex: '#607d8b', image: 'https://i.pinimg.com/736x/40/28/e7/4028e702e79a90c014f7a8f995ae4015.jpg' },
            { name: 'Dark', hex: '#37474f', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80' }
          ] 
        },
        { 
          id: 9, 
          name: 'Queen Size Upholstered Bed', 
          category: 'Bedroom', 
          description: 'Plush tufted headboard with hydraulic storage base and solid wooden slats.', 
          price: 650, 
          image: 'https://i.pinimg.com/736x/c6/88/60/c68860f7d239e7f25407a73ab955be23.jpg', 
          colors: [
            { name: 'Gray', hex: '#9e9e9e', image: 'https://i.pinimg.com/736x/c6/88/60/c68860f7d239e7f25407a73ab955be23.jpg' },
            { name: 'Blue', hex: '#3f51b5', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80' }
          ] 
        },
        {
          id: 10, 
          name: 'Mid-Century Wooden Dresser', 
          category: 'Bedroom', 
          description: 'Six-drawer spacious dresser featuring clean lines and warm walnut finish.', 
          price: 420, 
          image: 'https://i.pinimg.com/736x/46/25/8a/46258ab4d11af332c5ae3a5f36a9060b.jpg', 
          colors: [
            { name: 'Oak', hex: '#8d6e63', image: 'https://i.pinimg.com/736x/46/25/8a/46258ab4d11af332c5ae3a5f36a9060b.jpg' },
            { name: 'Espresso', hex: '#4e342e', image: 'https://i.pinimg.com/736x/46/25/8a/46258ab4d11af332c5ae3a5f36a9060b.jpg' }
          ] 
        },
        { 
          id: 11, 
          name: 'Contemporary Marble Dining Table', 
          category: 'Dining', 
          description: 'Authentic white marble top supported by striking matte black metal legs.', 
          price: 850, 
          image: 'https://i.pinimg.com/736x/37/78/91/377891fe169d967a5f33188626b5c48f.jpg', 
          colors: [
            { name: 'White Marble', hex: '#f5f5f5', image: 'https://i.pinimg.com/736x/37/78/91/377891fe169d967a5f33188626b5c48f.jpg' },
            { name: 'Black', hex: '#212121', image: 'https://i.pinimg.com/736x/37/78/91/377891fe169d967a5f33188626b5c48f.jpg' }
          ] 
        },
        { 
          id: 12, 
          name: 'L-Shaped Sectional Sofa', 
          category: 'Living Room', 
          description: 'Spansive sectional sofa built for ultimate family movie nights and relaxation.', 
          price: 950, 
          image: 'https://i.pinimg.com/736x/ec/02/0e/ec020eba34b36068c534935502b9526c.jpg', 
          colors: [
            { name: 'Ice Gray', hex: '#78909c', image: 'https://i.pinimg.com/736x/ec/02/0e/ec020eba34b36068c534935502b9526c.jpg' },
            { name: 'Deep Gray', hex: '#455a64', image: 'https://i.pinimg.com/736x/ec/02/0e/ec020eba34b36068c534935502b9526c.jpg' }
          ] 
        },
        { 
          id: 13, 
          name: 'Minimalist Bedside Nightstand', 
          category: 'Bedroom', 
          description: 'Compact wooden nightstand with a single soft-close drawer and open shelf.', 
          price: 90, 
          image: 'https://i.pinimg.com/1200x/c1/a9/b6/c1a9b69a5153c1491e39bbf1be0c6793.jpg', 
          colors: [
            { name: 'Beige', hex: '#d7ccc8', image: 'https://i.pinimg.com/1200x/c1/a9/b6/c1a9b69a5153c1491e39bbf1be0c6793.jpg' },
            { name: 'Dark Wood', hex: '#3e2723', image: 'https://i.pinimg.com/1200x/c1/a9/b6/c1a9b69a5153c1491e39bbf1be0c6793.jpg' }
          ] 
        },
        { 
          id: 14, 
          name: 'Modern Standing Floor Lamp', 
          category: 'Lighting', 
          description: 'Arched metallic floor lamp with a warm linen drum shade.', 
          price: 130, 
          image: 'https://i.pinimg.com/736x/63/c2/d6/63c2d69ac8c8513a30d848526236d2bb.jpg', 
          colors: [
            { name: 'Amber', hex: '#ffd54f', image: 'https://i.pinimg.com/736x/63/c2/d6/63c2d69ac8c8513a30d848526236d2bb.jpg' },
            { name: 'Silver', hex: '#cfd8dc', image: 'https://i.pinimg.com/736x/63/c2/d6/63c2d69ac8c8513a30d848526236d2bb.jpg' }
          ] 
        },
        { 
          id: 15, 
          name: 'Executive Wooden L-Desk', 
          category: 'Office', 
          description: 'Spacious workspace surface with built-in cable management ports.', 
          price: 540, 
          image: 'https://i.pinimg.com/736x/0b/d5/42/0bd542fe94fb973aad06cb6c1971d885.jpg', 
          colors: [
            { name: 'Brown', hex: '#5d4037', image: 'https://i.pinimg.com/736x/0b/d5/42/0bd542fe94fb973aad06cb6c1971d885.jpg' },
            { name: 'Graphite', hex: '#263238', image: 'https://i.pinimg.com/736x/0b/d5/42/0bd542fe94fb973aad06cb6c1971d885.jpg' }
          ] 
        },
        { 
          id: 16, 
          name: 'Tufted Leather Ottoman', 
          category: 'Living Room', 
          description: 'Versatile genuine leather footrest or extra seating pouf with rich texture.', 
          price: 160, 
          image: 'https://i.pinimg.com/736x/a0/85/05/a0850547c114ea913497ccbd03a67ff6.jpg', 
          colors: [
            { name: 'Tan', hex: '#8d6e63', image: 'https://i.pinimg.com/736x/a0/85/05/a0850547c114ea913497ccbd03a67ff6.jpg' },
            { name: 'Black', hex: '#212121', image: 'https://i.pinimg.com/736x/a0/85/05/a0850547c114ea913497ccbd03a67ff6.jpg' }
          ] 
        },
        { 
          id: 17, 
          name: 'Velvet Dining Chair (Set of 2)', 
          category: 'Dining', 
          description: 'Gold-tipped metal legs with plush velvet upholstery for luxury dining.', 
          price: 240, 
          image: 'https://i.pinimg.com/736x/6e/95/05/6e950535a9ef2da66574a6187b7da47a.jpg', 
          colors: [
            { name: 'Purple', hex: '#ab47bc', image: 'https://i.pinimg.com/736x/6e/95/05/6e950535a9ef2da66574a6187b7da47a.jpg' },
            { name: 'Blue', hex: '#1976d2', image: 'https://i.pinimg.com/736x/6e/95/05/6e950535a9ef2da66574a6187b7da47a.jpg' }
          ] 
        },
        { 
          id: 18, 
          name: 'Decorative Gold Wall Mirror', 
          category: 'Decor', 
          description: 'Large round wall mirror encased in a brushed antique gold metal frame.', 
          price: 110, 
          image: 'https://i.pinimg.com/1200x/77/de/e6/77dee6dda04ce7c0ffafb071acf198ac.jpg', 
          colors: [
            { name: 'Gold', hex: '#ffb300', image: 'https://i.pinimg.com/1200x/77/de/e6/77dee6dda04ce7c0ffafb071acf198ac.jpg' },
            { name: 'Silver', hex: '#757575', image: 'https://i.pinimg.com/1200x/77/de/e6/77dee6dda04ce7c0ffafb071acf198ac.jpg' }
          ] 
        },
        { 
          id: 19, 
          name: 'Minimalist TV Media Console', 
          category: 'Living Room', 
          description: 'Low-profile wooden entertainment center with slatted cabinet doors.', 
          price: 380, 
          image: 'https://i.pinimg.com/1200x/e5/2c/d3/e52cd36e4e22cf9607504aeb1d5816c6.jpg', 
          colors: [
            { name: 'Birch', hex: '#d7ccc8', image: 'https://i.pinimg.com/1200x/e5/2c/d3/e52cd36e4e22cf9607504aeb1d5816c6.jpg' },
            { name: 'Dark Oak', hex: '#37474f', image: 'https://i.pinimg.com/1200x/e5/2c/d3/e52cd36e4e22cf9607504aeb1d5816c6.jpg' }
          ] 
        },
        { 
          id: 20, 
          name: 'Ergonomic Gaming & Desk Chair', 
          category: 'Office', 
          description: 'High-back adjustable posture support chair for intensive computer use.', 
          price: 270, 
          image: 'https://i.pinimg.com/736x/c2/0c/14/c20c149286a0b0bf25c3d8c5fa444a1f.jpg', 
          colors: [
            { name: 'Red', hex: '#e53935', image: 'https://i.pinimg.com/736x/c2/0c/14/c20c149286a0b0bf25c3d8c5fa444a1f.jpg' },
            { name: 'Black', hex: '#212121', image: 'https://i.pinimg.com/736x/c2/0c/14/c20c149286a0b0bf25c3d8c5fa444a1f.jpg' }
          ] 
        }
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
        selectedColor: product.colors && product.colors.length ? product.colors[0].hex : '#2c3e50',
        selectedColorName: product.colors && product.colors.length ? product.colors[0].name : 'Default',
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
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>