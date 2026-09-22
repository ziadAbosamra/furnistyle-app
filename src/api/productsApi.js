import { products as localProducts, categories as localCategories } from '@/data/products'

/**
 * دالة تحول صور الـ API لمجموعة زوايا عرض مع تحديد نوع الاتجاه
 */
function createVariantsForApiItem(item) {
  const images = Array.isArray(item.images) && item.images.length > 0 
    ? item.images 
    : [item.thumbnail]

  const viewInfo = [
    { name: 'الواجهة الأمامية', type: 'front' },
    { name: 'المنظور الجانبي', type: 'side' },
    { name: 'اللقطة المقربة', type: 'zoom' },
    { name: 'زاوية خلفية/إضافية', type: 'back' }
  ]

  return images.slice(0, 4).map((imgUrl, index) => ({
    colorName: viewInfo[index]?.name || `زاوية ${index + 1}`,
    isView: true, // علامة للـ Vue لتمييز زوايا العرض عن الألوان
    viewType: viewInfo[index]?.type || 'general',
    image: imgUrl
  }))
}

/**
 * تصنيف منتجات الأثاث والديكور بدقة
 */
function classifyFurnitureItem(item) {
  const text = `${item.title} ${item.description}`.toLowerCase()

  if (text.includes('lamp') || text.includes('light') || text.includes('chandelier') || text.includes('sconce') || text.includes('pendant')) {
    return 'lightinge'
  }

  if (text.includes('bed') || text.includes('mattress') || text.includes('pillow') || text.includes('nightstand')) {
    return 'bedroom'
  }

  if (text.includes('desk') || text.includes('office') || text.includes('workstation') || text.includes('study table')) {
    return 'office'
  }

  if (text.includes('dining') || text.includes('dinner table') || text.includes('kitchen table') || text.includes('bar stool')) {
    return 'dining'
  }

  if (text.includes('shelf') || text.includes('cabinet') || text.includes('storage') || text.includes('bookcase') || text.includes('wardrobe') || text.includes('dresser') || text.includes('chest')) {
    return 'storage'
  }

  if (text.includes('sofa') || text.includes('couch') || text.includes('chair') || text.includes('table') || text.includes('bench') || text.includes('ottoman') || text.includes('mirror') || text.includes('decor') || text.includes('vase') || text.includes('clock')) {
    return 'living-room'
  }

  return null
}

/**
 * جلب المنتجات الخارجية من الـ API
 */
export async function fetchProducts() {
  try {
    const [furnitureRes, decorRes] = await Promise.all([
      fetch('https://dummyjson.com/products/category/furniture'),
      fetch('https://dummyjson.com/products/category/home-decoration')
    ])

    if (!furnitureRes.ok || !decorRes.ok) {
      throw new Error('فشل جلب البيانات من الـ API الخارجي')
    }

    const furnitureData = await furnitureRes.json()
    const decorData = await decorRes.json()

    const rawApiItems = [...furnitureData.products, ...decorData.products]
    const apiProducts = []

    rawApiItems.forEach((item) => {
      const category = classifyFurnitureItem(item)

      if (category) {
        apiProducts.push({
          id: Number(item.id) + 5000,
          name: item.title,
          category: category,
          price: item.price,
          description: item.description,
          featured: item.rating > 4.5,
          variants: createVariantsForApiItem(item)
        })
      }
    })

    return [...localProducts, ...apiProducts]

  } catch (error) {
    console.warn('حدث خطأ أثناء الاتصال بالـ API، سيتم الاعتماد على المنتجات المحلية فقط:', error)
    return localProducts
  }
}

/**
 * جلب قائمة التصنيفات
 */
export async function fetchCategories() {
  return localCategories
}