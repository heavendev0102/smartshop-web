'use client';
import ProductDetail from "../../_components/ProductDetail";
import { Suspense } from "react";
function Page() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductDetail />
      </Suspense>
    </>
  );
}

export default Page;