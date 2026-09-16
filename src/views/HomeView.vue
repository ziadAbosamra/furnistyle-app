<template>
  <div class="home-page min-vh-100 d-flex flex-column bg-light">
    <!-- Hero Section مع اللوجو -->
    <header class="hero-section text-center py-5 mb-5 position-relative overflow-hidden shadow-sm">
      <div class="container-fluid py-5 px-4 position-relative z-index-2">
        <div class="row justify-content-center">
          <div class="col-lg-8 py-4">
            <div class="mb-4">
              <h2 class="fw-bold tracking-wider text-uppercase d-inline-block px-4 py-2 rounded-3 text-white shadow-sm" style="background-color: #2c2724; letter-spacing: 3px;">
                Furni<span style="color: #c5a880;">Style</span>
              </h2>
            </div>
            
            <span class="badge px-3 py-2 rounded-pill mb-3 fw-normal shadow-sm" style="background-color: #c5a880; color: #fff;">New 2026 Modern Collection</span>
            <h1 class="display-3 fw-bold mb-4 tracking-tight" style="color: #2c2724;">Transform Your Space Into a Masterpiece</h1>
            <p class="lead mb-5 mx-auto text-muted" style="max-width: 700px;">
              Discover handcrafted, elegant, and comfortable furniture pieces designed to elevate your living experience with unmatched style and high-end durability.
            </p>
            <div class="d-flex justify-content-center gap-3">
              <router-link to="/shop" class="btn btn-primary btn-lg px-5 rounded-pill shadow-sm text-white fw-semibold" style="background-color: #2c2724; border-color: #2c2724;">Explore Collection</router-link>
              <a href="#featured" class="btn btn-outline-dark btn-lg px-4 rounded-pill fw-semibold">Why FurniStyle?</a>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- شريط المميزات التفاعلي -->
    <section class="container mb-5">
      <div class="row g-4 text-center">
        <div class="col-md-4" v-for="(feature, type) in modalContents" :key="type">
          <div class="p-4 rounded-4 bg-white shadow-sm border-0 h-100 feature-box cursor-pointer position-relative overflow-hidden" @click="openFeatureModal(type)">
            <div class="position-absolute top-0 start-0 w-100 bg-primary" style="height: 4px; background-color: #c5a880 !important;"></div>
            <div class="mb-3 fs-2 mt-2" style="color: #c5a880;"><i :class="feature.icon"></i></div>
            <h5 class="fw-bold text-dark mb-2">{{ feature.title }}</h5>
            <p class="text-muted small mb-3">{{ feature.shortDesc }}</p>
            <span class="btn btn-sm btn-outline-dark rounded-pill px-3 fw-semibold">Learn More <i class="bi bi-arrow-right ms-1"></i></span>
          </div>
        </div>
      </div>
    </section>

    <!-- المنتجات البارزة مع زرار المفضلة -->
    <section id="featured" class="container-fluid px-4 mb-5">
      <div class="d-flex justify-content-between align-items-center mb-4 px-lg-3">
        <div>
          <h2 class="fw-bold display-6 mb-1" style="color: #2c2724;">Trending Highlights</h2>
          <p class="text-muted mb-0">Handpicked masterpieces loved by our customers</p>
        </div>
        <router-link to="/shop" class="btn btn-outline-dark rounded-pill px-4 fw-semibold">View All</router-link>
      </div>
      
      <div class="row g-4 px-lg-3">
        <div class="col-xl-4 col-md-6" v-for="product in shopStore.products" :key="product.id">
          <div class="card h-100 shadow-sm rounded-4 overflow-hidden product-card border-0 bg-white position-relative">
            <!-- زرار الـ Wishlist (القلب) -->
            <button class="position-absolute top-0 end-0 m-3 btn btn-light rounded-circle p-2 shadow-sm z-index-3 border-0" @click="shopStore.toggleWishlist(product)">
              <i class="bi" :class="shopStore.isInWishlist(product.id) ? 'bi-heart-fill text-danger' : 'bi-heart text-dark'"></i>
            </button>

            <router-link :to="`/product/${product.id}`" class="position-relative overflow-hidden bg-white d-block text-decoration-none" style="height: 280px;">
              <img :src="product.image" :alt="product.name" class="w-100 h-100 object-fit-cover product-img">
              <span class="badge bg-dark position-absolute top-0 start-0 m-3 px-3 py-2 rounded-pill shadow-sm">Bestseller</span>
            </router-link>
            
            <div class="card-body d-flex flex-column p-4">
              <router-link :to="`/product/${product.id}`" class="text-decoration-none">
                <h5 class="card-title fw-bold mb-2 text-dark">{{ product.name }}</h5>
              </router-link>
              <p class="card-text small mb-4 text-muted text-truncate">{{ product.description }}</p>
              
              <div class="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
                <div>
                  <span class="small d-block text-muted">Price</span>
                  <span class="fw-bold fs-4" style="color: #c5a880;">${{ product.price }}</span>
                </div>
                
                <div class="d-flex gap-2">
                  <router-link :to="`/product/${product.id}`" class="btn btn-outline-dark rounded-pill px-3 py-2 fw-semibold btn-sm">
                    Details
                  </router-link>
                  <button class="btn btn-primary rounded-pill px-3 py-2 fw-semibold shadow-sm text-white add-btn btn-sm" style="background-color: #2c2724; border-color: #2c2724;" @click="addToCartQuick(product)">
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- قسم معرض الصور الفاخر (Our Masterpiece Gallery) -->
    <section class="container-fluid px-4 my-5 py-4 bg-white shadow-sm rounded-5">
      <div class="text-center mb-5">
        <span class="badge px-3 py-2 rounded-pill mb-2 fw-normal" style="background-color: #c5a880; color: #fff;">Visual Inspiration</span>
        <h2 class="fw-bold display-6" style="color: #2c2724;">Our Masterpiece Gallery</h2>
        <p class="text-muted">A glimpse into luxury interior setups designed by our clients</p>
      </div>
      <div class="row g-4 px-lg-4">
        <div class="col-lg-4 col-md-6" v-for="(galleryItem, index) in galleryImages" :key="index">
          <div class="gallery-card position-relative rounded-4 overflow-hidden shadow-sm">
            <img :src="galleryItem.image" :alt="galleryItem.title" class="w-100 object-fit-cover gallery-img" style="height: 320px;">
            <div class="gallery-overlay position-absolute bottom-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-4 text-white">
              <span class="badge bg-dark align-self-start mb-2 px-3 py-2 rounded-pill">{{ galleryItem.category }}</span>
              <h4 class="fw-bold mb-1">{{ galleryItem.title }}</h4>
              <p class="small text-light opacity-75 mb-0">{{ galleryItem.location }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mt-5">
        <router-link to="/shop" class="btn btn-outline-dark rounded-pill px-5 py-3 fw-semibold">Explore More Inspirations</router-link>
      </div>
    </section>

    <!-- قسم آراء العملاء (Testimonials) -->
    <section class="container my-5 py-4">
      <div class="text-center mb-5">
        <h2 class="fw-bold display-6" style="color: #2c2724;">What Our Clients Say</h2>
        <p class="text-muted">Real experiences from luxury homeowners</p>
      </div>
      <div class="row g-4">
        <div class="col-md-4">
          <div class="p-4 rounded-4 bg-white shadow-sm border-0 h-100">
            <div class="text-warning mb-3 fs-5"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></div>
            <p class="text-muted fst-italic mb-4">"The minimalist sofa transformed my entire living room look. Exceptional quality and super fast white-glove delivery!"</p>
            <div class="d-flex align-items-center gap-3">
              <div class="rounded-circle bg-secondary text-white fw-bold d-flex align-items-center justify-content-center" style="width: 45px; height: 45px;">AS</div>
              <div>
                <h6 class="fw-bold mb-0 text-dark">Ahmed Samir</h6>
                <small class="text-muted">Cairo, Egypt</small>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="p-4 rounded-4 bg-white shadow-sm border-0 h-100">
            <div class="text-warning mb-3 fs-5"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></div>
            <p class="text-muted fst-italic mb-4">"Amazing wooden dining table! Very solid oak quality and the customer service helped me pick the right color match."</p>
            <div class="d-flex align-items-center gap-3">
              <div class="rounded-circle bg-secondary text-white fw-bold d-flex align-items-center justify-content-center" style="width: 45px; height: 45px;">ZA</div>
              <div>
                <h6 class="fw-bold mb-0 text-dark">Ziad Abu Samra</h6>
                <small class="text-muted">Alexandria, Egypt</small>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="p-4 rounded-4 bg-white shadow-sm border-0 h-100">
            <div class="text-warning mb-3 fs-5"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></div>
            <p class="text-muted fst-italic mb-4">"The 5-year warranty gives complete peace of mind. Truly high-end furniture standards."</p>
            <div class="d-flex align-items-center gap-3">
              <div class="rounded-circle bg-secondary text-white fw-bold d-flex align-items-center justify-content-center" style="width: 45px; height: 45px;">MS</div>
              <div>
                <h6 class="fw-bold mb-0 text-dark">Mahmoud Saeed</h6>
                <small class="text-muted">Damietta, Egypt</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- قسم النشرة البريدية (Newsletter Signup) -->
    <section class="container my-5">
      <div class="p-5 rounded-4 text-white text-center position-relative overflow-hidden shadow-lg" style="background: linear-gradient(135deg, #2c2724 0%, #4a3d35 100%);">
        <div class="row justify-content-center position-relative z-index-2">
          <div class="col-lg-7">
            <span class="badge px-3 py-2 rounded-pill mb-3 fw-normal" style="background-color: #c5a880; color: #fff;">Join Club FurniStyle</span>
            <h2 class="fw-bold display-6 mb-3">Get 10% Off Your First Order</h2>
            <p class="text-light opacity-75 mb-4">Subscribe to our newsletter to receive secret sales, design tips, and VIP discounts.</p>
            
            <form @submit.prevent="subscribeNewsletter" class="input-group mb-3 shadow-sm" v-if="!subscribed">
              <input type="email" class="form-control form-control-lg border-0 ps-4 rounded-start-pill" placeholder="Enter your email address..." v-model="emailInput" required>
              <button class="btn btn-lg px-4 text-white rounded-end-pill fw-semibold" style="background-color: #c5a880;" type="submit">Subscribe</button>
            </form>
            <div class="alert alert-success rounded-pill fw-semibold py-3" v-else>
              <i class="bi bi-check-circle-fill me-2"></i> Thank you for subscribing! Check your email for the 10% coupon code.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- المودال التفاعلي للمميزات -->
    <div class="modal fade show" tabindex="-1" style="background: rgba(0,0,0,0.6); display: block;" v-if="activeModal">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content rounded-4 border-0 shadow-lg overflow-hidden">
          <div class="modal-header text-white px-4 py-3" style="background-color: #2c2724;">
            <div class="d-flex align-items-center gap-3">
              <div class="fs-3" style="color: #c5a880;"><i :class="modalData.icon"></i></div>
              <h4 class="modal-title fw-bold mb-0">{{ modalData.title }}</h4>
            </div>
            <button type="button" class="btn-close btn-close-white" @click="activeModal = null"></button>
          </div>
          
          <div class="modal-body p-4 bg-white">
            <p class="text-secondary fs-6 mb-4 pb-2 border-bottom">{{ modalData.description }}</p>
            <div class="row g-3">
              <div class="col-md-6" v-for="(point, idx) in modalData.points" :key="idx">
                <div class="p-3 rounded-3 bg-light border-0 h-100 d-flex align-items-start gap-3">
                  <div class="fs-5 mt-1" style="color: #c5a880;"><i class="bi bi-check-circle-fill"></i></div>
                  <div>
                    <h6 class="fw-bold text-dark mb-1">{{ point.title }}</h6>
                    <p class="text-muted small mb-0">{{ point.text }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer bg-light px-4 py-3 border-0">
            <button type="button" class="btn btn-dark rounded-pill px-5 fw-semibold" style="background-color: #2c2724; border-color: #2c2724;" @click="activeModal = null">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useShopStore } from '@/stores/shopStore'

export default {
  name: 'HomeView',
  data() {
    return {
      activeModal: null,
      emailInput: '',
      subscribed: false,
      galleryImages: [
        {
          title: 'Modern Minimalist Living Room',
          category: 'Living Room',
          location: 'New Cairo Villa',
          image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'
        },
        {
          title: 'Executive Solid Oak Dining',
          category: 'Dining Space',
          location: 'Alexandria Residence',
          image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80'
        },
        {
          title: 'Luxury Velvet Lounge Suite',
          category: 'Lounge Area',
          location: 'North Coast Chalet',
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80'
        }
      ],
      modalContents: {
        shipping: {
          title: 'Free Global Shipping Program',
          icon: 'bi bi-truck',
          shortDesc: 'Fast and secure delivery right to your living room doorstep.',
          description: 'We ensure your luxury furniture reaches your home in pristine condition anywhere around the world with our fully insured White-Glove delivery service.',
          points: [
            { title: 'Fully Insured Transit', text: 'Every item is completely covered against any damage during transportation.' },
            { title: 'Scheduled Doorstep Delivery', text: 'Choose your preferred delivery date and time slot that fits your schedule.' },
            { title: 'Professional Assembly', text: 'Our delivery team unpacks and assembles your furniture right in your room.' },
            { title: 'Real-time Tracking', text: 'Track your shipment live from our warehouse straight to your doorstep.' }
          ]
        },
        warranty: {
          title: '5-Year Comprehensive Warranty',
          icon: 'bi bi-shield-check',
          shortDesc: 'Crafted with premium solid oak and durable fabrics built to last.',
          description: 'We stand firmly behind the superior craftsmanship of our products by offering an extensive 5-year structural and material warranty.',
          points: [
            { title: 'Structural Integrity', text: 'Covers wooden frames, joints, mechanisms, and overall structural build.' },
            { title: 'Fabric & Leather Protection', text: 'Protects against abnormal seam tearing or material fading under normal use.' },
            { title: 'Free Repair or Replacement', text: 'Any verified manufacturing defect will be repaired or replaced at zero cost.' },
            { title: 'Dedicated Support Claim', text: 'Fast and hassle-free warranty claims processed directly through our customer portal.' }
          ]
        },
        support: {
          title: '24/7 Expert Interior Design Support',
          icon: 'bi bi-headset',
          shortDesc: 'Our professional interior designers are ready to assist you anytime.',
          description: 'Get professional guidance from our expert interior designers anytime to create harmony, balance, and luxury aesthetics in your home.',
          points: [
            { title: 'Color & Material Matching', text: 'Expert advice on combining woods, leathers, and velvet color palettes.' },
            { title: 'Space Planning', text: 'Custom layout recommendations tailored specifically to your room dimensions.' },
            { title: 'Around-the-Clock Assistance', text: 'Live chat and telephone support available 24 hours a day, 7 days a week.' },
            { title: 'Post-Purchase Care Tips', text: 'Receive personalized maintenance guides to keep your furniture looking brand new.' }
          ]
        }
      }
    }
  },
  computed: {
    shopStore() {
      return useShopStore()
    },
    modalData() {
      return this.modalContents[this.activeModal] || {}
    }
  },
  methods: {
    openFeatureModal(type) {
      this.activeModal = type
    },
    addToCartQuick(product) {
      this.shopStore.addToCart({
        ...product,
        selectedColor: product.colors ? product.colors[0] : '#2c3e50',
        quantity: 1
      })
    },
    subscribeNewsletter() {
      if (this.emailInput) {
        this.subscribed = true
      }
    }
  }
}
</script>

<style scoped>
.hero-section {
  background: radial-gradient(circle at top right, #fbf7f4 0%, #ece4d8 100%);
  border-bottom-left-radius: 2.5rem;
  border-bottom-right-radius: 2.5rem;
}
.feature-box {
  transition: all 0.3s ease;
}
.feature-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.5rem 1.5rem rgba(44, 39, 36, 0.1) !important;
}
.cursor-pointer {
  cursor: pointer;
}
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
.gallery-card {
  cursor: pointer;
}
.gallery-img {
  transition: transform 0.5s ease;
}
.gallery-card:hover .gallery-img {
  transform: scale(1.08);
}
.gallery-overlay {
  background: linear-gradient(to top, rgba(44, 39, 36, 0.85) 0%, rgba(44, 39, 36, 0.2) 60%, transparent 100%);
  transition: opacity 0.3s ease;
}
</style>