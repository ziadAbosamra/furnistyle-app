import { defineStore } from 'pinia'

export const useShopStore = defineStore('shop', {
  state: () => ({
    products: [
      { 
        id: 1, 
        name: 'Minimalist Modern Sofa', 
        category: 'Living Room', 
        description: 'Comfortable 3-seater sofa with premium durable fabric and ergonomic support designed for modern homes.',
        material: 'Solid pine wood frame, high-density foam cushions, premium linen fabric',
        dimensions: '210 × 90 × 85 cm (W × D × H)',
        rating: 4.6,
        reviewsCount: 128,
        stock: 14,
        warranty: '2-year manufacturer warranty',
        price: 499, 
        image: 'https://images.unsplash.com/photo-1616693153250-bb03055788eb?w=800&auto=format&fit=crop&q=80',
        colors: [
          { name: 'Navy Blue', hex: '#2c3e50' },
          { name: 'Purple Velvet', hex: '#8e44ad' },
          { name: 'Orange Oak', hex: '#d35400' }
        ]
      },
      { 
        id: 2, 
        name: 'Scandinavian Wooden Dining Table', 
        category: 'Dining', 
        description: 'Solid oak wood table designed elegantly for warm family gatherings and long-lasting durability.',
        material: 'Solid oak wood, matte lacquer finish',
        dimensions: '160 × 90 × 75 cm (W × D × H)',
        rating: 4.8,
        reviewsCount: 76,
        stock: 9,
        warranty: '3-year manufacturer warranty',
        price: 350, 
        image: 'https://images.unsplash.com/photo-1623654816619-dd66988b63c2?w=800&auto=format&fit=crop&q=80',
        colors: [
          { name: 'Orange Oak', hex: '#d35400' },
          { name: 'Gray Stone', hex: '#7f8c8d' }
        ]
      },
      { 
        id: 3, 
        name: 'Ergonomic Executive Office Chair', 
        category: 'Office', 
        description: 'Sleek professional chair built for maximum comfort and posture support during long work sessions.',
        material: 'Mesh backrest, memory foam seat, aluminum base',
        dimensions: '65 × 65 × 115-125 cm (adjustable height)',
        rating: 4.4,
        reviewsCount: 203,
        stock: 22,
        warranty: '5-year manufacturer warranty',
        price: 150, 
        image: 'https://images.unsplash.com/photo-1461969539980-32974612df40?w=800&auto=format&fit=crop&q=80',
        colors: [
          { name: 'Teal Green', hex: '#16a085' },
          { name: 'Dark Navy', hex: '#2c3e50' }
        ]
      }
    ],
    favorites: [],
    cart: [],
    currentUser: null
  }),
  getters: {
    cartCount: (state) => state.cart.reduce((sum, item) => sum + item.quantity, 0),
    cartTotal: (state) => state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  },
  actions: {
    toggleFavorite(product) {
      if (!this.favorites) this.favorites = []
      const index = this.favorites.findIndex(item => item.id === product.id)
      if (index > -1) {
        this.favorites.splice(index, 1)
      } else {
        this.favorites.push(product)
      }
    },
    isInWishlist(productId) {
      return this.favorites ? this.favorites.some(item => item.id === productId) : false
    },
    addToCart(cartItem) {
      const existingIndex = this.cart.findIndex(
        item => item.id === cartItem.id && item.selectedColor === cartItem.selectedColor
      )
      if (existingIndex > -1) {
        this.cart[existingIndex].quantity += cartItem.quantity
      } else {
        this.cart.push(cartItem)
      }
    },
    removeFromCart(id, selectedColor) {
      this.cart = this.cart.filter(
        item => !(item.id === id && item.selectedColor === selectedColor)
      )
    },
    updateCartQuantity(id, selectedColor, quantity) {
      const item = this.cart.find(
        i => i.id === id && i.selectedColor === selectedColor
      )
      if (item) {
        item.quantity = Math.max(1, quantity)
      }
    },
    clearCart() {
      this.cart = []
    },
    login(username) {
      this.currentUser = username
    },
    logout() {
      this.currentUser = null
    }
  }
})