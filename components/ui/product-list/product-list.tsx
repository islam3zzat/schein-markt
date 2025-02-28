// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderProduct = (product: any) => {
  return <div key={product.slug}>{product.name}</div>;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductsGrid = ({ products }: { products: Array<any> }) => {
  if (products.length === 0)
    return (
      <div>
        <p>No products found</p>
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map(renderProduct)}
    </div>
  );
};
export const ProductList = ({
  products,
  title,
  limit,
}: {
  products: any;
  title?: string;
  limit?: number;
}) => {
  const limitedProducts = limit ? products.slice(0, limit) : products;
  return (
    <div className="my-10">
      <h1 className="h2-bold mb-4">{title}</h1>
      <ProductsGrid products={limitedProducts} />
    </div>
  );
};
