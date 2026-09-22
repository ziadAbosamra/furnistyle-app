import { defineStore } from 'pinia'
import { fetchProducts, fetchCategories } from '@/api/productsApi'
import { defaultImage } from '@/data/products'

const CART_KEY = 'furnistyle_cart'
const FAVORITES_KEY = 'furnistyle_favorites'
const USER_KEY = 'furni_user'
const USERS_KEY = 'furnistyle_users'

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err)
    return fallback
  }
}

export const useShopStore = defineStore('shop', {
  state: () => ({
    currentUser: readStorage(USER_KEY, null),
    products: [],
    categories: [],
    productsLoading: false,
    productsError: null,
    cart: readStorage(CART_KEY, []),
    favorites: readStorage(FAVORITES_KEY, [])
  }),

  getters: {
    cartTotal: (state) =>
      state.cart.reduce((sum, item) => sum + (Number(item.price) || 0) * item.quantity, 0),

    formattedCartTotal() {
      return this.cartTotal.toFixed(2)
    },

    cartCount: (state) => 
      state.cart.reduce((sum, item) => sum + item.quantity, 0),

    isFavorite: (state) => (productId) =>
      state.favorites.some((p) => Number(p.id) === Number(productId))
  },

  actions: {
    login(userData) {
      this.currentUser = userData
      try {
        localStorage.setItem(USER_KEY, JSON.stringify(userData))
      } catch (err) {
        console.error('Error saving user to localStorage:', err)
      }
    },

    logout() {
      this.currentUser = null
      try {
        localStorage.removeItem(USER_KEY)
      } catch (err) {
        console.error('Error removing user from localStorage:', err)
      }
    },

    registerUser({ name, email, password }) {
      const users = readStorage(USERS_KEY, [])

      const alreadyExists = users.some(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      )
      if (alreadyExists) {
        throw new Error('يوجد حساب مسجل بهذا البريد الإلكتروني بالفعل')
      }

      const newUser = { name, email, password }
      users.push(newUser)

      try {
        localStorage.setItem(USERS_KEY, JSON.stringify(users))
      } catch (err) {
        console.error('Error saving users list to localStorage:', err)
      }

      // تسجيل الدخول تلقائيًا بعد إنشاء الحساب
      this.login({ name, email })
    },

    authenticateUser({ email, password }) {
      const users = readStorage(USERS_KEY, [])

      const found = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      )

      if (!found) {
        throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة')
      }

      this.login({ name: found.name, email: found.email })
    },

    async loadCatalog(force = false) {
      if (this.products.length && !force) return
      
      this.productsLoading = true
      this.productsError = null
      try {
        const [products, categories] = await Promise.all([
          fetchProducts(),
          fetchCategories()
        ])
        this.products = products || []
        this.categories = categories || []
      } catch (err) {
        this.productsError = 'Could not load products. Please try again.'
        console.error('loadCatalog error:', err)
      } finally {
        this.productsLoading = false
      }
    },

    getProductById(id) {
      return this.products.find((p) => Number(p.id) === Number(id))
    },

    addToCart(product, variant = null, quantity = 1) {
      if (!product) return

      const chosenVariant = variant ?? product.variants?.[0]
      const lineId = `${product.id}::${chosenVariant?.hex ?? 'default'}`
      const existing = this.cart.find((item) => item.lineId === lineId)

      if (existing) {
        existing.quantity += quantity
      } else {
        this.cart.push({
          lineId,
          id: product.id,
          name: product.name,
          price: product.price,
          image: chosenVariant?.image ?? defaultImage(product),
          colorName: chosenVariant?.colorName ?? null,
          hex: chosenVariant?.hex ?? null,
          quantity
        })
      }
      this.saveCart()
    },

    updateQuantity(lineId, delta) {
      const item = this.cart.find((i) => i.lineId === lineId)
      if (!item) return
      
      item.quantity = Math.max(1, item.quantity + delta)
      this.saveCart()
    },

    setQuantity(lineId, newQuantity) {
      const item = this.cart.find((i) => i.lineId === lineId)
      if (!item) return

      const qty = parseInt(newQuantity, 10)
      item.quantity = isNaN(qty) || qty < 1 ? 1 : qty
      this.saveCart()
    },

    removeFromCart(lineId) {
      this.cart = this.cart.filter((item) => item.lineId !== lineId)
      this.saveCart()
    },

    clearCart() {
      this.cart = []
      this.saveCart()
    },

    saveCart() {
      try {
        localStorage.setItem(CART_KEY, JSON.stringify(this.cart))
      } catch (err) {
        console.error('Error saving cart to localStorage:', err)
      }
    },

    toggleFavorite(productOrId) {
      if (!productOrId) return

      const targetId = typeof productOrId === 'object' ? productOrId.id : Number(productOrId)
      const idx = this.favorites.findIndex((p) => Number(p.id) === Number(targetId))

      if (idx >= 0) {
        this.favorites.splice(idx, 1)
      } else {
        const productToAdd = typeof productOrId === 'object' ? productOrId : this.getProductById(targetId)
        if (productToAdd) {
          this.favorites.push(productToAdd)
        }
      }
      this.saveFavorites()
    },

    clearFavorites() {
      this.favorites = []
      this.saveFavorites()
    },

    saveFavorites() {
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(this.favorites))
      } catch (err) {
        console.error('Error saving favorites to localStorage:', err)
      }
    }
  }
})