import { Metadata } from 'next';
import ProductoDetalle from '@/components/ProductoDetalle';

export const metadata: Metadata = {
  title: 'Detalle del Producto',
  description: 'Detalles del producto seleccionado',
};

type Props = {
  params: { id: string };
};

export default function Page(props: Props) {
  return <ProductoDetalle id={props.params.id} />;
} 