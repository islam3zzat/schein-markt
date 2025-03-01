import { ProductCard } from "../product-card";
import { Product } from "@/types/product";

const ProductsGrid = ({ products }: { products: Array<Product> }) => {
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
export const ProductList = ({
  products,
  title,
}: {
  products: Product[];
  title?: string;
}) => {
  return (
    <div className="my-10">
      <h1 className="h2-bold mb-4">{title}</h1>
      <ProductsGrid products={products} />
    </div>
  );
};
