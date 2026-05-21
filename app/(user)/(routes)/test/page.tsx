import Image from "next/image";

 function Page() {
  return (
    <Image
      src="https://placehold.co/600x600/ede9fe/5b21b6?text=iPhone+14+Pro"
      alt="test"
      width={300}
      height={300}
    />
  );
}

export default Page

//  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-2 mt-15">
//           <div className="flex gap-4">
//             <div className="w-full h-112.5 flex items-center justify-center bg-gray-50 rounded-xl">
//               <div className="w-full max-w-[400px]">
//                 <Image
//                   alt={product.name}
//                   src={product.image_url}
//                   width={400}
//                   height={400}
//                   className="w-full h-auto object-contain cursor-pointer"
//                 />
//               </div>
//             </div>
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold">{product.name}</h1>
//             <div className="flex items-center gap-3 mt-2">
//               <span className="text-xl font-semibold">Rs.{product.original_price}</span>
//               {
//                 product.discount_percent! > 0 && (
//                   <span className="line-through text-gray-400">
//                     Rs.{product.current_price}
//                   </span>
//                 )
//               }

//               {
//                 product.discount! > 0 && (
//                   <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
//                     {`${product.discount_percent}% OFF`}
//                   </span>
//                 )
//               }

//             </div>
//             <div className="mt-4">
//               <p className="mb-2">{product.description} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non in laudantium debitis commodi amet, ipsa aut doloremque itaque illum praesentium sequi saepe harum cum quae maxime, ad asperiores tenetur unde!</p>
             
//             </div>
//             <div className="flex items-center gap-4 mt-6 flex-wrap">
//               <button className="border px-5 py-2 rounded whitespace-nowrap">
//                 Add to Wishlist
//               </button>
//            <button
//               onClick={() => handleAddToCart(product!, 1)}
//               disabled={isAdded || product?.stock === 0}
//               className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg min-w-40 transition-all duration-200
//     ${isAdded
//                   ? "bg-green-600 text-white cursor-not-allowed"
//                   : "bg-black text-white hover:bg-gray-800"
//                 }`}>
//               {product?.stock === 0 ? (
//                 "Out of Stock"
//               ) : isAdded ? (
//                 <>
//                   <Check size={18} />
//                   Added to cart
//                 </>) : ("Add to Cart")}
//             </button> 
//             </div>
//              <button
//             onClick={() => handleBuyNow(product!, 1)}
//             className={`mt-5 text-black px-6 py-3 rounded-lg font-semibold ${isOutOfStock
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-yellow-500"
//               }`}
//           >
//             Buy Now
//           </button> 

//              {showError && isOutOfStock && (
//             <p className="text-red-500 mt-2 text-sm">
//               Product is out of stock
//             </p>
//           )} 
//             <div className="mt-6 grid grid-cols-3 gap-3 text-sm text-gray-600">
//               <div>🚚 Free Delivery</div>
//              <div className={product.stock > 10 ? "text-green-600" : product.stock === 0 ? "text-red-600" : "text-yellow-600"}>
//               📦  {product.stock > 10 && "In Stock"}
//               {product.stock <= 10 && product.stock > 0 && "Only few left!"}
//               {product.stock === 0 && "Out of Stock"}</div> 
//               <div>💰 30 Days Return Policy</div>
//             </div>
//           </div>
//         </div>