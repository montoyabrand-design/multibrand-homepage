'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, slideInLeft, slideInRight, VP } from "./animations";

interface StorySectionProps {
  eyebrow: string;
  heading: string[];
  body: string;
  ctaLabel: string;
  imageUrl: string;
  imageRight?: boolean;
  quote?: boolean;
}

const stagger = staggerContainer;

export function StorySection({
  eyebrow,
  heading,
  body,
  ctaLabel,
  imageUrl,
  imageRight = false,
  quote = false,
}: StorySectionProps) {
  const textBlock = (
    <motion.div
      variants={imageRight ? slideInLeft : slideInRight}
      initial="hidden"
      whileInView="visible"
      viewport={VP}
      style={{
        paddingTop: "var(--section-v)",
        paddingBottom: "var(--section-v)",
        paddingLeft: "var(--section-h)",
        paddingRight: "var(--section-h)",
        backgroundColor: "var(--color-bg-page)",
      }}
      className="w-1/2 shrink-0 flex flex-col justify-center"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={VP}
        className="flex flex-col"
      >
        <motion.p
          variants={fadeUp}
          className="mb-5 text-[14px] tracking-[4px] uppercase"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-text-secondary)",
          }}
        >
          {eyebrow}
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="mb-8 leading-none"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--size-h2)",
            letterSpacing: "var(--tracking-h2)",
            color: "var(--color-text-primary)",
            lineHeight: "var(--size-h2)",
          }}
        >
          {heading.map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </motion.h2>

        <div className="flex flex-col gap-10 max-w-[440px]">
          <motion.p
            variants={fadeUp}
            className="text-[16px] leading-6 tracking-[1px]"
            style={{
              fontFamily: quote ? "var(--font-display)" : "var(--font-body)",
              color: "var(--color-text-secondary)",
              fontStyle: quote ? "italic" : "normal",
            }}
          >
            {body}
          </motion.p>

          <motion.a
            variants={fadeUp}
            href="#"
            className="group flex items-center gap-2 w-fit"
          >
            <span
              className="relative text-[14px] tracking-[4px] uppercase"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                color: "var(--color-text-primary)",
              }}
            >
              {ctaLabel}
              <span
                className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                style={{ backgroundColor: "var(--color-text-primary)" }}
              />
            </span>
            <i
              className="ri-arrow-right-line text-lg transition-transform duration-300 ease-out group-hover:translate-x-1"
              style={{ color: "var(--color-text-primary)" }}
            />
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );

  const imageBlock = (
    <motion.div
      variants={imageRight ? slideInRight : slideInLeft}
      initial="hidden"
      whileInView="visible"
      viewport={VP}
      className="w-1/2 shrink-0 overflow-hidden"
    >
      <img
        src={imageUrl}
        alt=""
        className="w-full h-full object-cover"
      />
    </motion.div>
  );

  return (
    <section className="flex w-full min-h-screen" style={{ overflow: 'clip' }}>
      {imageRight ? (
        <>{textBlock}{imageBlock}</>
      ) : (
        <>{imageBlock}{textBlock}</>
      )}
    </section>
  );
}
