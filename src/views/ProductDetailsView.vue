<template>
  <div class="product-details-container container py-5" v-if="product">
    <div class="row g-5">
      <!-- قسم الصور -->
      <div class="col-lg-6">
        <div class="main-image-wrapper rounded-4 overflow-hidden shadow-sm bg-light mb-3" style="height: 450px;">
          <img :src="selectedImage || product.image" :alt="product.name" class="w-100 h-100 object-fit-cover">
        </div>
      </div>

      <!-- قسم التفاصيل -->
      <div class="col-lg-6 d-flex flex-column">
        <span class="badge bg-secondary rounded-pill align-self-start mb-2 px-3 py-2">{{ product.category }}</span>
        <h1 class="fw-bold mb-3" style="color: #2c2724;">{{ product.name }}</h1>
        <h3 class="fw-bold mb-4" style="color: #c5a880;">${{ product.price }}</h3>
        
        <p class="text-muted mb-4">{{ product.description }}</p>

        <!-- اختيار الألوان (إذا توفرت) -->
        <div v-if="product.colors && product.colors.length" class="mb-4">
          <label class="fw-semibold mb-2 d-block">Color: <span class="text-muted">{{ selectedColorName }}</span></label>
          <div class="d-flex gap-3">
            <div 
              v-for="(color, index) in product.colors" 
              :key="index"
              @click="selectColor(color)"
              class="color-swatch rounded-circle border cursor-pointer"
              :class="{ 'active-swatch': selectedColorHex === color.hex }"
              :style="{ backgroundColor: color.hex, width: '35px', height: '35px', cursor: 'pointer' }"
              :title="color.name"
            ></div>
          </div>
        </div>

        <!-- زر الإضافة للسلة -->
        <div class="mt-auto pt-4 border-top d-flex gap-3">
          <button @click="addToCart" class="btn btn-dark btn-lg flex-grow-1 rounded-pill py-3 fw-bold" style="background-color: #2c2724;">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="container py-5 text-center">
    <h2 class="text-muted">Product not found.</h2>
    <router-link to="/shop" class="btn btn-outline-dark mt-3 rounded-pill">Back to Shop</router-link>
  </div>
</template>

<script>
import { useShopStore } from '@/stores/shopStore'

export default {
  name: 'ProductDetailsView',
  data() {
    return {
      product: null,
      selectedImage: '',
      selectedColorHex: '',
      selectedColorName: ''
    }
  },
  created() {
    this.loadProduct()
  },
  watch: {
    '$route.params.id'() {
      this.loadProduct()
    }
  },
  methods: {
    loadProduct() {
      const productId = Number(this.$route.params.id)
      
      // بنجيب المنتجات من نفس القائمة المحدثة
      const allProducts = [
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
            { name: 'Espresso', hex: '#4e342e', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80' }
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
            { name: 'Black', hex: '#212121', image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80' }
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
            { name: 'Deep Gray', hex: '#455a64', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80' }
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
            { name: 'Beige', hex: '#d7ccc8', image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=800&q=80' },
            { name: 'Dark Wood', hex: '#3e2723', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80' }
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
            { name: 'Amber', hex: '#ffd54f', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80' },
            { name: 'Silver', hex: '#cfd8dc', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80' }
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
            { name: 'Brown', hex: '#5d4037', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80' },
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
            { name: 'Tan', hex: '#8d6e63', image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=800&q=80' },
            { name: 'Black', hex: '#212121', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80' }
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
            { name: 'Purple', hex: '#ab47bc', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80' },
            { name: 'Blue', hex: '#1976d2', image: 'https://images.unsplash.com/photo-1580481077494-e3299acae5d2?auto=format&fit=crop&w=800&q=80' }
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
            { name: 'Gold', hex: '#ffb300', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80' },
            { name: 'Silver', hex: '#757575', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80' }
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
            { name: 'Birch', hex: '#d7ccc8', image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=800&q=80' },
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
            { name: 'Red', hex: '#e53935', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80' },
            { name: 'Black', hex: '#212121', image: 'https://images.unsplash.com/photo-1580481077494-e3299acae5d2?auto=format&fit=crop&w=800&q=80' }
          ] 
        }
      ]

      this.product = allProducts.find(p => p.id === productId)

      if (this.product) {
        this.selectedImage = this.product.image
        if (this.product.colors && this.product.colors.length > 0) {
          this.selectedColorHex = this.product.colors[0].hex
          this.selectedColorName = this.product.colors[0].name
        }
      }
    },
    selectColor(color) {
      this.selectedColorHex = color.hex
      this.selectedColorName = color.name
      this.selectedImage = color.image
    },
    addToCart() {
      const shopStore = useShopStore()
      shopStore.addToCart({
        ...this.product,
        selectedColor: this.selectedColorHex,
        selectedColorName: this.selectedColorName,
        quantity: 1
      })
    }
  }
}
</script>

<style scoped>
.color-swatch {
  transition: transform 0.2s, box-shadow 0.2s;
}
.color-swatch:hover {
  transform: scale(1.1);
}
.active-swatch {
  box-shadow: 0 0 0 3px #fff, 0 0 0 5px #2c2724 !important;
}
</style>