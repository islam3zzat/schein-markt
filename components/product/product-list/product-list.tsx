import { Product } from "@/types/product";
import { ProductsGrid } from "./products-grid";

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
