"use client"
import { getStorefront } from "@/app/services/getStorefront";
import Image from "next/image";
import { ProductType, StorefrontResponse, Product } from "@/app/util/type";
import ProductCard from "./(user)/_components/ProductCard";
import FeaturedProducts from "./(user)/_components/FeatureProductCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import HeroCarousel from "./(user)/_components/HeroCarousel";
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
    const heroSlides = uniqueProducts.filter((p) =>
        p.categories.some((c) => c.slug === "phones")
    ).slice(0, 4);
    console.log(heroSlides);
    const featuredProducts =  storeData?.featured?.products?.slice(0, 4) || [];
    return (
        <>
            <HeroCarousel slides={heroSlides} />
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
                            onClick={() => router.push(`/Catalog/${category.slug}`)}
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
        </>
    )
}

export default Page
//
