<template>
  <div class="container py-5">
    <h2 class="fw-bold mb-4" style="color: var(--text-main);">
      Shopping Cart <i class="bi bi-cart3 ms-2"></i>
    </h2>

    <div v-if="shopStore.cart.length > 0" class="row g-4">
      <!-- Cart Items List -->
      <div class="col-lg-8">
        <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div class="table-responsive">
            <table class="table align-middle mb-0">
              <thead class="table-light">
                <tr>
                  <th class="ps-4">Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th class="pe-4 text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in shopStore.cart" :key="item.lineId">
                  <td class="ps-4">
                    <div class="d-flex align-items-center gap-3">
                      <img 
                        :src="item.image" 
                        :alt="item.name" 
                        class="rounded-3 object-fit-cover shadow-sm" 
                        style="width: 65px; height: 65px;" 
                      />
                      <div>
                        <h6 class="mb-1 fw-bold text-dark">{{ item.name }}</h6>
                        <small v-if="item.colorName" class="text-muted d-flex align-items-center gap-1">
                          <span class="swatch-dot" :style="{ backgroundColor: item.hex }"></span>
                          {{ item.colorName }}
                        </small>
                      </div>
                    </div>
                  </td>
                  <td class="fw-semibold">${{ item.price.toFixed(2) }}</td>
                  <td>
                    <div class="d-flex align-items-center gap-2" style="max-width: 120px;">
                      <button 
                        @click="shopStore.updateQuantity(item.lineId, -1)" 
                        class="btn btn-outline-secondary btn-sm rounded-circle qty-btn"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span class="fw-bold px-2">{{ item.quantity }}</span>
                      <button 
                        @click="shopStore.updateQuantity(item.lineId, 1)" 
                        class="btn btn-outline-secondary btn-sm rounded-circle qty-btn"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td class="fw-bold text-success">
                    ${{ (item.price * item.quantity).toFixed(2) }}
                  </td>
                  <td class="pe-4 text-end">
                    <button 
                      @click="shopStore.removeFromCart(item.lineId)" 
                      class="btn btn-light text-danger btn-sm rounded-circle p-2 shadow-sm" 
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <i class="bi bi-trash fs-6"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Order Summary Card -->
      <div class="col-lg-4">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
          <h5 class="fw-bold mb-3">Order Summary</h5>
          
          <div class="d-flex justify-content-between mb-2 text-secondary">
            <span>Subtotal</span>
            <span class="fw-bold text-dark">${{ shopStore.formattedCartTotal }}</span>
          </div>
          
          <div class="d-flex justify-content-between mb-3 text-secondary">
            <span>Shipping</span>
            <span class="fw-bold text-success">Free</span>
          </div>
          
          <hr class="my-3" />
          
          <div class="d-flex justify-content-between fs-5 fw-bold mb-4">
            <span>Total</span>
            <span class="text-dark">${{ shopStore.formattedCartTotal }}</span>
          </div>
          
          <button 
            @click="handleCheckout" 
            class="btn btn-dark w-100 py-3 rounded-3 fw-bold shadow-sm checkout-btn"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>

    <!-- Empty Cart View -->
    <div v-else class="text-center py-5">
      <div class="empty-icon-bg mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle">
        <i class="bi bi-cart-x text-muted fs-1"></i>
      </div>
      <h4 class="mt-3 fw-bold" style="color: var(--text-main);">Your Cart is Empty</h4>
      <p class="text-muted">Looks like you haven't added anything to your cart yet.</p>
      <router-link to="/shop" class="btn btn-dark mt-2 rounded-pill px-4 py-2 fw-semibold">
        Start Shopping
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useShopStore } from '@/stores/shopStore'

const shopStore = useShopStore()

const handleCheckout = () => {
  alert('Thank you for your order! Your purchase was successful.')
  shopStore.clearCart()
}
</script>

<style scoped>
.swatch-dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.qty-btn {
  width: 28px;
  height: 28px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.checkout-btn {
  background-color: #2c2724;
  border: none;
  transition: all 0.3s ease;
}

.checkout-btn:hover {
  background-color: #c5a880;
  transform: translateY(-2px);
}

.empty-icon-bg {
  width: 90px;
  height: 90px;
  background-color: #f8f9fa;
}
</style>