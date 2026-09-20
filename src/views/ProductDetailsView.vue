<template>
  <div class="max-w-4xl mx-auto p-6 font-sans">
    <!-- زر العودة -->
    <a href="#" class="inline-flex items-center text-gray-500 hover:text-gray-800 mb-6">
      ← Back to Shop
    </a>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <!-- 1. قسم الصورة (يتغير المعاين تلقائيًا حسب اللون المحدد) -->
      <div class="bg-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <img 
          :src="selectedColor.image" 
          :alt="`${product.name} - ${selectedColor.name}`" 
          class="w-full h-[400px] object-cover transition-all duration-300 ease-in-out"
        />
      </div>

      <!-- 2. قسم التفاصيل والخيارات -->
      <div class="flex flex-col gap-4">
        <span class="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full w-max">
          {{ product.category }}
        </span>

        <h1 class="text-3xl font-bold text-gray-900">{{ product.name }}</h1>
        <p class="text-2xl font-bold text-gray-800">${{ product.price }}</p>
        <p class="text-gray-600 leading-relaxed">{{ product.description }}</p>

        <hr class="my-2 border-gray-200" />

        <!-- اختيار اللون -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Select Color: <span class="font-semibold text-gray-900">({{ selectedColor.name }})</span>
          </label>
          <div class="flex items-center gap-3">
            <button
              v-for="color in product.colors"
              :key="color.id"
              @click="selectedColor = color"
              :title="color.name"
              class="w-8 h-8 rounded-full border-2 transition-all p-0.5 focus:outline-none"
              :class="selectedColor.id === color.id ? 'border-gray-900 scale-110' : 'border-transparent opacity-70 hover:opacity-100'"
            >
              <span 
                class="block w-full h-full rounded-full shadow-inner" 
                :style="{ backgroundColor: color.hex }"
              ></span>
            </button>
          </div>
        </div>

        <!-- الكمية -->
        <div class="mt-2">
          <label class="block text-sm font-medium text-gray-700 mb-2">Quantity:</label>
          <div class="flex items-center border border-gray-300 rounded-lg w-max">
            <button 
              @click="quantity > 1 && quantity--" 
              class="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg"
            >-</button>
            <span class="px-4 py-1 font-semibold text-gray-800">{{ quantity }}</span>
            <button 
              @click="quantity++" 
              class="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg"
            >+</button>
          </div>
        </div>

        <!-- زر الإضافة للسلة -->
        <button 
          @click="addToCart"
          class="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-xl shadow transition duration-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// بيانات المنتج
const product = ref({
  id: 2,
  name: "Scandinavian Wooden Dining Table",
  category: "Dining",
  price: 350,
  description: "Solid oak wood table designed elegantly for warm family gatherings and long-lasting durability.",
  colors: [
    { 
      id: "gray", 
      name: "Gray Stone", 
      hex: "#6B7280", 
      image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?q=80&w=800&auto=format&fit=crop" 
    },
    { 
      id: "natural", 
      name: "Natural Wood", 
      hex: "#D97706", 
      image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=800&auto=format&fit=crop" 
    },
    { 
      id: "walnut", 
      name: "Walnut Dark", 
      hex: "#451A03", 
      image: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?q=80&w=800&auto=format&fit=crop" 
    }
  ]
});

// الحالة (State) للون المحدد والكمية
const selectedColor = ref(product.value.colors[0]);
const quantity = ref(1);

const addToCart = () => {
  alert(`Added ${quantity.value} item(s) in ${selectedColor.value.name} color to cart!`);
};
</script>