'use client';
import { Suspense } from "react";
import { products } from "@/app/util/data";
import { useSearchParams } from 'next/navigation';
import { notFound } from "next/navigation";
import Breadcrumb from "@/app/user/_components/Breadcrumb";
import Image from "next/image";
import ProductCard from "./ProductCard";
import { Product } from "@/app/util/type";
import useCartStore from "@/app/store/cartStore";
import { Check } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

function ProductDetail() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const product = products.find((p) => p.id.toString() === id);
  const { addToCart, openCart, cartItems } = useCartStore();
  const [showError, setShowError] = useState(false);
  
  if (!product) return notFound();
  const relatedProducts = products.filter((p) => p.company === product.company && p.id !== product.id).slice(0, 4);
  const handleAddToCart = (product: Product, qty: number) => {
    addToCart(product, qty);
    openCart();
  }

  const isAdded = cartItems.some(item => item.id === product.id);
  const isOutOfStock = (product?.stock ?? 0) === 0;

const handleBuyNow = (product: Product, qty: number) => {
   
    const currentUser = localStorage.getItem("currentUser");
            if (!currentUser) {
               router.push("/login");
               return;
            }
    if ((product?.stock ?? 0) === 0) {
      setShowError(true);
      return;
    }
    const existingItem = cartItems.find(
      (item) => item.id === product?.id
    );

    if (!existingItem && product) {
      addToCart(product, qty);
    }
    router.push("/user/CheckOut");
  };

  return (
    <>
    <Suspense fallback={<div>Loading...</div>}>
      <Breadcrumb category={product?.category} company={product?.company} product={product?.name} />
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-2 mt-15">
        <div className="flex gap-4">
          <div className="w-full h-112.5 flex items-center justify-center bg-gray-50 rounded-xl">
            <Image
              alt={product.name}
              src={product.image}
              width={500}
              height={500}
              className="max-w-full max-h-full object-contain cursor-pointer"
            />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xl font-semibold">Rs.{product.price}</span>
            {
              product.discount! > 0 && (
                <span className="line-through text-gray-400">
                  Rs.{product.price + (product.price * product.discount!) / 100}
                </span>
              )
            }

            {
              product.discount! > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {`${product.discount}% OFF`}
                </span>
              )
            }

          </div>
          <div className="mt-4">
            <p className="mb-2">{product.description} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non in laudantium debitis commodi amet, ipsa aut doloremque itaque illum praesentium sequi saepe harum cum quae maxime, ad asperiores tenetur unde!</p>
            <p className="mb-2">Company: {product.company}</p>
          </div>
          <div className="flex items-center gap-4 mt-6 flex-wrap">
            <button className="border px-5 py-2 rounded whitespace-nowrap">
              Add to Wishlist
            </button>
            <button
              onClick={() => handleAddToCart(product!, 1)}
              disabled={isAdded || product?.stock === 0}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg min-w-40 transition-all duration-200
    ${isAdded
                  ? "bg-green-600 text-white cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800"
                }`}>
              {product?.stock === 0 ? (
                "Out of Stock"
              ) : isAdded ? (
                <>
                  <Check size={18} />
                  Added to cart
                </>) : ("Add to Cart")}
            </button>
          </div>
          <button
            onClick={() => handleBuyNow(product!, 1)}
            className={`mt-5 text-black px-6 py-3 rounded-lg font-semibold ${isOutOfStock
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-yellow-500"
              }`}
          >
            Buy Now
          </button>

          {showError && isOutOfStock && (
            <p className="text-red-500 mt-2 text-sm">
              Product is out of stock
            </p>
          )}
          <div className="mt-6 grid grid-cols-3 gap-3 text-sm text-gray-600">
            <div>🚚 Free Delivery</div>
            <div className={product.stock > 10 ? "text-green-600" : product.stock === 0 ? "text-red-600" : "text-yellow-600"}>
              📦  {product.stock > 10 && "In Stock"}
              {product.stock <= 10 && product.stock > 0 && "Only few left!"}
              {product.stock === 0 && "Out of Stock"}</div>
            <div>💰 30 Days Return Policy</div>
          </div>
        </div>
      </div>
      <div className="pb-5 border-t-2 mt-10">
        <p className='font-medium text-center text-[36px] mt-10 ml-20'>Related Products</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-3 gap-x-3 mt-10 ml-13">
          {relatedProducts?.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}</div>
      </div>
      </Suspense>
    </>
  );
}

export default ProductDetail;