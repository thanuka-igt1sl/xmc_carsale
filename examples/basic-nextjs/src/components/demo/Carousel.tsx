"use client";
import { useState } from "react";
import { Item } from "@sitecore-content-sdk/nextjs";

interface Fields {
  Imagelist: Item[];
}

export default function Carousel({ fields }: { fields: Fields }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide
      ? fields.Imagelist.length - 1
      : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === fields.Imagelist.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative group w-full max-w-[800px] h-[500px] mx-auto overflow-hidden rounded-2xl">
      {/* The Carousel Loop */}
      <div
        className="flex w-full h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {fields.Imagelist.map((item, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            <img
              src={item.url}
              alt={item.displayName || `Slide ${index}`}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/60 transition"
      >
        Prev
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/60 transition"
      >
        Next
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {fields.Imagelist.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === index ? "bg-white w-8" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
