<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
          <div class="d-flex align-items-center mb-4">
            <div class="profile-avatar bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fs-2 fw-bold me-4" style="width: 80px; height: 80px;">
              {{ user.name ? user.name.charAt(0).toUpperCase() : 'A' }}
            </div>
            <div>
              <h3 class="fw-bold mb-1" style="color: #2c2724;">{{ user.name }}</h3>
              <p class="text-muted mb-0">{{ user.email }}</p>
            </div>
          </div>

          <hr class="my-4 text-muted opacity-25">

          <h5 class="fw-bold mb-3" style="color: #2c2724;">Account Details</h5>
          <div class="mb-3">
            <label class="form-label small fw-bold text-secondary">Full Name</label>
            <input type="text" class="form-control rounded-pill bg-light border-0 py-2 px-3" v-model="user.name" readonly />
          </div>
          <div class="mb-4">
            <label class="form-label small fw-bold text-secondary">Email Address</label>
            <input type="email" class="form-control rounded-pill bg-light border-0 py-2 px-3" v-model="user.email" readonly />
          </div>

          <button @click="handleLogout" class="btn btn-outline-danger rounded-pill px-4 fw-semibold">
            <i class="bi bi-box-arrow-right me-2"></i> Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = reactive({
  name: 'Adham Abosamra',
  email: 'adhame764@gmail.com'
})

onMounted(() => {
  const savedUser = localStorage.getItem('furni_user')
  if (savedUser) {
    const parsed = JSON.parse(savedUser)
    user.name = parsed.name
    user.email = parsed.email
  }
})

const handleLogout = () => {
  localStorage.removeItem('furni_user')
  router.push('/auth')
}
</script>