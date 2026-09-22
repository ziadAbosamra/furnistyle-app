<template>
  <div class="auth-page min-vh-100 d-flex align-items-center justify-content-center py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
          <div class="card border-0 shadow-lg rounded-4 p-4 p-md-5 bg-white position-relative overflow-hidden">
            
            <!-- Modern Furniture Glowing Brand Header -->
            <div class="text-center mb-4 pb-2">
              <div class="logo-badge mx-auto mb-3 d-flex align-items-center justify-content-center shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c5a880" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"></path>
                  <path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z"></path>
                  <path d="M5 18v2"></path>
                  <path d="M19 18v2"></path>
                </svg>
              </div>
              <h2 class="fw-bold tracking-tight mb-1 brand-title">
                Furni<span class="brand-accent">Style</span>
              </h2>
              <p class="text-muted small tracking-wide">Elevate your living experience</p>
            </div>

            <!-- Tab Switcher -->
            <ul class="nav nav-pills nav-fill mb-4 p-1 rounded-pill bg-light" role="tablist">
              <li class="nav-item">
                <button 
                  type="button"
                  class="nav-link rounded-pill fw-semibold py-2 transition-all" 
                  :class="{ 'active bg-dark text-white shadow-sm': isLogin, 'text-muted': !isLogin }"
                  @click="switchTab(true)"
                >
                  Login
                </button>
              </li>
              <li class="nav-item">
                <button 
                  type="button"
                  class="nav-link rounded-pill fw-semibold py-2 transition-all" 
                  :class="{ 'active bg-dark text-white shadow-sm': !isLogin, 'text-muted': isLogin }"
                  @click="switchTab(false)"
                >
                  Register
                </button>
              </li>
            </ul>

            <!-- Error Message -->
            <div v-if="errorMsg" class="alert alert-danger rounded-pill text-center small py-2 mb-3">
              {{ errorMsg }}
            </div>

            <!-- Form -->
            <form @submit.prevent="handleSubmit">
              <div v-if="!isLogin" class="mb-3">
                <label class="form-label small fw-bold text-secondary">Full Name</label>
                <input 
                  v-model.trim="name" 
                  type="text" 
                  class="form-control rounded-pill py-2 px-3 border-light bg-light" 
                  placeholder="Type your name" 
                  required 
                />
              </div>

              <div class="mb-3">
                <label class="form-label small fw-bold text-secondary">Email Address</label>
                <input 
                  v-model.trim="email" 
                  type="email" 
                  class="form-control rounded-pill py-2 px-3 border-light bg-light" 
                  placeholder="Type your email" 
                  required 
                />
              </div>

              <div class="mb-4">
                <label class="form-label small fw-bold text-secondary">Password</label>
                <input 
                  v-model="password" 
                  type="password" 
                  class="form-control rounded-pill py-2 px-3 border-light bg-light" 
                  placeholder="••••••••" 
                  required 
                />
              </div>

              <button type="submit" class="btn btn-dark w-100 rounded-pill py-2 fw-bold shadow-sm mb-3 auth-btn">
                {{ isLogin ? 'Sign In' : 'Create Account' }}
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useShopStore } from '@/stores/shopStore'

const router = useRouter()
const shopStore = useShopStore()

const isLogin = ref(true)
const name = ref('')
const email = ref('')
const password = ref('')
const errorMsg = ref('')

// عند التبديل بين Login و Register، نمسح أي رسالة خطأ قديمة
const switchTab = (loginMode) => {
  isLogin.value = loginMode
  errorMsg.value = ''
}

const handleSubmit = () => {
  errorMsg.value = ''

  try {
    if (isLogin.value) {
      // تسجيل الدخول: نقارن الإيميل والباسورد مع قائمة المستخدمين المخزنة
      shopStore.authenticateUser({ email: email.value, password: password.value })
    } else {
      // إنشاء حساب جديد: نتأكد إن الإيميل مش مستخدم قبل كده ونضيفه للقائمة
      shopStore.registerUser({ name: name.value, email: email.value, password: password.value })
    }

    // التوجيه للرئيسية بعد نجاح العملية
    router.push('/')
  } catch (err) {
    errorMsg.value = err.message
  }
}
</script>

<style scoped>
.auth-page {
  background: radial-gradient(circle at top right, #fbf7f4 0%, #f4efe6 100%);
}
.logo-badge {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #2c2724 0%, #594a42 100%);
  border-radius: 18px;
  box-shadow: 0 10px 25px rgba(44, 39, 36, 0.2), 0 0 20px rgba(197, 168, 128, 0.45);
}
.brand-title { color: #2c2724; }
.brand-accent { color: #c5a880; }
.form-control:focus {
  background-color: #fff !important;
  border-color: #c5a880 !important;
  box-shadow: 0 0 0 0.25rem rgba(197, 168, 128, 0.15);
}
.auth-btn {
  background-color: #2c2724;
  border: none;
  transition: all 0.3s ease;
}
.auth-btn:hover {
  background-color: #c5a880;
  transform: translateY(-2px);
}
</style>