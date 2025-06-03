import ProductoDetalle from '@/components/ProductoDetalle';

export default function Page({ params }: { params: { id: string } }) {
  return <ProductoDetalle id={params.id} />;
} 