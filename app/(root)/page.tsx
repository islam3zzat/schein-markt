import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ProductList } from "@/components/ui/product-list/product-list";
import { getLatestProducts } from "@/lib/actions/product-actions";

export const metadata: Metadata = {
  title: "Home",
};

const HomePage = async () => {
  const products = await getLatestProducts();

  return (
    <>
      <ProductList products={products} title="Newest Arrivals" />
      <Button>ScheinMarkt</Button>
    </>
  );
};

export default HomePage;
