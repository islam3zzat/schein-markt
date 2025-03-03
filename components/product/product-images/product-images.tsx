"use client";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = { images: string[] };
export const ProductImages = ({ images }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const currentIndex = 0;
  return (
    <div className="space-y-4">
      <Image
        src={images[currentIndex]}
        alt="Product image"
        width={1_000}
        height={1_000}
        priority
        className="min-h-[300px] object-cover object-center"
      />

      <div className="flex">
        {images.map((image, index) => {
          return (
            <Image
              onClick={() => setCurrentIndex(index)}
              key={index}
              src={image}
              alt="image"
              width={100}
              height={100}
              priority
              className={cn(
                "w-16 h-16 object-cover object-center border border-gray-200 cursor-pointer hover:border-orange-600",
                index === currentIndex && "border-orange-500"
              )}
            />
          );
        })}
      </div>
    </div>
  );
};
