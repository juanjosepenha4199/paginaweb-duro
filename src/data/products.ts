export interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  hoverImage?: string;
  colors: string[];
  sizes: string[];
}

// Mock product data (replace with API call later)
export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Camiseta Urban 1',
    price: 60000,
    colors: ['Negro', 'Blanco'],
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/legobatman.png', // Updated image path
    hoverImage: '/legorobin.png', // Updated hover image path
  },
  {
    id: 2,
    name: 'Camiseta Urban 2',
    price: 65000,
    colors: ['Gris', 'Rojo'],
    sizes: ['M', 'L'],
    image: '/placeholder2.png',
    hoverImage: '/placeholder2_hover.png',
  },
  {
    id: 3,
    name: 'Camiseta Urban 3',
    price: 70000,
    colors: ['Azul'],
    sizes: ['L', 'XL'],
    image: '/placeholder3.png',
    hoverImage: '/placeholder3_hover.png',
  },
  {
    id: 4,
    name: 'Camiseta Urban 4',
    price: 60000, colors: ['Azul'], sizes: ['M'], image: '/placeholder4.png', hoverImage: '/placeholder4_hover.png'
  },
  {
    id: 5,
    name: 'Camiseta Urban 5',
    price: 29990, colors: ['Verde'], sizes: ['S', 'L'], image: '/placeholder5.png', hoverImage: '/placeholder5_hover.png'
  },
  {
    id: 6,
    name: 'Camiseta Urban 6',
    price: 29990, colors: ['Amarillo'], sizes: ['M', 'XL'], image: '/placeholder6.png', hoverImage: '/placeholder6_hover.png'
  },
]; 