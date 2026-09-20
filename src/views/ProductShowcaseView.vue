<template>
  <div class="container py-5" dir="rtl">
    <!-- Header Section -->
    <div class="text-center mb-5">
      <span class="badge px-3 py-2 rounded-pill mb-2 fw-semibold text-dark" style="background-color: var(--border-creamy, #e9ecef);">
        تخصيص تفاعلي
      </span>
      <h1 class="fw-bold text-dark mb-2">المعرض التفاعلي - FurniStyle</h1>
      <p class="text-muted fs-6">اختر الغرفة، جرب تغيير الألوان والمواد، وأضف القطع المفضلة إلى سلتك مباشرة.</p>
    </div>

    <div class="row g-4">
      <!-- Interactive Showcase Stage -->
      <div class="col-lg-8">
        <div class="card border-0 shadow-sm rounded-4 overflow-hidden bg-white p-4 h-100">
          
          <!-- Room Navigation -->
          <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2 border-bottom pb-3">
            <div class="d-flex gap-2 flex-wrap">
              <button
                v-for="room in rooms"
                :key="room.id"
                @click="selectRoom(room)"
                class="btn btn-sm rounded-pill px-3 py-2 fw-bold transition-all"
                :class="selectedRoom.id === room.id ? 'btn-dark' : 'btn-outline-secondary'"
              >
                <i :class="room.icon" class="ms-1"></i> {{ room.name }}
              </button>
            </div>
            <span class="badge bg-light text-dark border px-3 py-2 rounded-pill small">
              <i class="bi bi-box-seam ms-1"></i> معاينة غرف تفاعلية
            </span>
          </div>

          <!-- Main Interactive Stage -->
          <div class="showcase-stage rounded-4 p-4 d-flex align-items-center justify-content-center position-relative overflow-hidden mb-4">
            <img
              :src="activeItem.image"
              :alt="activeItem.name"
              class="img-fluid stage-image rounded-3 transition-all"
              :style="{ filter: activeColor.filter || 'none' }"
            />

            <!-- Item Info Overlay -->
            <div class="position-absolute bottom-0 start-0 end-0 p-3 bg-dark bg-opacity-75 text-white d-flex justify-content-between align-items-center flex-wrap gap-2 backdrop-blur">
              <div>
                <h5 class="mb-0 fw-bold">{{ activeItem.name }}</h5>
                <small class="text-light opacity-75">اللون المحدد: {{ activeColor.name }}</small>
              </div>
              <span class="fs-4 fw-bold" style="color: #c5a880;">${{ activeItem.price }}</span>
            </div>
          </div>

          <!-- Item Thumbnails Strip -->
          <div class="d-flex gap-3 overflow-x-auto pb-2 border-top pt-3">
            <button
              v-for="item in selectedRoom.items"
              :key="item.id"
              @click="selectItem(item)"
              class="btn item-thumb-card rounded-3 p-2 text-start flex-shrink-0 d-flex align-items-center gap-3 border"
              :class="{ 'active-thumb': activeItem.id === item.id }"
            >
              <img :src="item.image" :alt="item.name" class="rounded object-fit-cover" style="width: 55px; height: 55px;" />
              <div>
                <div class="fw-bold small text-dark">{{ item.name }}</div>
                <div class="text-muted small">${{ item.price }}</div>
              </div>
            </button>
          </div>

        </div>
      </div>

      <!-- Controls & Customization Panel -->
      <div class="col-lg-4">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white h-100 d-flex flex-column justify-content-between">
          <div>
            <h4 class="fw-bold mb-1 text-dark">تخصيص القطعة</h4>
            <p class="text-muted small mb-4">اختر الخامة واللون المناسب لمنزلك</p>

            <!-- Color Swatches -->
            <div class="mb-4">
              <label class="form-label fw-bold small text-dark d-block mb-3">
                الألوان والخامات المتاحة:
              </label>
              <div class="d-flex gap-3 flex-wrap align-items-center">
                <button
                  v-for="color in activeItem.colors"
                  :key="color.hex"
                  @click="activeColor = color"
                  class="color-swatch-btn rounded-circle"
                  :class="{ 'active-swatch': activeColor.hex === color.hex }"
                  :style="{ backgroundColor: color.hex }"
                  :title="color.name"
                  :aria-label="color.name"
                ></button>
              </div>
              <div class="mt-3 text-muted small bg-light p-2 rounded-3">
                الخامة: <strong class="text-dark">{{ activeColor.material }}</strong>
              </div>
            </div>

            <hr class="my-4" />

            <!-- Product Highlights -->
            <div class="mb-4">
              <h6 class="fw-bold text-dark mb-3">مميزات القطعة:</h6>
              <ul class="list-unstyled small text-secondary vstack gap-2">
                <li class="d-flex align-items-center gap-2">
                  <i class="bi bi-check-circle-fill text-success"></i> خامات عالية الجودة ومقاومة للبقع
                </li>
                <li class="d-flex align-items-center gap-2">
                  <i class="bi bi-check-circle-fill text-success"></i> ضمان لمدة 5 سنوات
                </li>
                <li class="d-flex align-items-center gap-2">
                  <i class="bi bi-check-circle-fill text-success"></i> توصيل وتركيب مجاني
                </li>
              </ul>
            </div>
          </div>

          <!-- Add to Cart Action -->
          <div class="pt-3 border-top">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <span class="text-muted">السعر:</span>
              <span class="fs-4 fw-bold" style="color: #c5a880;">${{ activeItem.price }}</span>
            </div>
            <button
              @click="addToCart"
              class="btn btn-dark w-100 py-3 rounded-3 fw-bold shadow-sm main-action-btn d-flex align-items-center justify-content-center gap-2"
            >
              <i class="bi bi-cart-plus fs-5"></i> إضافة إلى السلة
            </button>
            <transition name="fade">
              <div v-if="addedSuccess" class="alert alert-success border-0 rounded-3 text-center small py-2 mt-2 mb-0">
                تمت إضافة {{ activeItem.name }} ({{ activeColor.name }}) إلى سلتك!
              </div>
            </transition>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useShopStore } from '@/stores/shopStore'

