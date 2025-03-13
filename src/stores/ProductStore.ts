import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { IProduct } from '@/models/ICategory'

export const useProductStore = defineStore('products', () => {
  const products = ref<IProduct[] | null>()
  const items = reactive([
    {
      id: 1,
      name: 'MacBook Pro',
      raiting:1,
      price: 2499,
      tags: ['Tag 1', 'Tag 2', 'Tag 3'],
      imgUrls: [
        'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mac-card-40-macbookpro-14-16-202410?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1731974949535',
        'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mac-card-40-macbookpro-14-16-202410?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1731974949535',
        'https://dummyimage.com/600x500/ccc/aaa'
      ],
      description: 'Premium laptop for professionals and creatives.14-inch Retina display, M1 Pro chip, up to 64GB RAM, 512GB SSD.',
      categoryId: 1,
      createdAt: Date.now()+ Math.floor(Math.random() * 1000),
      isConfirmed: true,
      stockAmount: 0,
    },
    {
      id: 2,
      name: 'iMac',
      raiting:2,
      price: 1799,
      tags: ['Tag 1', 'Tag 2', 'Tag 6'],
      imgUrls: [
        'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mac-card-40-imac-202410?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1731974953703',
        'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mac-card-40-imac-202410?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1731974953703'
      ],
      description: 'All-in-one desktop with sleek design and powerful performance. 24-inch 4.5K Retina display, Apple M1 chip, 256GB SSD, 8GB RAM.',
      categoryId: 1,
      createdAt: Date.now()+ Math.floor(Math.random() * 1000),
      isConfirmed: true,
      stockAmount: 9,
    },
    {
      id: 3,
      name: 'Mac mini',
      raiting:3,
      price: 699,
      tags: ['Tag 2', 'Tag 3', 'Tag 5', 'Tag 6'],
      imgUrls: ['https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mac-mini-digitalmat-gallery-3-202410?wid=728&hei=666&fmt=png-alpha&.v=1728341423793'],
      description: 'Compact and powerful desktop for everyday tasks and more. Apple M2 chip, 8GB RAM, 256GB SSD, macOS Ventura.',
      categoryId: 1,
      createdAt: Date.now()+ Math.floor(Math.random() * 1000),
      isConfirmed: true,
      stockAmount: 60,
    },
    {
      id: 4,
      name: 'MacBook Air',
      raiting:4,
      price: 999,
      tags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 5', 'Tag 6'],
      imgUrls: ['https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mac-card-40-macbook-air-202410?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1731974970795'],
      description: 'Ultra-light and portable laptop with long battery life. 13-inch Retina display, Apple M2 chip, 8GB RAM, 256GB SSD.',
      categoryId: 1,
      createdAt: Date.now()+ Math.floor(Math.random() * 1000),
      isConfirmed: true,
      stockAmount: 55,
    },
    {
      id: 5,
      name: 'iPad Pro',
      raiting:5,
      price: 1099,
      tags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 5', 'Tag 6'],
      imgUrls: [
        'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-card-40-pro-202405?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1713920820026',
        'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-card-40-pro-202405?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1713920820026',
        'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-card-40-pro-202405?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1713920820026',

      ],
      description: 'The ultimate tablet for work, entertainment, and creativity. 12.9-inch Liquid Retina display, Apple M1 chip, 128GB storage.',
      categoryId: 2,
      createdAt: Date.now()+ Math.floor(Math.random() * 1000),
      isConfirmed: true,
      stockAmount: 80,
    },
    {
      id: 6,
      name: 'iPad Air',
      raiting:1,
      price: 599,
      tags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 5', 'Tag 6'],
      imgUrls: [
        'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-card-40-air-202405?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1713920820139',
        'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-card-40-air-202405?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1713920820139'
      ],
      description: 'Thin, light, and powerful tablet for everyday use. 10.9-inch Liquid Retina display, A14 Bionic chip, 64GB storage.',
      categoryId: 2,
      createdAt: Date.now()+ Math.floor(Math.random() * 1000),
      isConfirmed: true,
      stockAmount: 65,
    },
    {
      id: 7,
      name: 'iPad',
      raiting:1,
      price: 329,
      tags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 5', 'Tag 6'],
      imgUrls: ['https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-card-40-ipad-202410?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1727714411651'],
      description: 'Affordable tablet with everything you need for casual use. 10.2-inch Retina display, A13 Bionic chip, 32GB storage.',
      categoryId: 2,
      createdAt: Date.now()+ Math.floor(Math.random() * 1000),
      isConfirmed: true,
      stockAmount: 30,
    },
    {
      id: 8,
      name: 'iPad Mini',
      raiting:2,
      price: 499,
      tags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 5', 'Tag 6'],
      imgUrls: ['https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-card-40-ipad-mini-202410?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1727281366305'],
      description: 'Compact tablet with high-end performance in a small size. 8.3-inch Liquid Retina display, A15 Bionic chip, 64GB storage.',
      categoryId: 2,
      createdAt: Date.now()+ Math.floor(Math.random() * 1000),
      isConfirmed: true,
      stockAmount: 40,
    },
    {
      id: 9,
      name: 'iPhone 16 Pro',
      raiting:3,
      price: 1099,
      tags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 5', 'Tag 6'],
      imgUrls: [
        'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-card-40-iphone16prohero-202409?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1725567335931',
        'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-card-40-iphone16prohero-202409?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1725567335931',
        'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-card-40-iphone16prohero-202409?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1725567335931',
      ],
      description: 'The latest iPhone with a powerful A16 chip and stunning display. 6.7-inch OLED display, A16 Bionic chip, 128GB storage.',
      categoryId: 3,
      createdAt: Date.now()+ Math.floor(Math.random() * 1000),
      isConfirmed: true,
      stockAmount: 15,
    },
    {
      id: 10,
      name: 'iPhone 16',
      raiting:4,
      price: 799,
      tags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 5', 'Tag 6'],
      imgUrls: [
        'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-card-40-iphone16hero-202409?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1723234230295',
        'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-card-40-iphone16hero-202409?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1723234230295',
      ],
      description: 'Advanced smartphone with powerful features and sleek design. 6.1-inch OLED display, A15 Bionic chip, 64GB storage.',
      categoryId: 3,
      createdAt: Date.now()+ Math.floor(Math.random() * 1000),
      isConfirmed: true,
      stockAmount: 20,
    },
    {
      id: 11,
      name: 'iPhone 15',
      raiting:5,
      price: 899,
      tags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 5', 'Tag 6'],
      imgUrls: ['https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-card-40-iphone15hero-202309?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1693086290559'],
      description: 'Next-gen iPhone with improved performance and camera features. 6.1-inch Super Retina XDR display, A15 Bionic chip, 128GB storage.',
      categoryId: 3,
      createdAt: Date.now()+ Math.floor(Math.random() * 1000),
      isConfirmed: true,
      stockAmount: 50,
    },
    {
      id: 12,
      name: 'iPhone 14',
      raiting:1,
      price: 749,
      tags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 5', 'Tag 6'],
      imgUrls: ['https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-card-40-iphone14-202209?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1693086290654'],
      description: 'High-performance iPhone with enhanced camera system. 6.1-inch OLED display, A15 Bionic chip, 128GB storage.',
      categoryId: 3,
      createdAt: Date.now()+ Math.floor(Math.random() * 1000),
      isConfirmed: true,
      stockAmount: 45,
    },
    {
      id: 13,
      name: 'iPhone SE',
      raiting:2,
      price: 399,
      tags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 5', 'Tag 6'],
      imgUrls: ['https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-card-40-iphonese-202203?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1646415838921'],
      description: 'Compact and affordable smartphone with great performance. 4.7-inch Retina display, A13 Bionic chip, 64GB storage.',
      categoryId: 3,
      createdAt: Date.now()+ Math.floor(Math.random() * 1000),
      isConfirmed: true,
      stockAmount: 30,
    },
    {
      id: 14,
      name: 'Apple Watch Series',
      raiting:3,
      price: 399,
      tags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 5', 'Tag 6'],
      imgUrls: [
        'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/watch-card-40-s10-202409?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1724168059157',
        'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/watch-card-40-s10-202409?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1724168059157',
        'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/watch-card-40-s10-202409?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1724168059157',
      ],
      description: 'Stylish smartwatch with fitness tracking and notifications. 40mm GPS model, Retina display, 18-hour battery life.',
      categoryId: 4,
      createdAt: Date.now()+ Math.floor(Math.random() * 1000),
      isConfirmed: true,
      stockAmount: 25,
    },
    {
      id: 15,
      name: 'Apple Watch Ultra',
      raiting:4,
      price: 799,
      tags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 5', 'Tag 6'],
      imgUrls: [
        'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/watch-card-40-ultra2-202409_GEO_TR?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1725113866545',
        'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/watch-card-40-ultra2-202409_GEO_TR?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1725113866545',
      ],
      description: 'Rugged smartwatch designed for extreme sports and adventures. 49mm GPS model, dual-frequency GPS, 36-hour battery life.',
      categoryId: 4,
      createdAt: Date.now()+ Math.floor(Math.random() * 1000),
      isConfirmed: true,
      stockAmount: 50,
    },
    {
      id: 16,
      name: 'Apple Watch SE',
      raiting:5,
      price: 279,
      tags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 5', 'Tag 6'],
      imgUrls: ['https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/watch-card-40-se-202409?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1724168056018'],
      description: 'Affordable and feature-packed smartwatch with health tracking. 40mm GPS model, Retina display, 18-hour battery life.',
      categoryId: 4,
      createdAt: Date.now()+ Math.floor(Math.random() * 1000),
      isConfirmed: true,
      stockAmount: 40,
    },
    {
      id: 17,
      name: 'AirPods Pro 2',
      raiting:1,
      price: 249,
      tags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 5', 'Tag 6'],
      imgUrls: [
        'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-pro-2-hero-select-202409?wid=890&hei=890&fmt=jpeg&qlt=90&.v=1724041669458',
        'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-pro-2-hero-select-202409?wid=890&hei=890&fmt=jpeg&qlt=90&.v=1724041669458',
        'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-pro-2-hero-select-202409?wid=890&hei=890&fmt=jpeg&qlt=90&.v=1724041669458',
      ],
      description: 'Premium noise-cancelling earbuds with improved sound quality. Active Noise Cancellation, Transparency mode, 6 hours battery life.',
      categoryId: 5,
      createdAt: Date.now()+ Math.floor(Math.random() * 1000),
      isConfirmed: true,
      stockAmount: 60,
    },
    {
      id: 18,
      name: 'AirPods 4',
      raiting:2,
      price: 199,
      tags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 5', 'Tag 6'],
      imgUrls: [
        'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-4-anc-select-202409?wid=890&hei=890&fmt=jpeg&qlt=90&.v=1725502639798',
        'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-4-anc-select-202409?wid=890&hei=890&fmt=jpeg&qlt=90&.v=1725502639798',
      ],
      description: 'Wireless earbuds with high-quality sound and long battery life. Spatial audio, 5 hours battery life, Siri support.',
      categoryId: 5,
      createdAt: Date.now()+ Math.floor(Math.random() * 1000),
      isConfirmed: true,
      stockAmount: 30,
    },
    {
      id: 19,
      name: 'AirPods Max',
      raiting:3,
      price: 549,
      tags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 5', 'Tag 6'],
      imgUrls: ['https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-max-select-202409-midnight?wid=890&hei=890&fmt=jpeg&qlt=90&.v=1724927451276'],
      description: 'Over-ear headphones with exceptional sound and noise cancellation. Active Noise Cancellation, Spatial Audio, 20 hours battery life.',
      categoryId: 5,
      createdAt: Date.now()+ Math.floor(Math.random() * 1000),
      isConfirmed: true,
      stockAmount: 50,
    },
    {
      id: 20,
      name: 'Apple Pencil Pro',
      raiting:4,
      price: 699,
      tags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 5', 'Tag 6'],
      imgUrls: [
        'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MX2D3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1713841707336',
        'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MX2D3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1713841707336',
        'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MX2D3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1713841707336',
      ],
      description: 'An essential tool for digital artists and designers, offering precision and comfort for all your creative tasks. Highly responsive, pressure-sensitive tip for drawing and writing. Compatible with iPads and tablets, ergonomic design for extended use.',
      categoryId: 6,
      createdAt: Date.now()+ Math.floor(Math.random() * 1000),
      isConfirmed: true,
      stockAmount: 45,
    },
    {
      id: 21,
      name: 'iPad Pro Magic Keyboard',
      raiting:5,
      price: 699,
      tags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 5', 'Tag 6'],
      imgUrls: [
        'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MWR43TQ?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1713934215720',
        'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MWR43TQ?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1713934215720',
      ],
      description: 'A premium keyboard for the iPad Pro, combining sleek design with a responsive typing experience. Features a full-size keyboard, backlit keys, and a trackpad, making it ideal for productivity on the go. Sturdy and easy to attach to the iPad Pro.',
      categoryId: 6,
      createdAt: Date.now()+ Math.floor(Math.random() * 1000),
      isConfirmed: true,
      stockAmount: 32,
    },
    {
      id: 22,
      name: 'Studio Display',
      raiting:1,
      price: 399,
      tags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 5', 'Tag 6'],
      imgUrls: ['https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/studio-display-gallery-1-202203?wid=640&hei=528&fmt=p-jpg&qlt=95&.v=1675709041796'],
      description: '27-inch 5K Retina display with True Tone technology. Ideal for creative professionals needing precise color grading and high detail. 27-inch 5K Retina display with True Tone technology. Ideal for creative professionals needing precise color grading and high detail.',
      categoryId: 6,
      createdAt: Date.now()+ Math.floor(Math.random() * 1000),
      isConfirmed: true,
      stockAmount: 60,
    },
    {
      id: 23,
      name: 'Magic Keyboard',
      raiting:2,
      price: 1200,
      tags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 5', 'Tag 6'],
      imgUrls: ['https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MXK83TQ?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1729879576947'],
      description: 'A beautifully designed keyboard offering a smooth typing experience and enhanced functionality for your devices. Low-profile keys, stable and responsive, providing a comfortable typing experience. Perfect for both casual and professional use.',
      categoryId: 6,
      createdAt: Date.now()+ Math.floor(Math.random() * 1000),
      isConfirmed: true,
      stockAmount: 25,
    },
    {
      id: 24,
      name: 'Magic Mouse',
      raiting:3,
      price: 450,
      tags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 5', 'Tag 6'],
      imgUrls: ['https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MXK63?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1730508287136'],
      description: 'An elegant and ergonomic mouse that blends seamlessly with your workspace and offers smooth navigation.Multi-touch surface, compact design, and wireless connectivity make it perfect for everyday tasks. Long-lasting battery and comfortable to use.',
      categoryId: 6,
      createdAt: Date.now()+ Math.floor(Math.random() * 1000),
      isConfirmed: true,
      stockAmount: 40,
    },
    {
      id: 25,
      name: 'Magic Trackpad',
      raiting:4,
      price: 599,
      tags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 5', 'Tag 6'],
      imgUrls: ['https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MXKA3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1730508286011'],
      description: 'A refined trackpad offering precise control and multi-touch gestures, ideal for creative work and general navigation. Large, smooth glass surface allows for fluid gestures. Ideal for those who prefer trackpads over traditional mice, with precision and ease of use.',
      categoryId: 6,
      createdAt: Date.now()+ Math.floor(Math.random() * 1000),
      isConfirmed: true,
      stockAmount: 30,
    },
    {
      id: 26,
      name: 'AirTag',
      raiting:5,
      price: 199,
      tags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 5', 'Tag 6'],
      imgUrls: ['https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airtag-single-select-202104_FV1?wid=890&hei=740&fmt=jpeg&qlt=90&.v=1617761670000'],
      description: 'A small and powerful device that helps you track your valuables and never lose them again. Compact, lightweight design that fits easily onto keychains, bags, or other items. Use the Find My app to locate your things with ease.',
      categoryId: 6,
      createdAt: Date.now()+ Math.floor(Math.random() * 1000),
      isConfirmed: true,
      details: '',
      stockAmount: 80,
    }
  ])


  return { items, products }
})





