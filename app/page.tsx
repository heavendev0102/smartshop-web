"use client"
import { getStorefront } from "@/app/services/getStorefront";
import Image from "next/image";
import phoneImage from "../public/Home/image.png";
import SSD from "../public/Home/ssd.png";
import Apro from "../public/Home/Apro.png";
import phone_of_section2 from "../public/Home/phone_of_section2.png";
import headphone from "../public/Home/headphone.png";
import { ProductType, StorefrontResponse, Product } from "@/app/util/type";
import { products, homeConfig } from "@/app/util/data";
import ProductCard from "./(user)/_components/ProductCard";
import productBanner from "../public/Home/banner.png";
import FeaturedProducts from "./(user)/_components/FeatureProductCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {

    const [storeData, setStoreData] = useState<StorefrontResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedType, setSelectedType] = useState("new_arrivals");
    const router = useRouter();
    const productTabs = [
        {
            key: "new_arrivals",
            label: storeData?.new_arrivals?.name || "New Arrivals",
        },
        {
            key: "bestsellers",
            label: storeData?.bestsellers?.name || "Bestsellers",
        },
        {
            key: "featured",
            label: storeData?.featured?.name || "Featured",
        },
    ];

    const allProducts: Product[] = [
        ...(storeData?.new_arrivals?.products || []),
        ...(storeData?.bestsellers?.products || []),
        ...(storeData?.featured?.products || []),
    ];

    const uniqueProducts = Array.from(
        new Map(
            allProducts.map((product) => [
                product.id,
                product,
            ])
        ).values()
    );

    const filteredProducts = uniqueProducts.filter((product) =>
        product.sections.some(
            (section) => section.slug === selectedType
        )
    );

    const discountProducts = uniqueProducts.filter(
        (product) => product.discount_percent >= 50
    );

    const fetchStoreData = async () => {
        try {
            const data = await getStorefront();
            setStoreData(data);
        } catch (error) {
            console.log("Error fetching storefront:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            fetchStoreData();
        }, 0)
    }, []);
    if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="flex flex-col items-center gap-4">
                
                <div className="w-14 h-14 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>

                <p className="text-lg font-medium text-gray-700">
                    Loading store...
                </p>
            </div>
        </div>
    );
}

    const featuredProducts =
    storeData?.featured?.products?.slice(0, 4) || [];

    const heroProduct = products.find(p => p.id === homeConfig.heroId);
    const homeProducts = homeConfig.featuredIds
        .map(id => products.find(p => p.id === id))
        .filter(Boolean);
    const ps5 = homeProducts[0];
    const airpods = homeProducts[1];
    const vision = homeProducts[2];
    const macbook = homeProducts[3];
    return (
        <>
            <section className="bg-linear-to-r from-[#211C24] to-black text-white min-h-[55vh] md:min-h-[65vh] lg:min-h-[75vh] flex items-center overflow-hidden">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <div className="text-center md:text-left">
                            <p className="  text-sm  sm:text-base  lg:text-lg  text-gray-400  font-semibold  tracking-wide  pt-3"> Pro.Beyond. </p>
                            <h1 className=" mt-3  text-4xl  sm:text-5xl  md:text-6xl  lg:text-[72px]  font-light  leading-tight" >
                                <span className="font-thin text-gray-300"> iPhone 14 </span>{" "}
                                <span className="font-semibold text-white"> Pro</span>
                            </h1>
                            <p className=" text-gray-400   mt-5  max-w-md  mx-auto md:mx-0  text-sm  sm:text-base  lg:text-lg  leading-relaxed ">
                                {heroProduct?.description}
                            </p>
                            <button className="  mt-8  border  border-white/30  px-8  py-3  rounded-xl  hover:bg-white  hover:text-black  transition-all  duration-300 " onClick={() => router.push(`/ProductDetail?id=${heroProduct?.id}`)}> View Details </button>
                        </div>

                        <div className="relative flex justify-center md:justify-end">
                            <Image src={heroProduct?.image || phoneImage} alt={heroProduct?.name || "Hero Product"} width={300} height={400} priority className="  w-55 sm:w-72   md:w-88   lg:w-107.5  xl:w-120  h-auto  object-contain  transition-transform  duration-700  hover:scale-105"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className="grid grid-cols-1 lg:grid-cols-2 ">
                <div className="flex flex-col">
                    <div className="flex flex-col sm:flex-row items-center bg-white p-6 gap-6" onClick={() => router.push(`/ProductDetail?id=${ps5?.id}`)}>
                        <Image src={ps5?.image || SSD} alt="" width={160} height={160} className="w-40 sm:w-56 object-contain  transition-transform
            duration-700 hover:scale-105" />
                        <div>
                            <p className="text-2xl sm:text-4xl  font-extrabold">{ps5?.name}</p>
                            <p className="text-lg text-gray-600 mt-3 max-w-md">
                                {ps5?.description}
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                        <div className="flex items-center bg-gray-200 p-6 gap-4" onClick={() => router.push(`/ProductDetail?id=${airpods?.id}`)}>
                            <Image src={airpods?.image || headphone} alt="" width={112} height={112} className="w-28 object-contain  transition-transform
            duration-700 hover:scale-105" />
                            <div>
                                <p className="text-2xl font-semibold">{airpods?.name?.split(" ").slice(0, -1).join(" ")} <span className="font-extrabold">{airpods?.name?.split(" ").slice(-1)[0]}</span></p>
                                <p className="text-md text-gray-600 mt-2">
                                    {airpods?.description}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center bg-[#353535] text-white p-6 gap-4" onClick={() => router.push(`/ProductDetail?id=${vision?.id}`)}>
                            <Image src={vision?.image || Apro} alt="" width={112} height={112} className="w-28 object-contain  transition-transform
            duration-700 hover:scale-105" />
                            <div>
                                <p className="text-2xl font-semibold">
                                    {vision?.name}
                                </p>
                                <p className="text-md mt-2 text-gray-300">
                                    {vision?.description}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="flex  justify-center bg-gray-100 p-6 md:p-10 gap-6" onClick={() => router.push(`/ProductDetail?id=${macbook?.id}`)}>

                    <div className="pt-45">
                        <p className="text-3xl sm:text-5xl">
                            <span className="font-light">{macbook?.name?.split(" ").slice(0, -1).join(" ")}</span>{" "}
                            <span className="font-bold">{macbook?.name?.split(" ").slice(-1)[0]}</span>
                        </p>

                        <p className="text-lg text-gray-600 mt-4 max-w-md">
                            {macbook?.description}
                        </p>
                    </div>
                    <Image src={phone_of_section2} alt="" width={300} height={480} className="w-full h-120 max-w-sm object-contain mx-auto  transition-transform
            duration-700 hover:scale-105" />
                </div>

            </section>
            <section className="bg-gray-100 py-8 px-4 md:px-10 lg:px-20">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                        Browse By Category
                    </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
                    {storeData?.categories?.map((category) => (
                        <div
                            key={category.id}
                            className="bg-white rounded-2xl p-5 flex flex-col items-center justify-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-100"
                        >
                            <div className="relative w-16 h-16 mb-4">
                                <Image
                                    src={category.icon_url}
                                    alt={category.name}
                                    fill
                                    unoptimized
                                    className="object-contain"
                                />
                            </div>

                            <h3 className="text-sm md:text-base font-semibold text-gray-800 text-center">
                                {category.name}
                            </h3>
                        </div>
                    ))}
                </div>
            </section>
            <section className="bg-white px-4 md:px-10 lg:px-20 py-16">
                <div className="p-6">

                    <div className="flex gap-6 mb-8 text-lg font-bold text-gray-800 flex-wrap">
                        {productTabs.map((tab) => {

                            const isActive =
                                selectedType === tab.key;

                            return (
                                <button
                                    key={tab.key}
                                    onClick={() =>
                                        setSelectedType(
                                            tab.key as ProductType
                                        )
                                    }
                                    className={`px-4 py-2 border-b-2 transition-all duration-300 cursor-pointer
                                ${isActive
                                            ? "border-black text-black"
                                            : "border-transparent text-gray-500 hover:text-black hover:border-gray-400"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">

                        {filteredProducts
                            .slice(0, 4)
                            .map((product, i) => (
                                <div
                                    key={product.id}
                                    className="opacity-0 animate-fadeIn"
                                    style={{
                                        animationDelay: `${i * 0.1}s`,
                                    }}
                                >
                                    <ProductCard product={product} />
                                </div>
                            ))}

                    </div>
                </div>
            </section>
            <section className=""> <FeaturedProducts products={featuredProducts} /> </section>
            <section className="bg-gray-100 px-4 md:px-10 lg:px-20 py-16">
                <div className="p-6">
                    <h1 className=" p-5 text-2xl font-bold ">Discounts up to -50%</h1>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {
                            discountProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))
                        }
                    </div>
                </div>
            </section>
            <Image src={productBanner} alt="banner" className="w-full h-auto mt-5 object-cover" />
        </>
    )
}

export default Page
//
