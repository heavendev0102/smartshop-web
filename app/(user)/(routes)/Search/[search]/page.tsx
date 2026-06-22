import ProductCard from "../../../_components/ProductCard";
import { Product } from "@/app/util/type";
import api from "@/app/util/apiClient";
type Props = {
    params: Promise<{
        search: string;
    }>;
};

async function Page({ params }: Props) {
    const { search } = await params;
    console.log("PROPS:", params);
    const response = await api.get(
        `/api/v1/products/search?q=${search}`
    );
    const products = await response.data;
    console.log("Search results:", products);

    return (
       <>
  {products.length !== 0 && (<div className="text-center py-8 px-4">
    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
      Search Results
    </h1>
    <p className="mt-2 text-sm sm:text-base text-gray-500">
      Showing results for
      <span className="font-semibold text-black ml-1">
        {search}
      </span>
    </p>
    <div className="mt-4 w-24 h-1 mx-auto rounded-full bg-black" />
  </div>)}

  <div className="flex justify-center px-4 sm:px-6 lg:px-8 pb-10">
  {products.length === 0 ? (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">🔍</div>

      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
        No Products Found
      </h2>

      <p className="mt-3 text-gray-500 max-w-md">
        We not find any products matching
        <span className="font-semibold text-black"> {search}</span>.
      </p>

      <p className="mt-2 text-sm text-gray-400">
        Try different keywords or check the spelling.
      </p>
    </div>
  ) : (
    <div className="flex flex-wrap justify-center gap-5 sm:gap-6 max-w-480">
      {products.map((product: Product) => (
        <div
          key={product.id}
          className="
            w-full
            max-w-70
            sm:max-w-72.5
            md:max-w-75
            shrink-0
            transition-transform
            duration-300
            hover:-translate-y-1
          "
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )}
</div>
</>
    );
}

export default Page