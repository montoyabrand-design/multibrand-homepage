'use client';

import { motion } from 'framer-motion';
import type { UserType } from "@/tokens";
import { fadeUp, scaleIn, staggerContainer, staggerContainerDelayed, VP } from "./animations";
import { Button } from "@/components/shared/Button";

const pillars = [
  {
    numeral: "I",
    title: "Guaranteed Availability",
    body: "Your suite awaits, always, anywhere. Priority access to every Elyzior destination worldwide.",
  },
  {
    numeral: "II",
    title: "Personal Concierge",
    body: "A dedicated liaison who knows your preferences before you speak them.",
  },
  {
    numeral: "III",
    title: "Private Experiences",
    body: "Closed-door tastings, after-hours gallery viewings, crafted only for Privilege members.",
  },
  {
    numeral: "IV",
    title: "Seamless Transfers",
    body: "From runway to lobby without a single wait. Private arrivals at every property.",
  },
];

const heroStagger   = staggerContainer;
const pillarStagger = staggerContainerDelayed;

export function PrivilegeSection({ userType }: { userType: UserType }) {
  return (
    <section
      className="w-full flex flex-col border-t border-b"
      style={{
        backgroundColor: "var(--color-bg-inverse-deepest)",
        borderColor: "var(--color-border-emphasis)",
      }}
    >
      {/* Hero area */}
      <div className="flex flex-col items-center pt-[120px] pb-[80px] gap-6 max-sm:px-6">
        <motion.div
          variants={heroStagger}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
          className="flex flex-col items-center gap-10"
        >
          {/* Key image — portrait image rotated 90° to appear as horizontal key */}
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center shrink-0"
            style={{ width: "163.6px", height: "64px" }}
          >
            <div className="rotate-90 flex-none">
              <img
                src="/elyzior/privilege-key.png"
                alt=""
                className="object-cover"
                style={{ width: "64px", height: "163.6px" }}
              />
            </div>
          </motion.div>

          {/* Title */}
          <motion.p
            variants={fadeUp}
            className="text-center max-sm:text-[32px]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--size-h2)",
              lineHeight: "var(--size-h2)",
              letterSpacing: "var(--tracking-h2)",
              color: "var(--color-text-on-inverse)",
            }}
          >
            {userType === "loyalty" ? "Welcome to Privilege" : "The key to Privilege"}
          </motion.p>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
          className="text-center w-full max-sm:text-[16px]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "24px",
            letterSpacing: "1px",
            color: "var(--color-text-on-inverse)",
          }}
        >
          {userType === "loyalty" ? (
            <p>As a Privilege member, every arrival is a homecoming<br />and every wish is already understood.</p>
          ) : (
            <p>A world beyond reservation for those who seek belonging,<br />a quiet circle where every arrival is a homecoming.</p>
          )}
        </motion.div>
      </div>

      {/* Pillars */}
      <motion.div
        variants={pillarStagger}
        initial="hidden"
        whileInView="visible"
        viewport={VP}
        className="grid grid-cols-4 max-sm:grid-cols-1 w-full"
      >
        {pillars.map((pillar) => (
          <motion.div
            key={pillar.numeral}
            variants={fadeUp}
            className="flex flex-col gap-6 border-r last:border-r-0 pt-[56px] pb-[80px] px-[48px] max-sm:border-r-0 max-sm:border-t first:max-sm:border-t-0 max-sm:pt-8 max-sm:pb-10 max-sm:px-6"
            style={{
              borderColor: "var(--color-border-emphasis)",
            }}
          >
            <span
              className="text-[48px] max-sm:text-[40px] leading-none"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-border-emphasis)",
              }}
            >
              {pillar.numeral}
            </span>
            <div className="flex flex-col gap-3">
              <h4
                className="text-[24px] tracking-[1px]"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text-on-inverse)",
                }}
              >
                {pillar.title}
              </h4>
              <p
                className="text-[14px] leading-5 tracking-[1.68px]"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-text-on-inverse-muted)",
                }}
              >
                {pillar.body}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={VP}
        className="flex items-center justify-center pt-14 pb-20 max-sm:px-6"
        style={{ backgroundColor: "var(--color-bg-inverse-deepest)" }}
      >
        <Button brand="elyzior" variant="tertiary" size="lg" className="max-sm:w-full max-sm:justify-center">
          {userType === "loyalty" ? "VIEW YOUR BENEFITS" : "REQUEST AN INVITATION"}
        </Button>
      </motion.div>
    </section>
  );
}
