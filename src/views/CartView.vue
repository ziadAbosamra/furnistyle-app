<template>
  <div class="cart-view min-vh-100 py-5 bg-light">
    <div class="container py-4">
      <nav class="mb-4">
        <router-link to="/shop" class="text-decoration-none text-muted fw-semibold">
          <i class="bi bi-arrow-left me-2"></i> Continue Shopping
        </router-link>
      </nav>

      <h1 class="fw-bold mb-4 text-dark">Your Cart</h1>

      <div v-if="cart.length === 0" class="text-center py-5 bg-white rounded-4 shadow-sm">
        <i class="bi bi-bag-x fs-1 text-muted mb-3 d-block"></i>
        <h4 class="text-muted mb-3">Your cart is empty</h4>
        <router-link to="/shop" class="btn btn-dark rounded-pill px-4">Browse Products</router-link>
      </div>

      <div v-else class="row g-4">
        <div class="col-lg-8">
          <div class="bg-white rounded-4 shadow-sm p-3 p-lg-4">
            <div
              v-for="item in cart"
              :key="item.id + '-' + item.selectedColor"
              class="d-flex align-items-center gap-3 py-3 border-bottom">
              <img :src="item.image" :alt="item.name" class="rounded-3 flex-shrink-0" style="width: 90px; height: 90px; object-fit: cover;">

              <div class="flex-grow-1">
                <h6 class="fw-bold mb-1 text-dark">{{ item.name }}</h6>
                <div class="d-flex align-items-center gap-2 small text-muted mb-2">
                  <span>Color:</span>
                  <span class="fw-semibold text-dark">{{ item.selectedColor }}</span>
                </div>
                <div class="fw-bold" style="color: #c5a880;">${{ item.price }}</div>
              </div>

              <div class="input-group input-group-sm" style="width: 110px;">
                <button class="btn btn-outline-secondary" @click="decrease(item)">-</button>
                <input type="text" class="form-control text-center fw-bold" :value="item.quantity" readonly>
                <button class="btn btn-outline-secondary" @click="increase(item)">+</button>
              </div>

              <div class="fw-bold text-dark text-end" style="width: 80px;">
                ${{ (item.price * item.quantity).toFixed(2) }}
              </div>

              <button class="btn btn-link text-danger p-0 ms-2" @click="remove(item)" title="Remove">
                <i class="bi bi-trash fs-5"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="bg-white rounded-4 shadow-sm p-4">
            <h5 class="fw-bold mb-3 text-dark">Order Summary</h5>
            <div class="d-flex justify-content-between mb-2 text-muted">
              <span>Subtotal ({{ shopStore.cartCount }} items)</span>
              <span>${{ shopStore.cartTotal.toFixed(2) }}</span>
            </div>
            <div class="d-flex justify-content-between mb-3 text-muted">
              <span>Shipping</span>
              <span>{{ shopStore.cartTotal > 300 ? 'Free' : '$25.00' }}</span>
            </div>
            <hr>
            <div class="d-flex justify-content-between fw-bold fs-5 mb-4 text-dark">
              <span>Total</span>
              <span>${{ finalTotal.toFixed(2) }}</span>
            </div>
            <button class="btn btn-lg w-100 rounded-pill fw-semibold text-white" style="background-color: #2c2724;">
              Proceed to Checkout
            </button>
            <button class="btn btn-link w-100 text-muted mt-2" @click="shopStore.clearCart()">
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useShopStore } from '@/stores/shopStore'

export default {
  name: 'CartView',
  setup() {
    const shopStore = useShopStore()
    return { shopStore }
  },
  computed: {
    cart() {
      return this.shopStore.cart
    },
    finalTotal() {
      const shipping = this.shopStore.cartTotal > 300 ? 0 : 25
      return this.shopStore.cartTotal + shipping
    }
  },
  methods: {
    increase(item) {
      this.shopStore.updateCartQuantity(item.id, item.selectedColor, item.quantity + 1)
    },
    decrease(item) {
      if (item.quantity > 1) {
        this.shopStore.updateCartQuantity(item.id, item.selectedColor, item.quantity - 1)
      }
    },
    remove(item) {
      this.shopStore.removeFromCart(item.id, item.selectedColor)
    }
  }
}
</script>