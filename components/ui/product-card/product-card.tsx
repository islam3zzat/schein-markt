import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ProductPrice } from "./product-price";
import { Product } from "@/types/product";

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-0 items-center">
        <Link href={`/products/${product.slug}`} />
        <Image
          src={product.images[0]}
          alt={product.name}
          width={300}
          height={300}
          priority
        />
      </CardHeader>
      <CardContent className="p-4 grid gap-4">
        <div className="text-xs">{product.brand}</div>
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-sm font-medium">{product.name}</h2>
        </Link>
        <div className="flex-between gap-4">
          <p>{product.rating} stars</p>
          <ProductPrice stock={product.stock} price={product.price} />
        </div>
      </CardContent>
    </Card>
  );
};
