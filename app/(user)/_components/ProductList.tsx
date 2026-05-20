import { Product } from "@/app/util/type";
import ProductCard from "./ProductCard";

const ProductList = ({ products }: { products: Product[] }) => {
  const hasProducts = products.length > 0;

  return (
    <div className="w-full">
      {hasProducts && (
        <h1 className="text-lg text-gray-500 mb-4">
          Selected products:{" "}
          <span className="text-black font-semibold">
            {products.length}
          </span>
        </h1>
      )}

      {hasProducts ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-5">
          {products.map((product, i) => (
            <div
              key={product.id}
              className="animate-fadeIn"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full min-h-[50vh] flex items-center justify-center px-4 col-span-full lg:-ml-20">
          <div className="text-center max-w-md mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
              No Products Found
            </h2>

            <p className="mt-3 text-sm sm:text-base md:text-lg text-gray-500">
              Try changing your filters or selecting a different category.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;