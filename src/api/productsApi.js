// لو عندك API حقيقي، استبدل الدوال دي بـ axios.get('/api/products') وهكذا
import { products, categories } from '@/data/products'

const NETWORK_DELAY = 350 // بالمللي ثانية، بيحاكي شبكة حقيقية

function delay(value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), NETWORK_DELAY))
}

export function fetchProducts() {
  return delay(products)
}

export function fetchProductById(id) {
  const numericId = Number(id)
  const found = products.find((p) => p.id === numericId)
  return delay(found ?? null)
}

export function fetchCategories() {
  return delay(categories)
}