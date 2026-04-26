'use client';

import { motion } from 'framer-motion';
import { EASE } from "./animations";

const fields = [
  { label: "DESTINATION", placeholder: "Select a destination" },
  { label: "ADD DATES",   placeholder: "Select dates" },
  { label: "GUESTS",      placeholder: "2 adults, 0 children" },
];

export function BookingWidget() {
  return (
    <motion.section
      className="w-full border-b flex items-center justify-center gap-8"
      style={{
        borderColor: "var(--color-action-primary-bg)",
        backgroundColor: "var(--color-bg-page)",
        paddingLeft: "165px",
        paddingRight: "165px",
        paddingTop: "40px",
        paddingBottom: "40px",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
    >
      {/* Fields */}
      <div className="flex flex-1 items-center gap-6">
        {fields.map((field) => (
          <div key={field.label} className="flex flex-1 flex-col gap-2 min-w-0">
            <span
              className="text-[16px] tracking-[1.28px]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "var(--color-text-primary)",
              }}
            >
              {field.label}
            </span>
            <div
              className="border-b flex items-center justify-between pb-2 pt-4"
              style={{ borderColor: "var(--color-border-default)" }}
            >
              <span
                className="text-[14px] leading-5 tracking-[1.68px] whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-text-secondary)",
                }}
              >
                {field.placeholder}
              </span>
              <i
                className="ri-arrow-down-s-line shrink-0"
                style={{ fontSize: "16px", color: "var(--color-text-secondary)" }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Search button */}
      <button
        className="flex items-center gap-3 rounded-full shrink-0 transition-opacity hover:opacity-80"
        style={{
          backgroundColor: "var(--color-action-primary-bg)",
          color: "var(--color-action-primary-fg)",
          paddingLeft: "32px",
          paddingRight: "32px",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <span
          className="text-[12px] tracking-[1.92px] uppercase leading-none"
          style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
        >
          SEARCH
        </span>
        <i
          className="ri-arrow-right-line leading-6"
          style={{ fontSize: "16px" }}
        />
      </button>
    </motion.section>
  );
}
