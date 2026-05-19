// export default function Loading() {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md">
      
//       <div className="flex flex-col items-center gap-4">
        
//         {/* Spinner */}
//         <div className="h-14 w-14 rounded-full border-4 border-white/30 border-t-white animate-spin"></div>

//         {/* Text */}
//         <p className="text-white text-sm tracking-wide">
//           Loading...
//         </p>

//       </div>
//     </div>
//   );
// }

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 overflow-hidden">
      <div className="h-full w-1/2 bg-blue-500 animate-pulse"></div>
    </div>
  );
}