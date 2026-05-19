"use client";
import { OldProduct as productType } from "@/app/util/type";
import { useState } from "react";
import FilterSidebar from "./FilterSidebar";
import ProductList from "./ProductList";

export default function CatalogLayout({ initialProducts , category }: { initialProducts: productType[]; category: string }) {
  const [products, setProducts] = useState(initialProducts);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 px-4 lg:px-10">

      {/* Sidebar */}
      <div className="lg:col-span-1">
        {/* <FilterSidebar
          allProducts={initialProducts}
          setProducts={setProducts}
          category={category}
        /> */}
      </div>

      {/* Products */}
      <div className="lg:col-span-3">
        {/* <ProductList products={products} /> */}
      </div>

    </div>
  );
}