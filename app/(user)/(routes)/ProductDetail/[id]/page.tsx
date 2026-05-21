'use client';
import { useParams } from "next/navigation";
import { Suspense } from "react";
import api from "@/app/util/apiClient";
// import { notFound } from "next/navigation";
import Breadcrumb from "../../../_components/Breadcrumb";
import Image from "next/image";
// import ProductCard from "../../../_components/ProductCard";
// import { Product } from "@/app/util/type";
// import useCartStore from "@/app/store/cartStore";
// import { Check } from "lucide-react";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
import { CategorySlug, SectionSlug } from "@/app/util/type";
import { useQuery } from "@tanstack/react-query";
const Page = () => {
  const params = useParams();
  // const router = useRouter();
  const { id } = params;
  console.log("id := ", id);
  const { data: product, isLoading, error } = useQuery({
    queryKey: ["products", id],

    queryFn: async () => {
      const res = await api.get(
        `/api/v1/products/${id}`
      );
      return res.data;
    },
  });
  
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error fetching product</h1>;
  }
  console.log(product.name);

  // const product = products.find((p) => p.id.toString() === id);
  // const { addToCart, openCart, cartItems } = useCartStore();
  // const [showError, setShowError] = useState(false);

  // if (!product) return notFound();
  // const relatedProducts = products.filter((p) => p.company === product.company && p.id !== product.id).slice(0, 4);
  // const handleAddToCart = (product: Product, qty: number) => {
  //   addToCart(product, qty);
  //   openCart();
  // }

  // const isAdded = cartItems.some(item => item.id === product.id);
  // const isOutOfStock = (product?.stock ?? 0) === 0;

  // const handleBuyNow = (product: Product, qty: number) => {

  //     const currentUser = localStorage.getItem("currentUser");
  //             if (!currentUser) {
  //                router.push("/login");
  //                return;
  //             }
  //     if ((product?.stock ?? 0) === 0) {
  //       setShowError(true);
  //       return;
  //     }
  //     const existingItem = cartItems.find(
  //       (item) => item.id === product?.id
  //     );

  //     if (!existingItem && product) {
  //       addToCart(product, qty);
  //     }
  //     router.push("/CheckOut");
  //   };

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Breadcrumb category={product?.category} company={product?.company} product={product?.name} />
        <div className="max-w-7xl mx-auto px-4 py-10 mt-3">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* LEFT SIDE */}
            <div className="bg-gray-50 rounded-3xl p-6 flex items-center justify-center shadow-sm">

              <div className="w-full max-w-100">
                <Image
                  alt={product.name}
                  src={product.image_url}
                  width={400}
                  height={400}
                  className="w-full h-auto object-contain hover:scale-105 transition duration-300"
                />
              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col justify-center">

              {/* CATEGORY */}
              <div className="flex gap-2 flex-wrap mb-3">
                {
                  product.categories?.map((cat: CategorySlug) => (
                    <span
                      key={cat.id}
                      className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {cat.name}
                    </span>
                  ))
                }

                {
                  product.sections?.map((sec: SectionSlug) => (
                    <span
                      key={sec.name}
                      className="bg-orange-100 text-orange-700 text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {sec.name}
                    </span>
                  ))
                }
              </div>

              {/* PRODUCT NAME */}
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>

              {/* PRICE */}
              <div className="flex items-center gap-3 mt-5 flex-wrap">

                <span className="text-4xl font-bold text-black">
                  ${product.current_price}
                </span>

                <span className="text-xl text-gray-400 line-through">
                  ${product.original_price}
                </span>

                <span className="bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                  {product.discount_percent}% OFF
                </span>

              </div>

              {/* DESCRIPTION */}
              <p className="text-gray-600 mt-6 leading-7">
                Experience next-gen gaming with ultra-fast load times,
                stunning visuals, and smooth gameplay performance.
              </p>

              {/* PRODUCT INFO */}
              <div className="grid grid-cols-2 gap-4 mt-8">

                <div className="border rounded-2xl p-4">
                  <p className="text-sm text-gray-500">Status</p>

                  <p className="font-semibold text-green-600">
                    {product.is_active ? "Available" : "Unavailable"}
                  </p>
                </div>

                <div className="border rounded-2xl p-4">
                  <p className="text-sm text-gray-500">
                    Customer Rating
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-yellow-500 text-lg">
                      ☆☆☆☆☆
                    </span>

                    <span className="text-sm text-gray-400">
                      No ratings yet
                    </span>
                  </div>
                </div>

              </div>

              {/* BUTTONS */}
              <div className="flex gap-4 mt-8 flex-wrap">

                <button className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition">
                  Add to Cart
                </button>

                <button className="border border-gray-300 px-8 py-3 rounded-xl hover:bg-gray-100 transition">
                  Wishlist
                </button>

              </div>

              {/* EXTRA FEATURES */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">

                <div className="border rounded-2xl p-4 text-center">
                  <p className="text-2xl">🚚</p>

                  <p className="text-sm mt-2 font-medium">
                    Free Delivery
                  </p>
                </div>

                <div className="border rounded-2xl p-4 text-center">
                  <p className="text-2xl">💰</p>

                  <p className="text-sm mt-2 font-medium">
                    30 Days Return
                  </p>
                </div>

                <div className="border rounded-2xl p-4 text-center">
                  <p className="text-2xl">🔒</p>

                  <p className="text-sm mt-2 font-medium">
                    Secure Payment
                  </p>
                </div>

              </div>

            </div>
          </div>
        </div>
        <div className="pb-5 border-t-2 mt-10">
          <p className='font-medium text-center text-[36px] mt-10 ml-20'>Related Products</p>
          {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-y-3 gap-x-3 mt-10 ml-13">
          {relatedProducts?.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}</div> */}
        </div>
      </Suspense>
    </>
  );
}

export default Page;