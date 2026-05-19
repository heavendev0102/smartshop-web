import { Product as productType } from "@/app/util/type";
import { useState } from "react";
export interface FilterProps {
  allProducts: productType[];
  setProducts: (data: productType[]) => void;
  category: string;
}


export default function FilterSidebar({ allProducts, setProducts, category }: FilterProps) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
//   const brandsForCategory = [
//   ...new Set(
//     allProducts
//       .filter(p => p.category === category)
//       .map(p => p.company)
//   )
// ];
  const handleBrandChange = (brand: string) => {
    const updated = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];

    setSelectedBrands(updated);

    // const filtered =
    //   updated.length === 0
    //     ? allProducts
    //     : allProducts.filter((p) => updated.includes(p.company!));

    // setProducts(filtered);
  };

  return (
    <div className="w-full lg:w-72 bg-white p-4 mt-5 rounded-md shadow-sm">
      <h3 className="font-semibold mb-2">Brand</h3>

      <div className="space-y-2 text-sm max-h-80 overflow-y-auto">
        {/* {brandsForCategory.map((brand) => (
          <label key={brand} className="flex items-center gap-2">
            <input
              type="checkbox"
              onChange={() => handleBrandChange(brand!)}
            />
            {brand}
          </label>
        ))} */}
      </div>

    </div>
  );
}