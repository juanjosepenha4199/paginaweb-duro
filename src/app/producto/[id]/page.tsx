import ProductoDetalle from './ProductoDetalle';

export default function Page({ params }: { params: { id: string } }) {
  return <ProductoDetalle id={params.id} />;
} 