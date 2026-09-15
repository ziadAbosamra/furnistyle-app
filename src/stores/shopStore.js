import { defineStore } from 'pinia';

export const useShopStore = defineStore('shop', {
  state: () => ({
    // قراءة البيانات المبدئية من الـ LocalStorage لو موجودة
    cart: JSON.parse(localStorage.getItem('furni_cart')) || [],
    favorites: JSON.parse(localStorage.getItem('furni_favs')) || [],
  }),
  actions: {
    saveToStorage() {
      localStorage.setItem('furni_cart', JSON.stringify(this.cart));
      localStorage.setItem('furni_favs', JSON.stringify(this.favorites));
    },
    addToCart(product, quantity = 1, selectedColor = '') {
      const existingItem = this.cart.find(item => item.id === product.id && item.color === selectedColor);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.cart.push({ ...product, quantity, color: selectedColor });
      }
      this.saveToStorage();
    },
    removeFromCart(productId) {
      this.cart = this.cart.filter(item => item.id !== productId);
      this.saveToStorage();
    },
    toggleFavorite(product) {
      const index = this.favorites.findIndex(item => item.id === product.id);
      if (index > -1) {
        this.favorites.splice(index, 1);
      } else {
        this.favorites.push(product);
      }
      this.saveToStorage();
    }
  },
  getters: {
    cartTotal: (state) => state.cart.reduce((total, item) => total + (item.price * item.quantity), 0),
    cartCount: (state) => state.cart.reduce((total, item) => total + item.quantity, 0),
    isFavorite: (state) => (productId) => state.favorites.some(item => item.id === productId),
  }
});