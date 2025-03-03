import { ProductCard } from "../product-card";
import { Product } from "@/types/product";
export const ProductsGrid = ({ products }: { products: Array<Product> }) => {
  if (products.length === 0)
    return (
      <div>
        <p>No products found</p>
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product: Product) => {
        return <ProductCard key={product.slug} product={product} />;
      })}
    </div>
  );
};
