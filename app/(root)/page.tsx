import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import sampleData from "@/db/sample-data";
import { ProductList } from "@/components/ui/product-list/product-list";

export const metadata: Metadata = {
  title: "Home",
};

const HomePage = async () => {
  console.log(sampleData);
  return (
    <>
      <ProductList
        products={sampleData.products}
        title="Newest Arrivals"
        limit={4}
      />
      <Button>ScheinMarkt</Button>
    </>
  );
};

export default HomePage;
