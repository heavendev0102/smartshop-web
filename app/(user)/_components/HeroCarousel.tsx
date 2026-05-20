"use client";
import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { useRouter } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { StaticImageData } from "next/image";

type Slide = {
  title: string;
  subtitle: string;
  description: string;
  image: string | StaticImageData; 
  productId?: number;
};

type HeroCarouselProps = {
  slides: Slide[];
};

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  const router = useRouter();

  // Create plugin only once
  const plugin = React.useMemo(
    () =>
      Autoplay({
        delay: 3000,
        stopOnInteraction: true,
      }),
    []
  );

  return (
    <Carousel
      plugins={[plugin]}
      opts={{ loop: true }}
      className="w-full"
      onMouseEnter={() => plugin.stop()}
      onMouseLeave={() => plugin.reset()}
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <section className="bg-linear-to-r from-[#211C24] to-black text-white min-h-[55vh] md:min-h-[65vh] lg:min-h-[75vh] flex items-center overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                  {/* Left Content */}
                  <div className="text-center md:text-left">
                    <p className="text-sm sm:text-base lg:text-lg text-gray-400 font-semibold tracking-wide pt-3">
                      {slide.subtitle}
                    </p>

                    <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-light leading-tight">
                      {slide.title}
                    </h1>

                    <p className="text-gray-400 mt-5 max-w-md mx-auto md:mx-0 text-sm sm:text-base lg:text-lg leading-relaxed">
                      {slide.description}
                    </p>

                    <button
                      className="mt-8 border border-white/30 px-8 py-3 rounded-xl hover:bg-white hover:text-black transition-all duration-300"
                      onClick={() => {
                        if (slide.productId) {
                          router.push(`/ProductDetail?id=${slide.productId}`);
                        }
                      }}
                    >
                      View Details
                    </button>
                  </div>

                  {/* Right Image */}
                  <div className="relative flex justify-center md:justify-end">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      width={300}
                      height={400}
                      priority
                      className="w-55 sm:w-72 md:w-88 lg:w-107.5 xl:w-120 h-auto object-contain transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </section>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="left-4 bg-white/10 border-white/20 text-white hover:bg-white hover:text-black" />
      <CarouselNext className="right-4 bg-white/10 border-white/20 text-white hover:bg-white hover:text-black" />
    </Carousel>
  );
}