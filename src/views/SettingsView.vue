<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-9 col-lg-8">
        <div class="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
          
          <div class="d-flex align-items-center mb-4 pb-2 border-bottom">
            <h3 class="fw-bold mb-0" style="color: #2c2724;">Account Settings</h3>
            <i class="bi bi-gear-fill fs-4 ms-2 text-muted"></i>
          </div>

          <!-- Alert message for success -->
          <div v-if="successMessage" class="alert alert-success rounded-pill py-2 text-center small mb-4" role="alert">
            {{ successMessage }}
          </div>

          <form @submit.prevent="saveSettings">
            <h5 class="fw-bold mb-3 fs-6 text-secondary">Personal Information</h5>
            
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

            <h5 class="fw-bold mb-3 fs-6 text-secondary">Preferences</h5>
            
            <div class="form-check form-switch mb-3 ps-0 d-flex justify-content-between align-items-center border p-3 rounded-4 bg-light">
              <label class="form-check-label fw-semibold small text-dark m-0" for="notifSwitch">
                Receive email notifications for special offers
              </label>
              <input v-model="form.notifications" class="form-check-input m-0" type="checkbox" role="switch" id="notifSwitch" style="transform: scale(1.2);">
            </div>

            <div class="form-check form-switch mb-4 ps-0 d-flex justify-content-between align-items-center border p-3 rounded-4 bg-light">
              <label class="form-check-label fw-semibold small text-dark m-0" for="darkModeSwitch">
                Enable Dark Mode UI
              </label>
              <input v-model="form.darkMode" class="form-check-input m-0" type="checkbox" role="switch" id="darkModeSwitch" style="transform: scale(1.2);">
            </div>

            <div class="d-flex justify-content-end gap-2 pt-2">
              <button type="button" @click="resetForm" class="btn btn-light rounded-pill px-4 fw-semibold border">
                Cancel
              </button>
              <button type="submit" class="btn btn-dark rounded-pill px-4 fw-semibold shadow-sm" style="background-color: #2c2724;">
                Save Changes
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
  darkMode: false
})

onMounted(() => {
  const savedUser = localStorage.getItem('furni_user')
  if (savedUser) {
    const parsed = JSON.parse(savedUser)
    const names = parsed.name ? parsed.name.split(' ') : ['Adham', 'Abosamra']
    form.firstName = names[0] || 'Adham'
    form.lastName = names.slice(1).join(' ') || 'Abosamra'
    form.email = parsed.email || 'adhame764@gmail.com'
  }
  
  const savedSettings = localStorage.getItem('furni_settings')
  if (savedSettings) {
    const parsedSettings = JSON.parse(savedSettings)
    form.notifications = parsedSettings.notifications
    form.darkMode = parsedSettings.darkMode || false
  }
})

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

  if (form.darkMode) {
    document.body.classList.add('dark-mode-theme')
  } else {
    document.body.classList.remove('dark-mode-theme')
  }

  successMessage.value = 'Settings updated successfully!'
  setTimeout(() => {
    successMessage.value = ''
  }, 3000)
}

const resetForm = () => {
  const savedSettings = localStorage.getItem('furni_settings')
  if (savedSettings) {
    const parsedSettings = JSON.parse(savedSettings)
    form.darkMode = parsedSettings.darkMode || false
  }
}
</script>