<template>
  <div class="container py-5">
    <h2 class="fw-bold mb-4" style="color: var(--text-main, #2c2724);">
      Shopping Cart <i class="bi bi-cart3 ms-2"></i>
    </h2>

    <!-- جدول المنتجات في حالة وجود عناصر -->
    <div v-if="validCart.length > 0" class="row g-4">
      <!-- قائمة المنتجات -->
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
                <tr v-for="(item, index) in validCart" :key="item?.lineId || index">
                  <td class="ps-4">
                    <div class="d-flex align-items-center gap-3">
                      <img 
                        :src="item?.image || '/placeholder.jpg'" 
                        :alt="item?.name || 'Product'" 
                        class="rounded-3 object-fit-cover shadow-sm" 
                        style="width: 65px; height: 65px;" 
                      />
                      <div>
                        <h6 class="mb-1 fw-bold text-dark">{{ item?.name || 'Product' }}</h6>
                        <small v-if="item?.colorName" class="text-muted d-flex align-items-center gap-1">
                          <span class="swatch-dot" :style="{ backgroundColor: item?.hex || '#ccc' }"></span>
                          {{ item.colorName }}
                        </small>
                      </div>
                    </div>
                  </td>
                  <td class="fw-semibold">${{ getItemPrice(item).toFixed(2) }}</td>
                  <td>
                    <div class="d-flex align-items-center gap-2" style="max-width: 120px;">
                      <button 
                        @click="updateQty(item, -1)" 
                        class="btn btn-outline-secondary btn-sm rounded-circle qty-btn"
                        type="button"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span class="fw-bold px-2">{{ item?.quantity || 1 }}</span>
                      <button 
                        @click="updateQty(item, 1)" 
                        class="btn btn-outline-secondary btn-sm rounded-circle qty-btn"
                        type="button"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td class="fw-bold text-success">
                    ${{ (getItemPrice(item) * (item?.quantity || 1)).toFixed(2) }}
                  </td>
                  <td class="pe-4 text-end">
                    <button 
                      @click="removeItem(item)" 
                      class="btn btn-light text-danger btn-sm rounded-circle p-2 shadow-sm" 
                      title="Remove item"
                      type="button"
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

      <!-- كارت ملخص الطلب -->
      <div class="col-lg-4">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
          <h5 class="fw-bold mb-3">Order Summary</h5>
          
          <div class="d-flex justify-content-between mb-2 text-secondary">
            <span>Subtotal</span>
            <span class="fw-bold text-dark">${{ totalAmount }}</span>
          </div>
          
          <div class="d-flex justify-content-between mb-3 text-secondary">
            <span>Shipping</span>
            <span class="fw-bold text-success">Free</span>
          </div>
          
          <hr class="my-3" />
          
          <div class="d-flex justify-content-between fs-5 fw-bold mb-4">
            <span>Total</span>
            <span class="text-dark">${{ totalAmount }}</span>
          </div>
          
          <button 
            @click="handleCheckout" 
            class="btn btn-dark w-100 py-3 rounded-3 fw-bold shadow-sm checkout-btn"
            type="button"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>

    <!-- واجهة السلة الفارغة -->
    <div v-else class="text-center py-5">
      <div class="empty-icon-bg mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle">
        <i class="bi bi-cart-x text-muted fs-1"></i>
      </div>
      <h4 class="mt-3 fw-bold" style="color: var(--text-main, #2c2724);">Your Cart is Empty</h4>
      <p class="text-muted">Looks like you haven't added anything to your cart yet.</p>
      <router-link to="/shop" class="btn btn-dark mt-2 rounded-pill px-4 py-2 fw-semibold">
        Start Shopping
      </router-link>
    </div>

    <!-- 🧾 مودال الفاتورة المحسّن بالكامل -->
    <div v-if="showReceipt" class="modal-backdrop-custom d-flex align-items-center justify-content-center p-3">
      <div class="receipt-card bg-white rounded-4 shadow-lg p-4 position-relative w-100 d-flex flex-column" style="max-width: 520px; max-height: 88vh;">
        
        <!-- Header (ثابت في الأعلى) -->
        <div class="text-center border-bottom pb-3 mb-3 flex-shrink-0">
          <div class="success-icon-wrap mx-auto mb-2">
            <i class="bi bi-check-lg"></i>
          </div>
          <h4 class="fw-bold text-dark mb-1">Payment Successful!</h4>
          <p class="text-muted small mb-0">Thank you for shopping with <strong>FurniStyle</strong></p>
        </div>

        <!-- Scrollable Content (الجزء القابل للتمرير) -->
        <div class="receipt-body overflow-y-auto pe-1 flex-grow-1">
          <div class="row g-2 mb-3 p-3 bg-light rounded-3 text-start small">
            <div class="col-6">
              <span class="text-muted d-block">Order ID:</span>
              <strong class="text-dark">#FS-{{ receiptData.orderId }}</strong>
            </div>
            <div class="col-6 text-end">
              <span class="text-muted d-block">Date:</span>
              <strong class="text-dark">{{ receiptData.date }}</strong>
            </div>
            <div class="col-6 mt-2">
              <span class="text-muted d-block">Payment Method:</span>
              <strong class="text-dark">Credit Card (Paid)</strong>
            </div>
            <div class="col-6 mt-2 text-end">
              <span class="text-muted d-block">Status:</span>
              <span class="badge bg-success-subtle text-success border border-success-subtle rounded-pill">Confirmed</span>
            </div>
          </div>

          <h6 class="fw-bold text-dark mb-2 text-start small">Purchased Items</h6>
          <div class="receipt-items-list mb-3">
            <div 
              v-for="(item, idx) in receiptData.items" 
              :key="idx"
              class="d-flex align-items-center justify-content-between py-2 border-bottom"
            >
              <div class="d-flex align-items-center gap-3">
                <img 
                  :src="item?.image || '/placeholder.jpg'" 
                  class="rounded-2 object-fit-cover" 
                  style="width: 40px; height: 40px;" 
                />
                <div class="text-start">
                  <div class="fw-semibold text-dark small">{{ item?.name || 'Product' }}</div>
                  <small class="text-muted" style="font-size: 0.75rem;">
                    {{ item?.quantity || 1 }}x — {{ item?.colorName || 'Standard' }}
                  </small>
                </div>
              </div>
              <div class="fw-bold text-dark small">
                ${{ (getItemPrice(item) * (item?.quantity || 1)).toFixed(2) }}
              </div>
            </div>
          </div>

          <div class="border-top pt-2 mb-2">
            <div class="d-flex justify-content-between text-secondary small mb-1">
              <span>Subtotal</span>
              <span>${{ receiptData.total }}</span>
            </div>
            <div class="d-flex justify-content-between text-secondary small mb-1">
              <span>Shipping</span>
              <span class="text-success">Free</span>
            </div>
            <div class="d-flex justify-content-between fs-6 fw-bold text-dark pt-2 border-top">
              <span>Total Paid</span>
              <span style="color: #2c2724;">${{ receiptData.total }}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons (ثابتة بالأسفل دائماً) -->
        <div class="pt-3 border-top d-flex gap-2 flex-shrink-0 mt-auto">
          <button @click="printReceipt" class="btn btn-outline-dark rounded-pill flex-grow-1 fw-bold btn-sm py-2" type="button">
            <i class="bi bi-printer me-1"></i> Print Receipt
          </button>
          <button @click="closeReceipt" class="btn btn-dark rounded-pill flex-grow-1 fw-bold btn-sm py-2" style="background-color: #2c2724;" type="button">
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useShopStore } from '@/stores/shopStore'

