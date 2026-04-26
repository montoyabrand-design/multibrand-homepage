'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import type { UserType } from "@/tokens";
import { Navigation } from "./Navigation";
import { EASE, slowZoom } from "./animations";

const SECTION_H = 855;
const EXIT_END  = SECTION_H * 0.2;

const heroImage = "/elyzior/hero.png";

export function HeroSection({ userType }: { userType: UserType }) {
  const headline =
    userType === "loyalty" ? "Welcome Back" : "A Sublime Experience";

  const { scrollY } = useScroll();

  // Scroll-based exit: opacity 1→0, y 0→-40 past 20% of section height
  const exitOpacity = useTransform(scrollY, [0, EXIT_END], [1, 0]);
  const exitY       = useTransform(scrollY, [0, EXIT_END], [0, -40]);

  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: `${SECTION_H}px` }}>

      {/* Background with slow zoom */}
      <motion.div className="absolute inset-0" {...slowZoom}>
        <img src={heroImage} alt="" className="w-full h-full object-cover" />
      </motion.div>

      {/* Dark base overlay */}
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)]" />

      {/* Gradient overlay: dark top → transparent middle → dark bottom */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgb(3,9,26) 0%, rgba(7,17,44,0.5) 37.74%, rgba(7,17,44,0.5) 64.42%, rgb(3,9,26) 100%)",
        }}
      />

      <Navigation userType={userType} />

      {/* Scroll-exit wrapper — opacity and y driven by scroll position */}
      <motion.div
        className="absolute top-[537px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: exitOpacity, y: exitY }}
      >
        {/* Headline entrance animation on load */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "120px",
            letterSpacing: "9.6px",
            lineHeight: "normal",
          }}
          className="text-white text-center whitespace-nowrap"
        >
          {headline}
        </motion.p>

        {/* BOOK A ROOM button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: EASE, delay: 0.4 }}
        >
          <button
            className="border px-8 py-5 rounded-full uppercase text-[14px] tracking-[1.92px] transition-opacity hover:opacity-80"
            style={{
              borderColor: "var(--color-border-default)",
              color: "var(--color-text-on-inverse)",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
            }}
          >
            BOOK A ROOM
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
