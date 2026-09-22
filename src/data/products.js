export const categories = [
  { id: 'living-room', label: 'Living Room' },
  { id: 'dining', label: 'Dining' },
  { id: 'office', label: 'Office' },
  { id: 'lightinge', label: 'Lighting' },
  { id: 'bedroom', label: 'Bedroom' },
  { id: 'storage', label: 'Storage' }
]

export const products = [
  {
    id: 1,
    name: 'Minimalist Modern Sofa',
    category: 'living-room',
    price: 2250,
    description: 'Comfortable 3-seater sofa with premium durable fabric and ergonomic support.',
    featured: true,
    variants: [
      { 
        colorName: 'Warm Beige', 
        hex: '#e2d8ce', 
        image: '/images/sofa-beige.jpg' 
      },
      { 
        colorName: 'Midnight Blue', 
        hex: '#1e293b', 
        image: '/images/sofa-navy.jpg' 
      },
      { 
        colorName: 'Ruby Red', 
        hex: '#4d1b1b', 
        image: '/images/sofa-nep.jpg' 
      }
    ]
  },
  {
    id: 2,
    name: 'Curved 7 Seater Sofa Set for Living Room',
    category: 'living-room',
    price: 5499,
    description: 'Deep cushioned seats and supportive backrests offer excellent comfort for daily lounging or hosting guests.',
    featured: true,
    variants: [
      { 
        colorName: 'Warm Oak', 
        hex: '#e2d8ce', 
        image: '/images/rokna.jpg' 
      },
      { 
        colorName: 'Mint Green', 
        hex: '#5cd086', 
        image: '/images/rokna-ment.jpg' 
      }
    ]
  },
  {
    id: 3,
    name: '7 U-Shaped Sofa Living Room Designs for a Cozy',
    category: 'living-room',
    price: 6850,
    description: 'Deep cushioned seats and supportive backrests offer excellent comfort for daily lounging or hosting guests.',
    featured: true,
    variants: [
      { 
        colorName: 'Light Gray', 
        hex: '#9b9796', 
        image: '/images/living.jpg' 
      },
      { 
        colorName: 'Brown', 
        hex: '#B98A63', 
        image: '/images/living-bon.jpg' 
      }
    ]
  },
  {
    id: 101,
    name: 'Mid-Century Modern Dining Room Ideas - Olive Decor',
    category: 'dining',
    price: 2450,
    description: 'Create a cozy, high-end look with these mid-century modern dining room decor ideas. This organic modern space features olive green boucle chairs, a walnut wood table, and vertical wood slat wall paneling. Perfect earthy aesthetic inspiration for your next home renovation or remodel project!',
    featured: true,
    variants: [
      { 
        colorName: 'Mint Green', 
        hex: '#39ac63', 
        image: '/images/dinind-mint.jpg' 
      },
      { 
        colorName: 'baby blue', 
        hex: '#18899d', 
        image: '/images/dining-baby.jpg' 
      }
    ]
  },
  {
    id: 10,
    name: 'office',
    category: 'office',
    price: 980,
    description: 'Create a warm and inviting dining space with timeless elegance ✨ This beautifully crafted round dining set blends natural wood textures with soft neutral tones, creating the perfect balance of comfort and style. Ideal for modern homes, its minimalist design adds sophistication while keeping your space cozy and functional. Upgrade your dining experience with furniture that brings people together in style 🤍',
    featured: false,
    variants: [
      { 
        colorName: 'brown', 
        hex: '#542503', 
        image: '/images/office.jpg' 
      },
      { 
        colorName: 'black', 
        hex: '#010000', 
        image: '/images/office-black.jpg' 
      }
    ]
  },
  {
    id: 20,
    name: 'Stylish Wooden Lighting for Modern Homes',
    category: 'lightinge',
    price: 580,
    description: 'Bring warmth, natural beauty, and modern elegance into your home with stylish wooden lighting ideas.',
    featured: true,
    variants: [
      { 
        colorName: 'brown', 
        hex: '#c9c00c8a', 
        image: '/images/lighting.jpg' 
      },
      { 
        colorName: 'black', 
        hex: '#89460b', 
        image: '/images/lighting-high.jpg' 
      }
    ]
  },
  {
    id: 21,
    name: 'Luxury Bedroom Design Ideas for a Cozy Modern Retreat ✨',
    category: 'bedroom',
    price: 2100,
    description: 'Transform your bedroom into a luxury sanctuary! 🛏️ Save this stunning design featuring a plush upholstered bed, ambient lighting, and elegant modern decor',
    featured: true,
    variants: [
      { 
        colorName: 'white', 
        hex: '#fafafa', 
        image: '/images/bedroom-white.jpg' 
      },
      { 
        colorName: 'Green', 
        hex: '#1b6536', 
        image: '/images/bedroom.jpg' 
      }
    ]
  },
  {
    id: 210,
    name: 'storage',
    category: 'storage',
    price: 3720,
    description: 'Avenue Home Décor - Luxury Interior Design ❤️',
    featured: true,
    variants: [
      { 
        colorName: 'brown', 
        hex: '#89460b', 
        image: '/images/storage.jpg' 
      },
      { 
        colorName: 'Midnight Blue', 
        hex: '#1e293b', 
        image: '/images/storage-cohly.jpg' 
      }
    ]
  },
  {
    id: 102,
    name: 'dining space with timeless elegance',
    category: 'dining',
    price: 3280,
    description: 'Create a warm and inviting dining space with timeless elegance ✨ This beautifully crafted round dining set blends natural wood textures with soft neutral tones, creating the perfect balance of comfort and style. Ideal for modern homes, its minimalist design adds sophistication while keeping your space cozy and functional. Upgrade your dining experience with furniture that brings people together in style 🤍',
    featured: false,
    variants: [
      { 
        colorName: 'of white', 
        hex: '#f4f5f4', 
        image: '/images/dining.jpg' 
      },
      { 
        colorName: 'Ruby Red', 
        hex: '#b4723d', 
        image: '/images/dining-camel.jpg' 
      }
    ]
  }
]

const FALLBACK_IMAGE = '/images/sofa-beige.jpg'

export function defaultImage(product) {
  if (!product) return FALLBACK_IMAGE
  return product.variants?.[0]?.image || FALLBACK_IMAGE
}