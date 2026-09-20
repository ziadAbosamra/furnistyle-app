<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
          
          <!-- Profile Header -->
          <div class="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
            <div class="d-flex align-items-center gap-3">
              <div 
                class="profile-avatar text-white rounded-circle d-flex align-items-center justify-content-center fs-2 fw-bold shadow-sm" 
                style="width: 80px; height: 80px; background-color: #2c2724; border: 3px solid #c5a880;"
              >
                {{ user.name ? user.name.charAt(0).toUpperCase() : 'A' }}
              </div>
              <div>
                <h3 class="fw-bold mb-1 text-dark">{{ user.name }}</h3>
                <p class="text-muted mb-0 small">{{ user.email }}</p>
              </div>
            </div>

            <button @click="handleLogout" class="btn btn-outline-danger rounded-pill px-4 fw-semibold">
              <i class="bi bi-box-arrow-right me-2"></i> Logout
            </button>
          </div>

          <!-- Account Stats Summary -->
          <div class="row g-3 my-2 text-center">
            <div class="col-4">
              <div class="p-3 bg-light rounded-4">
                <div class="fs-4 fw-bold text-dark">{{ shopStore.cart.length }}</div>
                <small class="text-muted">Cart Items</small>
              </div>
            </div>
            <div class="col-4">
              <div class="p-3 bg-light rounded-4">
                <div class="fs-4 fw-bold" style="color: #c5a880;">{{ shopStore.favorites.length }}</div>
                <small class="text-muted">Saved Items</small>
              </div>
            </div>
            <div class="col-4">
              <div class="p-3 bg-light rounded-4">
                <div class="fs-4 fw-bold text-dark">0</div>
                <small class="text-muted">Orders</small>
              </div>
            </div>
          </div>

          <hr class="my-4 text-muted opacity-25">

          <!-- Account Details Section Header -->
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="fw-bold mb-0 text-dark">Account Details</h5>
            <button 
              @click="toggleEdit" 
              class="btn btn-sm btn-link text-decoration-none fw-bold" 
              style="color: #c5a880;"
            >
              <i :class="isEditing ? 'bi bi-x-circle me-1' : 'bi bi-pencil me-1'"></i>
              {{ isEditing ? 'Cancel' : 'Edit Profile' }}
            </button>
          </div>

          <!-- Account Details Form -->
          <form @submit.prevent="saveProfile">
            <div class="mb-3">
              <label class="form-label small fw-bold text-secondary">Full Name</label>
              <input 
                type="text" 
                class="form-control rounded-pill py-2 px-3" 
                :class="isEditing ? 'bg-white border' : 'bg-light border-0'" 
                v-model="user.name" 
                :readonly="!isEditing" 
                required
              />
            </div>

            <div class="mb-4">
              <label class="form-label small fw-bold text-secondary">Email Address</label>
              <input 
                type="email" 
                class="form-control rounded-pill py-2 px-3" 
                :class="isEditing ? 'bg-white border' : 'bg-light border-0'" 
                v-model="user.email" 
                :readonly="!isEditing" 
                required
              />
            </div>

            <div v-if="isEditing" class="d-flex justify-content-end mb-3">
              <button type="submit" class="btn btn-dark rounded-pill px-4 fw-bold shadow-sm main-save-btn">
                <i class="bi bi-check-lg me-1"></i> Save Changes
              </button>
            </div>
          </form>

          <!-- Success Alert Notification -->
          <transition name="fade">
            <div v-if="showSuccess" class="alert alert-success border-0 shadow-sm rounded-4 py-2 px-3 small d-flex align-items-center gap-2 mb-0">
              <i class="bi bi-check-circle-fill fs-6"></i> Profile updated successfully!
            </div>
          </transition>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useShopStore } from '@/stores/shopStore'

const router = useRouter()
const shopStore = useShopStore()

const isEditing = ref(false)
const showSuccess = ref(false)

const user = reactive({
  name: 'Adham Abosamra',
  email: 'adhame764@gmail.com'
})

onMounted(() => {
  const savedUser = localStorage.getItem('furni_user')
  if (savedUser) {
    try {
      const parsed = JSON.parse(savedUser)
      user.name = parsed.name || user.name
      user.email = parsed.email || user.email
    } catch (e) {
      console.error('Error parsing user data:', e)
    }
  }
})

const toggleEdit = () => {
  isEditing.value = !isEditing.value
}

const saveProfile = () => {
  localStorage.setItem('furni_user', JSON.stringify({ name: user.name, email: user.email }))
  isEditing.value = false
  showSuccess.value = true
  setTimeout(() => {
    showSuccess.value = false
  }, 3000)
}

const handleLogout = () => {
  localStorage.removeItem('furni_user')
  router.push('/auth')
}
</script>

<style scoped>
.main-save-btn {
  background-color: #2c2724;
  border: none;
  transition: all 0.3s ease;
}

.main-save-btn:hover {
  background-color: #c5a880;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>