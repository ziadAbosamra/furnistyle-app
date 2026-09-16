import { defineStore } from 'pinia'

export const useShopStore = defineStore('shop', {
  state: () => ({
    cart: JSON.parse(localStorage.getItem('furni_cart')) || [],
    favorites: JSON.parse(localStorage.getItem('furni_favorites')) || [],
    toast: { show: false, message: '' }
  }),
  getters: {
    cartTotalItems: (state) => state.cart.reduce((total, item) => total + item.quantity, 0),
    cartTotal: (state) => state.cart.reduce((total, item) => total + (item.price * item.quantity), 0),
    favoritesCount: (state) => state.favorites.length,
    isInWishlist: (state) => {
      return (productId) => state.favorites.some(item => item.id === productId)
    }
  },
  actions: {
    saveToStorage() {
      localStorage.setItem('furni_cart', JSON.stringify(this.cart))
      localStorage.setItem('furni_favorites', JSON.stringify(this.favorites))
    },
    showToast(message) {
      this.toast = { show: true, message }
      setTimeout(() => {
        this.toast.show = false
      }, 3000)
    },
    addToCart(product) {
      const existingIndex = this.cart.findIndex(
        item => item.id === product.id && item.selectedColor === product.selectedColor
      )
      if (existingIndex > -1) {
        this.cart[existingIndex].quantity += product.quantity || 1
      } else {
        this.cart.push({ ...product, quantity: product.quantity || 1 })
      }
      this.saveToStorage()
      this.showToast(`Added ${product.name} to cart!`)
    },
    removeFromCart(productId) {
      this.cart = this.cart.filter(item => item.id !== productId)
      this.saveToStorage()
    },
    toggleFavorite(product) {
      const index = this.favorites.findIndex(item => item.id === product.id)
      if (index > -1) {
        this.favorites.splice(index, 1)
        this.showToast(`Removed from favorites`)
      } else {
        this.favorites.push(product)
        this.showToast(`Added to favorites!`)
      }
      this.saveToStorage()
    },
    toggleWishlist(product) {
      this.toggleFavorite(product)
    }
  }
})