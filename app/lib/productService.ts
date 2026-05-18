import { products } from "@/app/util/data";

export const getProducts = (category?: string) => {
  console.log("Fetching products for category:", category);
  if (!category) return products;
  return products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
};



// <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12">

//     {/* LEFT (TABLE) */}
//     <div className="lg:col-span-2">

//       <div className="bg-white rounded-2xl shadow-sm p-4">

//         <table className="w-full">

//           <thead>
//             <tr className="bg-gray-200 rounded-xl text-sm md:text-base">
//               <th className="p-4 text-left rounded-l-xl">Product</th>
//               <th className="p-4 text-left">Price</th>
//               <th className="p-4 text-left">Quantity</th>
//               <th className="p-4 text-left">Subtotal</th>
//               <th className="rounded-r-xl"></th>
//             </tr>
//           </thead>

//           <tbody>
//             {cartItems.length === 0 ? (
//               <tr>
//                 <td colSpan={5} className="text-center py-16 text-gray-500 text-lg">
//                   🛒 Your cart is empty
//                 </td>
//               </tr>
//             ) : (
//               cartItems.map((product) => (
//                 <tr key={product.id} className="border-b">

//                   <td className="p-4 flex items-center gap-4">
//                     <Image src={product.image} width={70} height={70} className="rounded-lg" alt="" />
//                     <span>{product.name}</span>
//                   </td>

//                   <td className="p-4">₹{product.price}</td>

//                   <td className="p-4">
//                     {/* qty control here */}
//                   </td>

//                   <td className="p-4 font-semibold">
//                     ₹{product.price * product.quantity}
//                   </td>

//                   <td className="p-4">
//                     <Trash className="cursor-pointer text-gray-400 hover:text-red-500" />
//                   </td>

//                 </tr>
//               ))
//             )}
//           </tbody>

//         </table>

//       </div>
//     </div>

//     {/* RIGHT (SIDEBAR) */}
//     <div className="lg:sticky lg:top-24 h-fit">

//       <div className="bg-white rounded-2xl shadow-lg p-6 border">

//         <p className="text-sm text-gray-600 flex items-center gap-2">
//           <CircleCheckBig className="text-green-500" size={16} />
//           FREE Delivery available
//         </p>

//         <div className="border-t my-4"></div>

//         <div className="flex justify-between">
//           <span>Subtotal ({getTotalQty()} items)</span>
//           <span>₹{totalPrice}</span>
//         </div>

//         <div className="flex justify-between text-sm text-gray-500 mt-2">
//           <span>Delivery</span>
//           <span className="text-green-600">FREE</span>
//         </div>

//         <div className="border-t my-4"></div>

//         <div className="flex justify-between font-semibold text-lg">
//           <span>Total</span>
//           <span>₹{totalPrice}</span>
//         </div>

//         <button className="w-full mt-6 bg-black text-white py-3 rounded-xl hover:bg-gray-800">
//           Proceed to Checkout
//         </button>

//       </div>
//     </div>

//   </div>