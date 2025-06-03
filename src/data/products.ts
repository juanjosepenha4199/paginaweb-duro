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
    name: 'Camiseta "Tu Papá"',
    price: 65000,
    colors: ['Negro', 'Blanco', 'Gris'],
    sizes: ['M', 'L', 'XL'],
    image: '/legobatman.png',
    hoverImage: '/legorobin.png',
  },
  {
    id: 2,
    name: 'Camiseta "No Pain No Gain"',
    price: 70000,
    colors: ['Negro', 'Rojo', 'Blanco'],
    sizes: ['M', 'L', 'XL'],
    image: '/legobatman.png',
    hoverImage: '/legorobin.png',
  },
  {
    id: 3,
    name: 'Camiseta "Street Flow"',
    price: 75000,
    colors: ['Azul Marino', 'Gris Oscuro', 'Negro'],
    sizes: ['M', 'L', 'XL'],
    image: '/legobatman.png',
    hoverImage: '/legorobin.png',
  },
  {
    id: 4,
    name: 'Camiseta "Urban Warrior"',
    price: 68000,
    colors: ['Negro', 'Verde Militar', 'Gris'],
    sizes: ['M', 'L', 'XL'],
    image: '/legobatman.png',
    hoverImage: '/legorobin.png',
  },
  {
    id: 5,
    name: 'Camiseta "Street King"',
    price: 72000,
    colors: ['Blanco', 'Negro', 'Rojo'],
    sizes: ['M', 'L', 'XL'],
    image: '/legobatman.png',
    hoverImage: '/legorobin.png',
  },
  {
    id: 6,
    name: 'Camiseta "Urban Legend"',
    price: 69000,
    colors: ['Gris', 'Negro', 'Azul'],
    sizes: ['M', 'L', 'XL'],
    image: '/legobatman.png',
    hoverImage: '/legorobin.png',
  },
  {
    id: 7,
    name: 'Camiseta "Street Style"',
    price: 65000,
    colors: ['Negro', 'Blanco', 'Gris'],
    sizes: ['M', 'L', 'XL'],
    image: '/legobatman.png',
    hoverImage: '/legorobin.png',
  },
  {
    id: 8,
    name: 'Camiseta "Urban Beast"',
    price: 75000,
    colors: ['Negro', 'Rojo', 'Verde Militar'],
    sizes: ['M', 'L', 'XL'],
    image: '/legobatman.png',
    hoverImage: '/legorobin.png',
  },
  {
    id: 9,
    name: 'Camiseta "Street Power"',
    price: 68000,
    colors: ['Blanco', 'Negro', 'Gris'],
    sizes: ['M', 'L', 'XL'],
    image: '/legobatman.png',
    hoverImage: '/legorobin.png',
  },
  {
    id: 10,
    name: 'Camiseta "Urban Master"',
    price: 72000,
    colors: ['Negro', 'Azul Marino', 'Gris'],
    sizes: ['M', 'L', 'XL'],
    image: '/legobatman.png',
    hoverImage: '/legorobin.png',
  },
  {
    id: 11,
    name: 'Camiseta "Street Boss"',
    price: 69000,
    colors: ['Negro', 'Rojo', 'Blanco'],
    sizes: ['M', 'L', 'XL'],
    image: '/legobatman.png',
    hoverImage: '/legorobin.png',
  },
  {
    id: 12,
    name: 'Camiseta "Urban King"',
    price: 75000,
    colors: ['Gris', 'Negro', 'Verde Militar'],
    sizes: ['M', 'L', 'XL'],
    image: '/legobatman.png',
    hoverImage: '/legorobin.png',
  },
  {
    id: 13,
    name: 'Camiseta "Street Legend"',
    price: 68000,
    colors: ['Negro', 'Blanco', 'Azul'],
    sizes: ['M', 'L', 'XL'],
    image: '/legobatman.png',
    hoverImage: '/legorobin.png',
  },
  {
    id: 14,
    name: 'Camiseta "Urban Warrior Pro"',
    price: 72000,
    colors: ['Negro', 'Gris', 'Rojo'],
    sizes: ['M', 'L', 'XL'],
    image: '/legobatman.png',
    hoverImage: '/legorobin.png',
  },
  {
    id: 15,
    name: 'Camiseta "Street Master"',
    price: 69000,
    colors: ['Blanco', 'Negro', 'Verde Militar'],
    sizes: ['M', 'L', 'XL'],
    image: '/legobatman.png',
    hoverImage: '/legorobin.png',
  }
]; 