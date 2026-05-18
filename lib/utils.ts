import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//-----------------------------loading---------------------------------------------

   //grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center
                        // loading ? (

                        //     <div className="flex justify-center items-center gap-2 w-200">
                        //         <div className="animate-spin rounded-full h-5 w-5 border-b-2 ml-100 border-gray-900"></div>
                        //         <span className="text-sm font-medium text-gray-700">Loading...</span>
                        //     </div>

                        // ) : (


//-----------------------------product details---------------------------------------------




                        {/* Battery Capacity 
      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggle("battery")}
        >
          <h3 className="font-semibold">Battery capacity</h3>
          <ChevronDown
            className={`w-4 h-4 transition ${open.battery ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      Screen Type 
      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggle("screen")}
        >
          <h3 className="font-semibold">Screen type</h3>
          <ChevronDown
            className={`w-4 h-4 transition ${open.screen ? "rotate-180" : ""}`}
          />
        </div>
      </div>

       Memory 
      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggle("memory")}
        >
          <h3 className="font-semibold">Built-in memory</h3>
          <ChevronDown
            className={`w-4 h-4 transition ${open.memory ? "rotate-180" : ""}`}
          />
        </div>
      </div>*/}


      //-------------------------------------------------------------------------
        {/* Storage */}
          {/* <div className="mt-4">
          <p className="mb-2">Storage:</p>
          <div className="flex gap-2">
            {product.storage.map((s, i) => (
              <button
                key={i}
                className="px-3 py-1 border rounded hover:bg-black hover:text-white"
              >
                {s}
              </button>
            ))}
          </div>
        </div> */}

//------------------------------------------------------------------------
                    {/* <div className="flex gap-2">
            {product.colors.map((color, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full border cursor-pointer"
                style={{ backgroundColor: color }}
              />
            ))}
          </div> */}