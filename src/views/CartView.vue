<template>
  <div class="container py-5">
    <h2 class="fw-bold mb-4">Shopping Cart 🛒</h2>

    <div v-if="shopStore.cart.length > 0" class="row g-4">
      <!-- Cart Items Table -->
      <div class="col-lg-8">
        <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div class="table-responsive">
            <table class="table align-middle mb-0">
              <thead class="table-light">
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in shopStore.cart" :key="item.id + item.color">
                  <td>
                    <div class="d-flex align-items-center gap-3">
                      <img 
                        :src="item.images ? item.images[0] : item.image" 
                        :alt="item.name" 
                        class="rounded-3 object-fit-cover" 
                        style="width: 60px; height: 60px;"
                      >
                      <div>
                        <h6 class="mb-0 fw-bold">{{ item.name }}</h6>
                        <small v-if="item.color" class="text-muted">Color: {{ item.color }}</small>
                      </div>
                    </div>
                  </td>
                  <td class="fw-semibold">${{ item.price }}</td>
                  <td>
                    <div class="d-flex align-items-center gap-2" style="max-width: 120px;">
                      <button 
                        @click="item.quantity > 1 ? item.quantity-- : null; shopStore.saveToStorage()" 
                        class="btn btn-outline-secondary btn-sm"
                      >-</button>
                      <span class="fw-bold px-2">{{ item.quantity }}</span>
                      <button 
                        @click="item.quantity++; shopStore.saveToStorage()" 
                        class="btn btn-outline-secondary btn-sm"
                      >+</button>
                    </div>
                  </td>
                  <td class="fw-bold text-success">${{ item.price * item.quantity }}</td>
                  <td>
                    <button 
                      @click="shopStore.removeFromCart(item.id)" 
                      class="btn btn-light text-danger btn-sm rounded-circle"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="col-lg-4">
        <div class="card border-0 shadow-sm rounded-4 p-4">
          <h5 class="fw-bold mb-3">Order Summary</h5>
          <div class="d-flex justify-content-between mb-2">
            <span class="text-muted">Subtotal</span>
            <span class="fw-bold">${{ shopStore.cartTotal }}</span>
          </div>
          <div class="d-flex justify-content-between mb-3">
            <span class="text-muted">Shipping</span>
            <span class="text-success fw-bold">Free</span>
          </div>
          <hr />
          <div class="d-flex justify-content-between fs-5 fw-bold mb-4">
            <span>Total</span>
            <span class="text-primary">${{ shopStore.cartTotal }}</span>
          </div>
          <button class="btn btn-primary w-100 py-2 rounded-3 fw-bold">Proceed to Checkout</button>
        </div>
      </div>
    </div>

    <!-- Empty Cart -->
    <div v-else class="text-center py-5">
      <i class="bi bi-cart-x text-muted" style="font-size: 4rem;"></i>
      <h4 class="mt-3 fw-bold">Your Cart is Empty</h4>
      <p class="text-muted">Looks like you haven't added anything to your cart yet.</p>
      <router-link to="/product/1" class="btn btn-primary mt-2 rounded-3 px-4">Start Shopping</router-link>
    </div>
  </div>
</template>

<script setup>
import { useShopStore } from '@/stores/shopStore'

const shopStore = useShopStore()
</script>