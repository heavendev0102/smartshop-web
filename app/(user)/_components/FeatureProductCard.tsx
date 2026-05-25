"use client";
import { Product } from "@/app/util/type";
import { useRouter } from "next/navigation";
import Image from "next/image";

const FeaturedProducts = ({
    products,
}: {
    products: Product[];
}) => {
    const router = useRouter();
    const mainProduct = products[0];
    const sideProducts = products.slice(1);
    function productDetails(id: string) {
        router.push(`/ProductDetail/${id}`);
    }

    return (
        <section className="bg-[#211C24] py-10 md:py-16 lg:py-20 overflow-hidden">
            <div className="max-w-480 mx-auto px-4 sm:px-6 lg:px-10">

                {/* Heading */}
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
                            Premium Collection
                        </p>

                        <h2 className="text-3xl md:text-5xl font-bold text-white mt-3">
                            Featured Products
                        </h2>
                    </div>
                </div>

                {/* TOP ROW */}
                <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
                    <div
                        onClick={() =>
                            productDetails(mainProduct.id.toString())
                        }
                        className=" group bg-zinc-100 rounded-[2rem] p-6 lg:p-8  min-h-70 lg:min-h-85  flex  flex-col md:flex-row  items-center  justify-between gap-8  overflow-hidden  cursor-pointer  transition-all  duration-500  hover:-translate-y-1"
                    >
                        {/* content */}
                        <div className="flex-1">
                            <p className="text-lg uppercase tracking-[0.3em] text-gray-500">
                                Featured
                            </p>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4">
                                {mainProduct.name}
                            </h2>

                            <p className="text-gray-600 mt-5 text-lg leading-relaxed max-w-md">
                                {mainProduct.name}
                            </p>

                            <div className="mt-6 flex items-center gap-4 flex-wrap">
                                <p className="text-3xl font-bold">
                                    ${mainProduct.original_price}
                                </p>

                                {Number(mainProduct.current_price)! > 0 && (
                                    <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full">
                                        {mainProduct.discount_percent}% OFF
                                    </span>
                                )}
                            </div>
                        </div>


                        <div className="relative w-full md:w-[40%] h-55 lg:h-75">
                            <Image
                                src={mainProduct.image_url}
                                alt={mainProduct.name}
                                fill
                                className=" object-contain transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>


                    {sideProducts[0] && (
                        <div
                            onClick={() =>
                                productDetails(sideProducts[0].id.toString())
                            }
                            className="  group bg-zinc-200 rounded-[2rem]  p-6  lg:p-8  min-h-70 lg:min-h-85 flex flex-col  justify-between  overflow-hidden  cursor-pointer transition-all duration-500 hover:-translate-y-1 "
                        >
                            <div>
                                <p className="text-lg uppercase tracking-[0.2em] text-gray-500">
                                    Premium
                                </p>

                                <h3 className="text-3xl font-bold mt-4 leading-tight">
                                    {sideProducts[0].name}
                                </h3>

                                <p className="text-gray-600 mt-5 text-lg line-clamp-3">
                                    {sideProducts[0].name}
                                </p>
                            </div>

                            <div className="relative w-full h-50 mt-6">
                                <Image
                                    src={sideProducts[0].image_url}
                                    alt={sideProducts[0].name}
                                    fill
                                    className=" object-contain transition-transform  duration-700 group-hover:scale-105 "
                                />
                            </div>
                        </div>
                    )}
                </div>


                {/* BOTTOM ROW */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-5">

                    {sideProducts.slice(1, 3).map((product) => (
                        <div
                            key={product.id}
                            onClick={() =>
                                productDetails(product.id.toString())
                            }
                            className=" group bg-white rounded-[2rem] p-5 lg:p-6 border border-zinc-200 overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1">
                            <div className="flex justify-between items-start gap-4">

                                {/* LEFT CONTENT */}
                                <div className="flex flex-col flex-1">

                                    <p className="text-md uppercase tracking-[0.2em] text-gray-500">
                                        Trending
                                    </p>

                                    <h3 className="text-xl lg:text-3xl font-bold mt-2 leading-tight">
                                        {product.name}
                                    </h3>

                                    <p className="text-lg text-gray-600 mt-3 line-clamp-2">
                                        {product.name}
                                    </p>

                                    {/* PRICE */}
                                    <div className="mt-4">
                                        <p className="text-2xl font-bold">
                                            ${product.original_price}
                                        </p>

                                        {Number(product.current_price)! > 0 && (
                                            <span className="inline-block mt-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                                {product.discount_percent}% OFF
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* IMAGE */}
                                <div className=" relative w-35  sm:w-42  lg:w-55 h-35 sm:h-42  lg:h-55 shrink-0 -mt-4 -mr-4 ">
                                    <Image
                                        src={product.image_url}
                                        alt={product.name}
                                        fill
                                        className=" object-contain transition-transform  duration-700  group-hover:scale-110  " />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;