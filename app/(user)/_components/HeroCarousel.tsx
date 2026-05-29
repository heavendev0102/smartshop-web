"use client";
import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Product } from "@/app/util/type";
import { useRouter } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel";
type HeroCarouselProps = {
  slides: Product[];
};

export default function HeroCarousel({ slides, }: HeroCarouselProps) {
  const router = useRouter();
  const plugin = React.useMemo(() => Autoplay({ delay: 4000, stopOnInteraction: true, }), []);

  // Dynamic backgrounds
  const backgrounds = [
    {
      bg: "from-[#0f172a] to-[#1e293b]", // dark slate + blue
      text: "text-white",
      subText: "text-slate-300",
      button: "bg-blue-500 text-white hover:bg-blue-600",
    },
    {
      bg: "from-[#1e1b4b] to-[#312e81]", // deep indigo purple
      text: "text-white",
      subText: "text-indigo-200",
      button: "bg-white text-black hover:bg-indigo-200",
    },
    {
      bg: "from-[#042f2e] to-[#064e3b]", // deep emerald green
      text: "text-white",
      subText: "text-emerald-200",
      button: "bg-white text-black hover:bg-emerald-100",
    },
    {
      bg: "from-[#3b0764] to-[#4c1d95]", // deep purple violet
      text: "text-white",
      subText: "text-purple-200",
      button: "bg-white text-black hover:bg-purple-200",
    },
  ];

  return (
    <Carousel
      plugins={[plugin]}
      opts={{ loop: true }}
      className="w-full"
      onMouseEnter={() => plugin.stop()}
      onMouseLeave={() => plugin.reset()}
    >
      <CarouselContent>
        {slides.map((slide, index) => {
          const theme = backgrounds[index % backgrounds.length];

          return (
            <CarouselItem key={slide.id}>
              <section
                className={`
              bg-linear-to-r ${theme.bg} ${theme.text}
              h-[85vh]
              rounded-3xl
              mx-3
              my-4
              p-4 sm:p-6 lg:p-8
              flex items-center
              overflow-hidden
              relative
            `}
              >
                {/* BACKGROUND EFFECTS */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute w-96 h-96 bg-white/10 blur-3xl rounded-full -top-24 -left-24" />
                  <div className="absolute w-96 h-96 bg-white/10 blur-3xl rounded-full -bottom-24 -right-24" />
                </div>

                <div className="max-w-7xl mx-auto w-full h-full px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center h-full">

                    {/* LEFT CONTENT */}
                    <div className="flex flex-col justify-center text-center lg:text-left h-full py-6">

                      {/* CATEGORY */}
                      <p
                        className={`
                      uppercase tracking-[5px]
                      text-sm font-semibold
                      ${theme.subText}
                    `}
                      >
                        {slide.categories?.[0]?.name || "Featured Product"}
                      </p>

                      {/* TITLE */}
                      <h1
                        className="
                      mt-5
                      text-4xl
                      sm:text-5xl
                      lg:text-6xl
                      xl:text-7xl
                      font-light
                      leading-tight
                      line-clamp-2
                      min-h-[150px]
                    "
                      >
                        {slide.name}
                      </h1>

                      {/* DESCRIPTION */}
                      <p
                        className={`
                      mt-6
                      max-w-xl
                      text-base
                      sm:text-lg
                      leading-relaxed
                      ${theme.subText}
                      line-clamp-3
                      min-h-[90px]
                    `}
                      >
                        {slide.name ||
                          "Discover premium performance, cutting-edge technology, and a seamless experience designed for modern lifestyles."}
                      </p>

                      {/* PRICE */}
                      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-8 min-h-[60px]">

                        {slide.discount_percent > 0 ? (
                          <>
                            {/* Current Price */}
                            <span className="text-4xl font-bold">
                              ${slide.current_price}
                            </span>

                            {/* Original Price */}
                            <span
                              className={`line-through text-lg ${theme.subText}`}
                            >
                              ${slide.original_price}
                            </span>

                            {/* Discount */}
                            <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-semibold">
                              {slide.discount_percent}% OFF
                            </span>
                          </>
                        ) : (
                          <span className="text-4xl font-bold">
                            ${slide.original_price}
                          </span>
                        )}
                      </div>

                      {/* BUTTONS */}
                      <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mt-10">

                        <button
                          className={`
                        ${theme.button}
                        px-8 py-3
                        rounded-xl
                        font-medium
                        transition-all
                        duration-300
                        shadow-lg
                      `}
                          onClick={() => {
                            router.push(`/ProductDetail/${slide.id}`);
                          }}
                        >
                          View Product
                        </button>

                        <button
                          className={`
                        px-8 py-3
                        rounded-xl
                        transition-all
                        duration-300
                        border
                        ${theme.text === "text-white"
                              ? "border-white/30 text-white hover:bg-white hover:text-black"
                              : "border-black/20 text-black hover:bg-black hover:text-white"
                            }
                      `}
                          onClick={() => {
                            router.push(
                              `/Catalog/${slide.categories?.[0]?.slug}`
                            );
                          }}
                        >
                          Explore Category
                        </button>
                      </div>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="relative flex items-center justify-center lg:justify-end h-full">

                      {/* Glow */}
                      <div className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] bg-white/20 blur-3xl rounded-full" />

                      <Image
                        src={slide.image_url}
                        alt={slide.name}
                        width={500}
                        height={500}
                        priority
                        className="
                      relative z-10
                      w-64
                      sm:w-80
                      md:w-96
                      lg:w-[430px]
                      h-[430px]
                      object-contain
                      transition-transform
                      duration-700
                      hover:scale-105
                    "
                      />
                    </div>
                  </div>
                </div>
              </section>
            </CarouselItem>
          );
        })}
      </CarouselContent>

      {/* PREVIOUS BUTTON */}
      <CarouselPrevious
        className="
      left-6
      bg-white/20
      backdrop-blur-md
      border-white/20
      text-black
      hover:bg-white
      hover:text-black
      shadow-xl
    "
      />

      {/* NEXT BUTTON */}
      <CarouselNext
        className="
      right-6
      bg-white/20
      backdrop-blur-md
      border-white/20
      text-black
      hover:bg-white
      hover:text-black
      shadow-xl
    "
      />
    </Carousel>
  );
}