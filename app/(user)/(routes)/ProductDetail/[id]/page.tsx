'use client';
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import api from "@/app/util/apiClient";
// import { notFound } from "next/navigation";
import Breadcrumb from "../../../_components/Breadcrumb";
import Image from "next/image";
import ProductCard from "../../../_components/ProductCard";
import { Product, BackendCartItem } from "@/app/util/type";
import useCartStore from "@/app/store/cartStore";
// import { Check } from "lucide-react";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
import { useWishlist } from "@/app/hook/useWishList";
import { CategorySlug, SectionSlug } from "@/app/util/type";
import { useQuery } from "@tanstack/react-query";
const Page = () => {
  
  const params = useParams();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(false);
  // const router = useRouter();
  const { addToCart, openCart } = useCartStore();
  const { id } = params;

  const wishlistItem = wishlist.find(
    (item: BackendCartItem) =>
      item.product.id == Number(id)
  );

  const isWishlisted = !!wishlistItem;
  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(wishlistItem.id);
    } else {
      addToWishlist(product.id);
    }
  };
  useEffect(() => {
    if (!id) return;

    const fetchRecommendedProducts = async () => {
      try {
        setLoadingRelated(true);

        const response = await api.get(
          `api/v1/products/${id}/recommended`
        );

        setRelatedProducts(response.data);
        console.log("relatedProducts :==== " + relatedProducts);
      } catch (error) {
        console.error("Failed to fetch recommended products:", error);
      } finally {
        setLoadingRelated(false);
      }
    };

    fetchRecommendedProducts();
  }, [id]);
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
    return <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center gap-4">

        <div className="w-14 h-14 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>

        <p className="text-lg font-medium text-gray-700">
          Loading product...
        </p>
      </div>
    </div>
  }

  if (error) {
    return <h1>Error fetching product</h1>;
  }
  console.log(product.name);

  // const product = products.find((p) => p.id.toString() === id);

  // const [showError, setShowError] = useState(false);

  // if (!product) return notFound();
  // const relatedProducts = products.filter((p) => p.company === product.company && p.id !== product.id).slice(0, 4);
  // const handleAddToCart = (product: Product, qty: number) => {
  //   addToCart(product, qty);
  //   openCart();
  // }
  const handleAddToCart = async (product: Product, qty: number) => {
    await addToCart(product, qty);
    openCart();
  };

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
        <Breadcrumb
          category={product?.category}
          company={product?.company}
          product={product?.name}
        />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

          {/* PRODUCT SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-16 items-center">

            {/* LEFT SIDE */}
            <div className="bg-gray-50 rounded-3xl p-4 sm:p-6 md:p-8 flex items-center justify-center shadow-sm">
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                <Image
                  alt={product.name}
                  src={product.image_url}
                  width={500}
                  height={500}
                  className="w-full h-auto object-contain transition duration-300 hover:scale-105"
                />
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div>

              {/* TAGS */}
              <div className="flex flex-wrap gap-2 mb-4">

                {product.categories?.map((cat: CategorySlug) => (
                  <span
                    key={cat.id}
                    className="bg-blue-100 text-blue-700 text-xs sm:text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {cat.name}
                  </span>
                ))}

                {product.sections?.map((sec: SectionSlug) => (
                  <span
                    key={sec.name}
                    className="bg-orange-100 text-orange-700 text-xs sm:text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {sec.name}
                  </span>
                ))}
              </div>

              {/* PRODUCT NAME */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>

              {/* PRICE */}
              <div className="flex flex-wrap items-center gap-3 mt-6">

                {product.discount_percent > 0 ? (
                  <>
                    <span className="text-3xl sm:text-4xl font-bold text-black">
                      ₹{product.current_price}
                    </span>

                    <span className="line-through text-gray-500 text-lg sm:text-xl">
                      ₹{product.original_price}
                    </span>

                    <span className="bg-red-500 text-white text-xs sm:text-sm px-3 py-1 rounded-full font-semibold">
                      {product.discount_percent}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-3xl sm:text-4xl font-bold">
                    ₹{product.original_price}
                  </span>
                )}
              </div>

              {/* DESCRIPTION */}
              <p className="mt-6 text-gray-600 text-sm sm:text-base leading-7">
                Experience next-gen gaming with ultra-fast load times,
                stunning visuals, and smooth gameplay performance.
              </p>

              {/* PRODUCT INFO */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">

                <div className="border rounded-2xl p-5">
                  <p className="text-sm text-gray-500 mb-1">
                    Status
                  </p>

                  <p
                    className={`font-semibold ${product.is_active
                        ? "text-green-600"
                        : "text-red-600"
                      }`}
                  >
                    {product.is_active
                      ? "Available"
                      : "Unavailable"}
                  </p>
                </div>

                <div className="border rounded-2xl p-5">
                  <p className="text-sm text-gray-500 mb-1">
                    Customer Rating
                  </p>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-yellow-500">
                      ★★★★★
                    </span>

                    <span className="text-sm text-gray-400">
                      No ratings yet
                    </span>
                  </div>
                </div>

              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <button
                  onClick={() => handleAddToCart(product, 1)}
                  className="w-full sm:w-auto bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition font-medium"
                >
                  Add to Cart
                </button>

                <button
                  onClick={handleWishlist}
                  className={`w-full sm:w-auto px-8 py-3 rounded-xl transition font-medium
              ${isWishlisted
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "border border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  {isWishlisted
                    ? "♥ Wishlisted"
                    : "♡ Add to Wishlist"}
                </button>

              </div>

              {/* FEATURES */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">

                <div className="border rounded-2xl p-5 text-center">
                  <p className="text-3xl">🚚</p>

                  <p className="mt-2 text-sm font-medium">
                    Free Delivery
                  </p>
                </div>

                <div className="border rounded-2xl p-5 text-center">
                  <p className="text-3xl">💰</p>

                  <p className="mt-2 text-sm font-medium">
                    30 Days Return
                  </p>
                </div>

                <div className="border rounded-2xl p-5 text-center">
                  <p className="text-3xl">🔒</p>

                  <p className="mt-2 text-sm font-medium">
                    Secure Payment
                  </p>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <section className="border-t mt-12 py-12">

          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

            <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-semibold mb-10">
              Related Products
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">

              {relatedProducts?.map((product: Product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}

            </div>

          </div>

        </section>
      </Suspense>
    </>
  );
}

export default Page;