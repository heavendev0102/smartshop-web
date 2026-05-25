"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/app/util/type";

export default function SummerProducts({ featuredProducts }: { featuredProducts: Product[] }) {

    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    // Auto change every 5 sec
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) =>
                prev === featuredProducts.length - 1 ? 0 : prev + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [featuredProducts.length]);

    const currentProduct = featuredProducts[currentIndex];

    return (
        <section

            className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#211C24] mb-2 via-[#1f1f1f] to-black min-h-130 cursor-pointer"
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 z-10" />

            {/* Main Content */}
            <div className="relative z-20 flex flex-col md:flex-row items-center justify-between min-h-130 px-8 md:px-20">

                {/* LEFT TEXT */}
                <div className="max-w-xl text-center md:text-left">

                    <p className="uppercase tracking-[6px] text-gray-400 text-sm mb-4">
                        Summer Collection 2026
                    </p>

                    <h1 className="text-5xl md:text-7xl text-white font-light leading-tight">
                        Big Summer{" "}
                        <span className="font-bold">Sale</span>
                    </h1>

                    <p className="text-gray-300 mt-6 text-lg leading-relaxed">
                        {currentProduct?.name}
                    </p>

                    <div className="flex items-center gap-4 mt-8 justify-center md:justify-start">
                        <span className="text-4xl font-bold text-white">
                            ₹{currentProduct?.current_price}
                        </span>

                        <span className="line-through text-gray-400 text-xl">
                            ₹{currentProduct?.original_price}
                        </span>
                    </div>

                    <button className="mt-10 border border-white text-white px-10 py-4 rounded-xl hover:bg-white hover:text-black transition-all duration-300" onClick={() =>
                        router.push(`/ProductDetail/${currentProduct?.id}`)}>
                        Discover More
                    </button>
                </div>

                {/* RIGHT IMAGE */}
                <div className="relative mt-10 md:mt-0">
                    <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full" />
                    <Image
                        src={currentProduct?.image_url}
                        alt={currentProduct?.name}
                        width={420}
                        height={420}
                        className="relative z-20 object-contain transition-all duration-700 hover:scale-105" onClick={() =>
                            router.push(`/ProductDetail/${currentProduct?.id}`)
                        }
                    />
                </div>
            </div>
            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                {featuredProducts.map((_, index) => (
                    <button
                        key={index}
                        onClick={(e) => {
                            e.stopPropagation();
                            setCurrentIndex(index);
                        }}
                        className={`h-3 rounded-full transition-all duration-300 ${currentIndex === index
                                ? "w-10 bg-white"
                                : "w-3 bg-gray-500"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}