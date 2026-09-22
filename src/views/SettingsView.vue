<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-9 col-lg-8">
        <div class="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
          
          <!-- Header -->
          <div class="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom">
            <div class="d-flex align-items-center gap-2">
              <i class="bi bi-gear-fill fs-3" style="color: #c5a880;"></i>
              <h3 class="fw-bold mb-0" style="color: var(--text-main);">Account Settings</h3>
            </div>
            <span class="badge bg-light text-muted border px-3 py-2 rounded-pill small">System Preferences</span>
          </div>

          <!-- Alert Notification -->
          <transition name="fade">
            <div v-if="successMessage" class="alert alert-success border-0 shadow-sm rounded-4 py-2 px-3 text-center small mb-4 d-flex align-items-center justify-content-center gap-2" role="alert">
              <i class="bi bi-check-circle-fill"></i>
              <span>{{ successMessage }}</span>
            </div>
          </transition>

          <form @submit.prevent="saveSettings">
            <!-- Personal Information Section -->
            <h5 class="fw-bold mb-3 fs-6 text-secondary d-flex align-items-center gap-2">
              <i class="bi bi-person me-1"></i> Personal Information
            </h5>
            
            <div class="row mb-3">
              <div class="col-md-6 mb-3 mb-md-0">
                <label class="form-label small fw-bold text-secondary">First Name</label>
                <input v-model="form.firstName" type="text" class="form-control rounded-pill bg-light border-0 py-2 px-3" required />
              </div>
              <div class="col-md-6">
                <label class="form-label small fw-bold text-secondary">Last Name</label>
                <input v-model="form.lastName" type="text" class="form-control rounded-pill bg-light border-0 py-2 px-3" required />
              </div>
            </div>

            <div class="mb-4">
              <label class="form-label small fw-bold text-secondary">Email Address</label>
              <input v-model="form.email" type="email" class="form-control rounded-pill bg-light border-0 py-2 px-3" required />
            </div>

            <hr class="my-4 text-muted opacity-25">

            <!-- Preferences Section -->
            <h5 class="fw-bold mb-3 fs-6 text-secondary d-flex align-items-center gap-2">
              <i class="bi bi-sliders me-1"></i> Preferences
            </h5>
            
            <div class="form-check form-switch mb-3 ps-0 d-flex justify-content-between align-items-center border p-3 rounded-4 bg-light">
              <label class="form-check-label fw-semibold small text-dark m-0 cursor-pointer" for="notifSwitch">
                Receive email notifications for special offers
              </label>
              <input v-model="form.notifications" class="form-check-input custom-switch m-0" type="checkbox" role="switch" id="notifSwitch">
            </div>

            <div class="form-check form-switch mb-4 ps-0 d-flex justify-content-between align-items-center border p-3 rounded-4 bg-light">
              <label class="form-check-label fw-semibold small text-dark m-0 cursor-pointer" for="darkModeSwitch">
                Enable Dark Mode UI
              </label>
              <input v-model="form.darkMode" @change="handleDarkModeToggle" class="form-check-input custom-switch m-0" type="checkbox" role="switch" id="darkModeSwitch">
            </div>

            <hr class="my-4 text-muted opacity-25">

            <!-- Security Section (Optional Password Change) -->
            <h5 class="fw-bold mb-3 fs-6 text-secondary d-flex align-items-center gap-2">
              <i class="bi bi-shield-lock me-1"></i> Security
            </h5>

            <div class="mb-4">
              <label class="form-label small fw-bold text-secondary">New Password (leave blank to keep current)</label>
              <input v-model="form.newPassword" type="password" class="form-control rounded-pill bg-light border-0 py-2 px-3" placeholder="••••••••" />
            </div>

            <!-- Action Buttons -->
            <div class="d-flex justify-content-end gap-2 pt-2">
              <button type="button" @click="resetForm" class="btn btn-light rounded-pill px-4 fw-semibold border">
                Cancel
              </button>
              <button type="submit" class="btn btn-dark rounded-pill px-4 fw-semibold shadow-sm main-save-btn">
                <i class="bi bi-check-lg me-1"></i> Save Changes
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'

const successMessage = ref('')

const form = reactive({
  firstName: 'Adham',
  lastName: 'Abosamra',
  email: 'adhame764@gmail.com',
  notifications: true,
  darkMode: false,
  newPassword: ''
})

const loadStoredData = () => {
  const savedUser = localStorage.getItem('furni_user')
  if (savedUser) {
    try {
      const parsed = JSON.parse(savedUser)
      const names = parsed.name ? parsed.name.split(' ') : ['Adham', 'Abosamra']
      form.firstName = names[0] || 'Adham'
      form.lastName = names.slice(1).join(' ') || 'Abosamra'
      form.email = parsed.email || 'adhame764@gmail.com'
    } catch (e) {
      console.error('Error loading user data:', e)
    }
  }

  const savedSettings = localStorage.getItem('furni_settings')
  if (savedSettings) {
    try {
      const parsedSettings = JSON.parse(savedSettings)
      form.notifications = parsedSettings.notifications ?? true
      form.darkMode = parsedSettings.darkMode ?? false
    } catch (e) {
      console.error('Error loading settings:', e)
    }
  }
}

onMounted(() => {
  loadStoredData()
})

// تحديث الـ Dark Mode لحظياً عند تغيير الزر
const handleDarkModeToggle = () => {
  if (form.darkMode) {
    document.body.classList.add('dark-mode-theme')
    localStorage.setItem('furni_theme', 'dark')
  } else {
    document.body.classList.remove('dark-mode-theme')
    localStorage.setItem('furni_theme', 'light')
  }
}

const saveSettings = () => {
  const fullName = `${form.firstName} ${form.lastName}`.trim()
  
  const userData = {
    name: fullName,
    email: form.email
  }
  localStorage.setItem('furni_user', JSON.stringify(userData))

  localStorage.setItem('furni_settings', JSON.stringify({
    notifications: form.notifications,
    darkMode: form.darkMode
  }))

  handleDarkModeToggle()

  form.newPassword = ''
  successMessage.value = 'Settings updated successfully!'
  setTimeout(() => {
    successMessage.value = ''
  }, 3000)
}

const resetForm = () => {
  loadStoredData()
  form.newPassword = ''
  handleDarkModeToggle()
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.custom-switch {
  transform: scale(1.2);
  cursor: pointer;
}

.custom-switch:checked {
  background-color: #c5a880;
  border-color: #c5a880;
}

.main-save-btn {
  background-color: #2c2724;
  border: none;
  transition: all 0.3s ease;
}

.main-save-btn:hover {
  background-color: #c5a880;
  transform: translateY(-1px);
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