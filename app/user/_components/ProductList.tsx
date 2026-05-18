import { Product } from "@/app/util/type"
import ProductCard from "./ProductCard"

const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <div className="w-full">

      <h1 className="text-lg text-gray-500 mb-4">
        Selected products:{" "}
        <span className="text-black">{products.length}</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-5">
        {products.length > 0 ? (
          products.map((product, i) => (
            <div key={product.id} className="animate-fadeIn" style={{ animationDelay: `${i * 0.1}s` }}>
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-lg">No products found</p>
        )}
      </div>

    </div>
  );
};

export default ProductList