const shopStore = useShopStore()

// Mock Room Showcase Data
const rooms = ref([
  {
    id: 'living',
    name: 'غرفة المعيشة',
    icon: 'bi-house-door',
    items: [
      {
        id: 101,
        name: 'أريكة مدرن فاخرة',
        price: 899,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
        colors: [
          { name: 'رمادي دافئ', hex: '#6c757d', material: 'قماش مخملي', filter: 'none' },
          { name: 'بيج هادئ', hex: '#d7c4b7', material: 'كتان طبيعي', filter: 'sepia(0.3) saturate(1.2)' },
          { name: 'زيتي كلاسيك', hex: '#2d4a3e', material: 'جلد فاخر', filter: 'hue-rotate(90deg) contrast(1.1)' }
        ]
      },
      {
        id: 102,
        name: 'طاولة قهوة خشبية',
        price: 299,
        image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80',
        colors: [
          { name: 'بني طبيعي', hex: '#8b5a2b', material: 'خشب زان طبيعي', filter: 'none' },
          { name: 'أسود مطفي', hex: '#212529', material: 'خشب معالج', filter: 'brightness(0.5)' }
        ]
      }
    ]
  },
  {
    id: 'bedroom',
    name: 'غرفة النوم',
    icon: 'bi-bed',
    items: [
      {
        id: 201,
        name: 'سرير مزدوج مريح',
        price: 1199,
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
        colors: [
          { name: 'رمادي فاتح', hex: '#adb5bd', material: 'قماش مبطن', filter: 'none' },
          { name: 'كريمي', hex: '#f8f9fa', material: 'قطن صافي', filter: 'brightness(1.1)' }
        ]
      },
      {
        id: 202,
        name: 'طاولة جانبية (كومودينو)',
        price: 180,
        image: 'https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?auto=format&fit=crop&w=800&q=80',
        colors: [
          { name: 'بني دافئ', hex: '#6f4e37', material: 'خشب طبيعي', filter: 'none' },
          { name: 'أبيض أنيق', hex: '#ffffff', material: 'دهان مقاوم للخدش', filter: 'brightness(1.2)' }
        ]
      }
    ]
  }
])

const selectedRoom = ref(rooms.value[0])
const activeItem = ref(selectedRoom.value.items[0])
const activeColor = ref(activeItem.value.colors[0])
const addedSuccess = ref(false)

function selectRoom(room) {
  selectedRoom.value = room
  activeItem.value = room.items[0]
  activeColor.value = activeItem.value.colors[0]
}

function selectItem(item) {
  activeItem.value = item
  activeColor.value = item.colors[0]
}

function addToCart() {
  const customVariant = {
    colorName: activeColor.value.name,
    hex: activeColor.value.hex,
    image: activeItem.value.image
  }

  const productToAdd = {
    id: activeItem.value.id,
    name: activeItem.value.name,
    price: activeItem.value.price,
    image: activeItem.value.image
  }

  shopStore.addToCart(productToAdd, customVariant, 1)

  addedSuccess.value = true
  setTimeout(() => {
    addedSuccess.value = false
  }, 2500)
}
</script>

<style scoped>
.showcase-stage {
  min-height: 380px;
  background-color: #fcfbf9;
  border: 1px solid var(--border-creamy, #f0eae1);
}

.stage-image {
  max-height: 320px;
  object-fit: cover;
  transition: filter 0.4s ease, transform 0.3s ease;
}

.item-thumb-card {
  border-color: #e9ecef;
  background-color: #ffffff;
  transition: all 0.25s ease;
  min-width: 170px;
}

.item-thumb-card:hover,
.active-thumb {
  border-color: #2c2724 !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  background-color: #f8f9fa;
}

.color-swatch-btn {
  width: 38px;
  height: 38px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s ease;
}

.active-swatch {
  box-shadow: 0 0 0 2px #fff, 0 0 0 4px #2c2724;
}

.color-swatch-btn:hover {
  transform: scale(1.1);
}

.main-action-btn {
  background-color: #2c2724;
  border: none;
  transition: all 0.3s ease;
}

.main-action-btn:hover {
  background-color: #c5a880;
  transform: translateY(-2px);
}

.backdrop-blur {
  backdrop-filter: blur(6px);
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