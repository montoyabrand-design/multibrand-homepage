'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';
import type { UserType } from "@/tokens";
import { HotelCard } from "./HotelCard";
import { fadeUp, staggerContainer, staggerContainerDelayed, VP } from "./animations";

const hotels = [
  {
    city: "New York",
    description: "A landmark of refined elegance in the heart of Manhattan, where the city's energy meets serene luxury.",
    imageUrl: "/elyzior/newyork-hotel.png",
  },
  {
    city: "Paris",
    description: "Nestled along the Seine, a timeless Parisian escape where art de vivre is woven into every detail.",
    imageUrl: "/elyzior/paris-hotel.png",
  },
  {
    city: "Milano",
    description: "Italian elegance redefined — a luxurious palazzo nestled in the heart of the world's fashion capital.",
    imageUrl: "/elyzior/milano-hotel.png",
  },
  {
    city: "Monaco",
    description: "Monaco's elegance redefined, a modern palace of luxury in the heart of the Riviera.",
    imageUrl: "/elyzior/monaco-hotel.png",
  },
  {
    city: "Prague",
    description: "Experience the elegance of Prague, a modern palace of luxury nestled in the heart of this historic city.",
    imageUrl: "/elyzior/prague-hotel.png",
  },
];

const loyaltyOrder = ["Paris", "New York", "Monaco", "Milano", "Prague"];

const headerStagger = staggerContainer;
const cardStagger   = staggerContainerDelayed;

export function HotelsCarousel({ userType }: { userType: UserType }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const orderedHotels =
    userType === "loyalty"
      ? [...hotels].sort(
          (a, b) => loyaltyOrder.indexOf(a.city) - loyaltyOrder.indexOf(b.city)
        )
      : hotels;

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / orderedHotels.length;
    setActiveIndex(Math.round(el.scrollLeft / cardWidth));
  }, [orderedHotels.length]);

  return (
    <section
      className="relative overflow-hidden max-sm:pl-4 max-sm:pr-0"
      style={{
        backgroundColor: "var(--color-bg-surface)",
        paddingTop: "120px",
        paddingBottom: "120px",
        paddingLeft: "var(--section-h)",
      }}
    >
      {/* Heading + description */}
      <motion.div
        variants={headerStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col gap-2 mb-12"
        style={{ maxWidth: "646px" }}
      >
        <motion.h2
          variants={fadeUp}
          className="leading-none max-sm:text-[40px]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--size-h1)",
            letterSpacing: "var(--tracking-h1)",
            color: "var(--color-text-primary)",
          }}
        >
          {userType === "loyalty" ? "Your Hotels" : "Our Hotels"}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="text-[16px] leading-5 tracking-[1.92px] max-w-[486px] max-sm:w-full"
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-text-secondary)",
          }}
        >
          {userType === "loyalty"
            ? "Your favourites, and a few new destinations curated for you."
            : "Come enjoy a mix of luxury and authenticity, where warm hospitality meets timeless style."}
        </motion.p>
      </motion.div>

      {/* Cards */}
      <motion.div
        ref={scrollRef}
        onScroll={handleScroll}
        variants={cardStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex gap-6 max-sm:gap-3 overflow-x-auto pb-4 pr-16 max-sm:snap-x max-sm:snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {orderedHotels.map((hotel) => (
          <motion.div key={hotel.city} variants={fadeUp} className="max-sm:snap-start max-sm:shrink-0">
            <HotelCard {...hotel} />
          </motion.div>
        ))}
      </motion.div>

      {/* Dot indicators — mobile only */}
      <div className="hidden max-sm:flex gap-2 justify-center mt-4 pr-4">
        {orderedHotels.map((_, i) => (
          <div
            key={i}
            className="h-[2px] rounded-full transition-all duration-300"
            style={{
              width: i === activeIndex ? '14px' : '5px',
              backgroundColor: i === activeIndex
                ? 'var(--color-text-primary)'
                : 'var(--color-border-default)',
            }}
          />
        ))}
      </div>
    </section>
  );
}