const router = useRouter()
const shopStore = useShopStore()

const showReceipt = ref(false)
const receiptData = ref({
  orderId: '',
  date: '',
  items: [],
  total: '0.00'
})

// فلترة صحيحة للسلة للوقاية من أخطاء undefined
const validCart = computed(() => {
  if (!shopStore?.cart || !Array.isArray(shopStore.cart)) return []
  return shopStore.cart.filter(item => item && typeof item === 'object')
})

// استخراج السعر بأمان
function getItemPrice(item) {
  if (!item) return 0
  const price = item.price ?? item.product?.price ?? 0
  return Number(price) || 0
}

// حساب المجموع الكلي
const totalAmount = computed(() => {
  if (shopStore?.formattedCartTotal) {
    return shopStore.formattedCartTotal
  }
  const total = validCart.value.reduce((sum, item) => sum + (getItemPrice(item) * (item?.quantity || 1)), 0)
  return total.toFixed(2)
})

function updateQty(item, change) {
  const lineId = item?.lineId || item?.id
  if (lineId !== undefined && typeof shopStore?.updateQuantity === 'function') {
    shopStore.updateQuantity(lineId, change)
  }
}

function removeItem(item) {
  const lineId = item?.lineId || item?.id
  if (lineId !== undefined && typeof shopStore?.removeFromCart === 'function') {
    shopStore.removeFromCart(lineId)
  }
}

const handleCheckout = () => {
  if (!validCart.value.length) return

  receiptData.value = {
    orderId: Math.floor(100000 + Math.random() * 900000),
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    items: JSON.parse(JSON.stringify(validCart.value)),
    total: totalAmount.value
  }

  showReceipt.value = true

  if (typeof shopStore?.clearCart === 'function') {
    shopStore.clearCart()
  }
}

const printReceipt = () => {
  window.print()
}

const closeReceipt = () => {
  showReceipt.value = false
  router.push('/shop')
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

/* Modal BackDrop & Layout Fixes */
.modal-backdrop-custom {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(5px);
  z-index: 1050;
  animation: fadeIn 0.25s ease-out;
}

.receipt-card {
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.success-icon-wrap {
  width: 52px;
  height: 52px;
  background-color: #d1e7dd;
  color: #0f5132;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
}

/* Custom Scrollbar for Modal Body */
.receipt-body::-webkit-scrollbar {
  width: 5px;
}
.receipt-body::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@media print {
  body * {
    visibility: hidden;
  }
  .receipt-card, .receipt-card * {
    visibility: visible;
  }
  .receipt-card {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    max-height: none !important;
    box-shadow: none !important;
  }
  .modal-backdrop-custom {
    background: none !important;
  }
  button {
    display: none !important;
  }
}
</style>