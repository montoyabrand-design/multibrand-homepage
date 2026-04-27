'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { EASE, fadeUp, staggerContainer, staggerContainerDelayed, VP } from "./animations";

const experiences = [
  {
    title: "Monaco Grand Prix",
    description: "The race, observed from a world apart.",
    imageUrl: "/elyzior/monacograndprix.png",
    objectPosition: "bottom",
  },
  {
    title: "NY Skyline Dinner",
    description: "Dine where the city becomes a backdrop.",
    imageUrl: "/elyzior/nyskiline.png",
    objectPosition: "center",
  },
  {
    title: "Venice Private Passage",
    description: "A moment suspended between water and light.",
    imageUrl: "/elyzior/venice.png",
    objectPosition: "center",
  },
];

const headerStagger = staggerContainer;
const cardStagger   = staggerContainerDelayed;

function ExperienceCard({ title, description, imageUrl, objectPosition, alwaysShowText, isMobile }: {
  title: string;
  description: string;
  imageUrl: string;
  objectPosition: string;
  alwaysShowText: boolean;
  isMobile: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const showContent = alwaysShowText || hovered;

  return (
    <motion.article
      variants={fadeUp}
      className="relative overflow-hidden flex-1 max-sm:w-[85vw] max-sm:flex-none"
      style={{ height: isMobile ? '320px' : '498px' }}
      onHoverStart={() => { if (!alwaysShowText) setHovered(true); }}
      onHoverEnd={() => { if (!alwaysShowText) setHovered(false); }}
    >
      {/* Background image */}
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full"
        style={{
          objectFit: "cover",
          objectPosition,
          opacity: showContent ? 0.8 : 1,
          transition: `opacity 0.55s cubic-bezier(0.25,0.1,0.25,1)`,
        }}
      />

      {/* Gradient — transitions via CSS */}
      <div
        className="absolute inset-0"
        style={{
          background: showContent
            ? "linear-gradient(to bottom, rgba(199,204,224,0.5) 0%, rgba(10,23,61,0.8) 86.5%)"
            : "linear-gradient(to bottom, rgba(199,204,224,0) 0%, rgba(10,23,61,0.8) 89%)",
          transition: `background 0.55s cubic-bezier(0.25,0.1,0.25,1)`,
        }}
      />

      {/* Content — pinned to bottom:48px, hover content expands upward via max-height */}
      <div
        className="absolute inset-x-8 flex flex-col items-center gap-3"
        style={{ bottom: "48px" }}
      >
        <h3
          className="text-center w-full"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "36px",
            letterSpacing: "2px",
            lineHeight: "normal",
            color: "var(--color-text-on-inverse)",
          }}
        >
          {title}
        </h3>

        {/* Hover content — always in DOM, collapses to zero height when not shown */}
        <div
          className="flex flex-col items-center gap-3 w-full overflow-hidden"
          style={{
            maxHeight: showContent ? "120px" : "0px",
            opacity: showContent ? 1 : 0,
            transition: "max-height 0.45s cubic-bezier(0.25,0.1,0.25,1), opacity 0.35s cubic-bezier(0.25,0.1,0.25,1)",
          }}
        >
          <p
            className="text-center text-[13px] tracking-[1.04px] leading-5"
            style={{ fontFamily: "var(--font-body)", color: "var(--color-text-on-inverse)" }}
          >
            {description}
          </p>

          <div
            className="border-b flex items-center justify-center"
            style={{
              borderColor: "var(--color-border-default)",
              width: "146px",
              paddingTop: "16px",
              paddingBottom: "4px",
            }}
          >
            <span
              className="text-[14px] leading-5 tracking-[1.68px] text-center"
              style={{ fontFamily: "var(--font-body)", color: "var(--color-text-on-inverse)" }}
            >
              EXPLORE MORE
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function ExperiencesSection() {
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Detect mobile on mount
  const sectionRef = useCallback((node: HTMLElement | null) => {
    if (node) {
      const mq = window.matchMedia('(max-width: 639px)');
      setIsMobile(mq.matches);
      const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
      mq.addEventListener('change', handler);
    }
  }, []);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / experiences.length;
    setActiveIndex(Math.round(el.scrollLeft / cardWidth));
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full flex flex-col items-center gap-6"
      style={{
        backgroundColor: "var(--color-bg-inverse)",
        paddingTop: "var(--section-v)",
        paddingBottom: "var(--section-v)",
        paddingLeft: isMobile ? '24px' : '100px',
        paddingRight: isMobile ? '0' : '100px',
      }}
    >
      {/* Header */}
      <motion.div
        variants={headerStagger}
        initial="hidden"
        whileInView="visible"
        viewport={VP}
        className="flex flex-col items-center gap-6"
      >
        <motion.p
          variants={fadeUp}
          className="text-[14px] tracking-[4px] uppercase text-center"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-border-default)",
          }}
        >
          FOR YOUR SOUL
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex gap-6 items-start justify-center overflow-hidden"
          style={{
            fontSize: "var(--size-h2)",
            lineHeight: "var(--size-h2)",
            letterSpacing: "var(--tracking-h2)",
            color: "var(--color-text-on-inverse)",
            textAlign: "center",
          }}
        >
          <span style={{ fontFamily: "var(--font-display)" }}>Transformational</span>
          <em style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}>Experiences</em>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="text-[16px] text-center leading-6 tracking-[1px] max-w-[570px]"
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-border-default)",
          }}
        >
          Each Elyzior destination offers journeys that awaken the senses, crafted for those who seek meaning.
        </motion.p>
      </motion.div>

      {/* Cards */}
      <motion.div
        ref={scrollRef}
        onScroll={handleScroll}
        variants={cardStagger}
        initial="hidden"
        whileInView="visible"
        viewport={VP}
        className="flex w-full max-w-[1200px] py-10 max-sm:overflow-x-auto max-sm:snap-x max-sm:snap-mandatory"
        style={{ gap: "4px" }}
      >
        {experiences.map((exp) => (
          <div key={exp.title} className="max-sm:snap-start max-sm:shrink-0">
            <ExperienceCard
              {...exp}
              alwaysShowText={isMobile}
              isMobile={isMobile}
            />
          </div>
        ))}
      </motion.div>

      {/* Scroll dots — mobile only */}
      <div className="hidden max-sm:flex gap-2 justify-center w-full">
        {experiences.map((_, i) => (
          <div
            key={i}
            className="h-[2px] rounded-full transition-all duration-300"
            style={{
              width: i === activeIndex ? '14px' : '5px',
              backgroundColor: i === activeIndex ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.25)',
            }}
          />
        ))}
      </div>

      {/* Text link CTA */}
      <motion.a
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={VP}
        href="#"
        className="group flex items-center gap-2"
      >
        <span
          className="text-[14px] tracking-[4px] uppercase"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            color: "var(--color-text-on-inverse)",
          }}
        >
          EXPLORE ALL EXPERIENCES
        </span>
        <i
          className="ri-arrow-right-line transition-transform duration-300 ease-out group-hover:translate-x-1"
          style={{ fontSize: "20px", color: "var(--color-text-accent)" }}
        />
      </motion.a>
    </section>
  );
}
