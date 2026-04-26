'use client';

import { motion } from 'framer-motion';
import { hoverScaleCard, hoverScaleImage } from "./animations";

interface HotelCardProps {
  city: string;
  description: string;
  imageUrl?: string;
}

export function HotelCard({ city, description, imageUrl }: HotelCardProps) {
  return (
    <motion.article
      className="flex flex-col shrink-0 w-[359px] overflow-hidden"
      style={{
        backgroundColor: "var(--color-bg-page)",
        boxShadow: "var(--elevation-card)",
      }}
      {...hoverScaleCard}
    >
      {/* Image */}
      <div className="relative h-[349px] w-full overflow-hidden">
        <motion.img
          src={imageUrl}
          alt={city}
          className="absolute inset-0 w-full h-full object-cover"
          {...hoverScaleImage}
        />
      </div>

      {/* Card body */}
      <div
        className="flex flex-col gap-2 p-4 border-t"
        style={{ borderColor: "var(--color-border-default)" }}
      >
        <h3
          className="leading-none"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--size-h3)",
            letterSpacing: "0px",
            color: "var(--color-text-primary)",
          }}
        >
          {city}
        </h3>
        <p
          className="text-[14px] leading-5 tracking-[1.68px]"
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-text-secondary)",
          }}
        >
          {description}
        </p>
      </div>
    </motion.article>
  );
}
