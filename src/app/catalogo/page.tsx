import ProductCard from "@/components/ProductCard";

export default function Catalogo() {
  // Placeholder product data
  const products = [
    { id: 1, name: "Camiseta tu papá", price: 60000, colors: ['Negro'], sizes: ['M', 'L'], image: '/legobatman.png', hoverImage: '/legorobin.png' },
    { id: 2, name: "Camiseta Urban 2", price: 60000, colors: ['Blanco'], sizes: ['S', 'M'], image: '/placeholder2.png', hoverImage: '/placeholder2_hover.png' },
    { id: 3, name: "Camiseta Urban 3", price: 60000, colors: ['Rojo'], sizes: ['L', 'XL'], image: '/placeholder3.png', hoverImage: '/placeholder3_hover.png' },
    { id: 4, name: "Camiseta Urban 4", price: 60000, colors: ['Azul'], sizes: ['M'], image: '/placeholder4.png', hoverImage: '/placeholder4_hover.png' },
    { id: 5, name: "Camiseta Urban 5", price: 29990, colors: ['Verde'], sizes: ['S', 'L'], image: '/placeholder5.png', hoverImage: '/placeholder5_hover.png' },
    { id: 6, name: "Camiseta Urban 6", price: 29990, colors: ['Amarillo'], sizes: ['M', 'XL'], image: '/placeholder6.png', hoverImage: '/placeholder6_hover.png' },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Catálogo de Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            id={product.id} 
            name={product.name} 
            price={product.price}
            image={product.image}
            hoverImage={product.hoverImage}
          />
        ))}
      </div>
    </div>
  );
} 