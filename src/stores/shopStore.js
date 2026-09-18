import { defineStore } from 'pinia'

export const useShopStore = defineStore('shop', {
  state: () => ({
    products: [
      // أول 10 منتجات
      { 
        id: 1, 
        name: 'Minimalist Modern Sofa', 
        category: 'Living Room', 
        description: 'Comfortable 3-seater sofa with premium durable fabric and ergonomic support.', 
        price: 499, 
        image: 'https://i.pinimg.com/1200x/3b/2e/d2/3b2ed204ab7fe663b8ad079b6e997049.jpg', 
        colors: [
          { name: 'Dark Navy', hex: '#2c3e50', image: 'https://i.pinimg.com/1200x/3b/2e/d2/3b2ed204ab7fe663b8ad079b6e997049.jpg' },
          { name: 'Purple Velvet', hex: '#8e44ad', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80' }
        ] 
      },
      { 
        id: 2, 
        name: 'Scandinavian Wooden Dining Table', 
        category: 'Dining', 
        description: 'Solid oak wood table designed elegantly for warm family gatherings.', 
        price: 350, 
        image: 'https://i.pinimg.com/736x/21/4c/77/214c771329631edcfe04588df7f42b7c.jpg', 
        colors: [
          { name: 'Natural Oak', hex: '#d35400', image: 'https://i.pinimg.com/736x/21/4c/77/214c771329631edcfe04588df7f42b7c.jpg' },
          { name: 'Gray Oak', hex: '#7f8c8d', image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80' }
        ] 
      },
      { 
        id: 3, 
        name: 'Ergonomic Executive Office Chair', 
        category: 'Office', 
        description: 'Sleek professional chair built for maximum comfort during long work sessions.', 
        price: 150, 
        image: 'https://i.pinimg.com/736x/d3/48/d3/d348d348b33acc57c6225866fb2463d1.jpg', 
        colors: [
          { name: 'Teal', hex: '#16a085', image: 'https://i.pinimg.com/736x/d3/48/d3/d348d348b33acc57c6225866fb2463d1.jpg' },
          { name: 'Dark', hex: '#2c3e50', image: 'https://images.unsplash.com/photo-1580481077494-e3299acae5d2?auto=format&fit=crop&w=800&q=80' }
        ] 
      },
      { 
        id: 4, 
        name: 'Luxury Velvet Accent Chair', 
        category: 'Living Room', 
        description: 'Deep cushioning and smooth velvet fabric designed to make a bold statement.', 
        price: 299, 
        image: 'https://i.pinimg.com/736x/63/cb/2d/63cb2deed1e8cc5aff7e787400d21303.jpg', 
        colors: [
          { name: 'Red', hex: '#e74c3c', image: 'https://i.pinimg.com/736x/63/cb/2d/63cb2deed1e8cc5aff7e787400d21303.jpg' },
          { name: 'Dark Slate', hex: '#34495e', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80' }
        ] 
      },
      { 
        id: 5, 
        name: 'Industrial Bookshelf & Display', 
        category: 'Office', 
        description: 'Combination of robust metal frames and rustic wood shelves for spacious storage.', 
        price: 210, 
        image: 'https://i.pinimg.com/1200x/fa/c3/fe/fac3fef937d2c7c8ba4e1b64c225cce9.jpg', 
        colors: [
          { name: 'Rustic Brown', hex: '#795548', image: 'https://i.pinimg.com/1200x/fa/c3/fe/fac3fef937d2c7c8ba4e1b64c225cce9.jpg' },
          { name: 'Black Metal', hex: '#212121', image: 'https://images.unsplash.com/photo-1594626119524-77a83d780dd2?auto=format&fit=crop&w=800&q=80' }
        ] 
      },
      { 
        id: 6, 
        name: 'Nordic Pendant Ceiling Light', 
        category: 'Lighting', 
        description: 'Warm ambient hanging light fixture that brings a cozy modern atmosphere.', 
        price: 95, 
        image: 'https://i.pinimg.com/736x/4f/09/65/4f09655259581998f0533918b393fdbf.jpg', 
        colors: [
          { name: 'White', hex: '#ffffff', image: 'https://i.pinimg.com/736x/4f/09/65/4f09655259581998f0533918b393fdbf.jpg' },
          { name: 'Gold', hex: '#f1c40f', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80' }
        ] 
      },
      { 
        id: 7, 
        name: 'Rattan Lounge Armchair', 
        category: 'Outdoor', 
        description: 'Natural handcrafted rattan chair offering breezy comfort for indoor and outdoor spaces.', 
        price: 180, 
        image: 'https://i.pinimg.com/736x/85/89/f7/8589f75061d283e6530472d30ea3e7cd.jpg', 
        colors: [
          { name: 'Light Rattan', hex: '#d7ccc8', image: 'https://i.pinimg.com/736x/85/89/f7/8589f75061d283e6530472d30ea3e7cd.jpg' },
          { name: 'Brown', hex: '#8d6e63', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80' }
        ] 
      },
      { 
        id: 8, 
        name: 'Minimalist Glass Coffee Table', 
        category: 'Living Room', 
        description: 'Tempered clear glass top with architectural wooden base geometry.', 
        price: 220, 
        image: 'https://i.pinimg.com/736x/40/28/e7/4028e702e79a90c014f7a8f995ae4015.jpg', 
        colors: [
          { name: 'Blue Gray', hex: '#607d8b', image: 'https://i.pinimg.com/736x/40/28/e7/4028e702e79a90c014f7a8f995ae4015.jpg' },
          { name: 'Dark', hex: '#37474f', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80' }
        ] 
      },
      { 
        id: 9, 
        name: 'Queen Size Upholstered Bed', 
        category: 'Bedroom', 
        description: 'Plush tufted headboard with hydraulic storage base and solid wooden slats.', 
        price: 650, 
        image: 'https://i.pinimg.com/736x/c6/88/60/c68860f7d239e7f25407a73ab955be23.jpg', 
        colors: [
          { name: 'Gray', hex: '#9e9e9e', image: 'https://i.pinimg.com/736x/c6/88/60/c68860f7d239e7f25407a73ab955be23.jpg' },
          { name: 'Blue', hex: '#3f51b5', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80' }
        ] 
      },
      { 
        id: 10, 
        name: 'Mid-Century Wooden Dresser', 
        category: 'Bedroom', 
        description: 'Six-drawer spacious dresser featuring clean lines and warm walnut finish.', 
        price: 420, 
        image: 'https://i.pinimg.com/736x/46/25/8a/46258ab4d11af332c5ae3a5f36a9060b.jpg', 
        colors: [
          { name: 'Oak', hex: '#8d6e63', image: 'https://i.pinimg.com/736x/46/25/8a/46258ab4d11af332c5ae3a5f36a9060b.jpg' },
          { name: 'Espresso', hex: '#4e342e', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80' }
        ] 
      },

      // الـ 10 منتجات الجديدة بالصور التي أرسلتها
      { 
        id: 11, 
        name: 'Modern Aesthetic Lounge Chair', 
        category: 'Living Room', 
        description: 'Exquisite modern lounge chair combining comfort with cutting-edge interior aesthetics.', 
        price: 310, 
        image: 'https://i.pinimg.com/736x/37/78/91/377891fe169d967a5f33188626b5c48f.jpg', 
        colors: [
          { name: 'Beige', hex: '#d7ccc8', image: 'https://i.pinimg.com/736x/37/78/91/377891fe169d967a5f33188626b5c48f.jpg' }
        ] 
      },
      { 
        id: 12, 
        name: 'Contemporary Minimalist Decor Unit', 
        category: 'Decor', 
        description: 'Sleek structural design piece tailored for refined modern home spaces.', 
        price: 175, 
        image: 'https://i.pinimg.com/736x/ec/02/0e/ec020eba34b36068c534935502b9526c.jpg', 
        colors: [
          { name: 'Neutral', hex: '#b0bec5', image: 'https://i.pinimg.com/736x/ec/02/0e/ec020eba34b36068c534935502b9526c.jpg' }
        ] 
      },
      { 
        id: 13, 
        name: 'Designer Luxury Coffee Setup', 
        category: 'Living Room', 
        description: 'Artisanal table arrangement designed to bring ultimate luxury to your reception area.', 
        price: 340, 
        image: 'https://i.pinimg.com/1200x/c1/a9/b6/c1a9b69a5153c1491e39bbf1be0c6793.jpg', 
        colors: [
          { name: 'Walnut', hex: '#5d4037', image: 'https://i.pinimg.com/1200x/c1/a9/b6/c1a9b69a5153c1491e39bbf1be0c6793.jpg' }
        ] 
      },
      { 
        id: 14, 
        name: 'Chic Urban Accent Stool', 
        category: 'Living Room', 
        description: 'Compact, stylish accent piece that adds a touch of modern class to any corner.', 
        price: 125, 
        image: 'https://i.pinimg.com/736x/63/c2/d6/63c2d69ac8c8513a30d848526236d2bb.jpg', 
        colors: [
          { name: 'Charcoal', hex: '#37474f', image: 'https://i.pinimg.com/736x/63/c2/d6/63c2d69ac8c8513a30d848526236d2bb.jpg' }
        ] 
      },
      { 
        id: 15, 
        name: 'Artistic Statement Wall Art Frame', 
        category: 'Decor', 
        description: 'Captivating visual canvas print designed to elevate your living room ambiance.', 
        price: 145, 
        image: 'https://i.pinimg.com/736x/0b/d5/42/0bd542fe94fb973aad06cb6c1971d885.jpg', 
        colors: [
          { name: 'Multi', hex: '#263238', image: 'https://i.pinimg.com/736x/0b/d5/42/0bd542fe94fb973aad06cb6c1971d885.jpg' }
        ] 
      },
      { 
        id: 16, 
        name: 'Premium Textured Indoor Planter', 
        category: 'Outdoor', 
        description: 'Handcrafted ceramic planter bringing natural organic vibes indoors.', 
        price: 85, 
        image: 'https://i.pinimg.com/736x/a0/85/05/a0850547c114ea913497ccbd03a67ff6.jpg', 
        colors: [
          { name: 'Earth Tone', hex: '#8d6e63', image: 'https://i.pinimg.com/736x/a0/85/05/a0850547c114ea913497ccbd03a67ff6.jpg' }
        ] 
      },
      { 
        id: 17, 
        name: 'Luxury Architectural Lighting Fixture', 
        category: 'Lighting', 
        description: 'Sleek lighting solution built to cast sophisticated warm glows across your room.', 
        price: 210, 
        image: 'https://i.pinimg.com/736x/6e/95/05/6e950535a9ef2da66574a6187b7da47a.jpg', 
        colors: [
          { name: 'Matte Black', hex: '#212121', image: 'https://i.pinimg.com/736x/6e/95/05/6e950535a9ef2da66574a6187b7da47a.jpg' }
        ] 
      },
      { 
        id: 18, 
        name: 'Elegance Series Accent Table', 
        category: 'Living Room', 
        description: 'Delicate side table featuring premium finishing and structural stability.', 
        price: 195, 
        image: 'https://i.pinimg.com/1200x/77/de/e6/77dee6dda04ce7c0ffafb071acf198ac.jpg', 
        colors: [
          { name: 'Gold Accent', hex: '#ffb300', image: 'https://i.pinimg.com/1200x/77/de/e6/77dee6dda04ce7c0ffafb071acf198ac.jpg' }
        ] 
      },
      { 
        id: 19, 
        name: 'Signature Comfort Recliner', 
        category: 'Living Room', 
        description: 'Deeply padded ergonomic recliner crafted for maximum relaxation and style.', 
        price: 520, 
        image: 'https://i.pinimg.com/1200x/e5/2c/d3/e52cd36e4e22cf9607504aeb1d5816c6.jpg', 
        colors: [
          { name: 'Soft Gray', hex: '#90a4ae', image: 'https://i.pinimg.com/1200x/e5/2c/d3/e52cd36e4e22cf9607504aeb1d5816c6.jpg' }
        ] 
      },
      { 
        id: 20, 
        name: 'Minimalist Premium Storage Cabinet', 
        category: 'Office', 
        description: 'Clean-line storage unit keeping your space organized with supreme elegance.', 
        price: 410, 
        image: 'https://i.pinimg.com/736x/c2/0c/14/c20c149286a0b0bf25c3d8c5fa444a1f.jpg', 
        colors: [
          { name: 'Pure White', hex: '#ffffff', image: 'https://i.pinimg.com/736x/c2/0c/14/c20c149286a0b0bf25c3d8c5fa444a1f.jpg' }
        ] 
      }
    ],
    favorites: [],
    cart: []
  }),
  actions: {
    toggleFavorite(product) {
      const index = this.favorites.findIndex(p => p.id === product.id)
      if (index > -1) {
        this.favorites.splice(index, 1)
      } else {
        this.favorites.push(product)
      }
    },
    addToCart(item) {
      this.cart.push(item)
    }
  }
})