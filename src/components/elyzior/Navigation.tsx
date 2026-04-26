'use client';

import { useState, useEffect } from 'react';
import { useScroll, motion, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import type { UserType } from "@/tokens";

const logo = "/elyzior/elizior-logo.svg";

const ALL_LINKS = [
  "OUR HOTELS",
  "ACCOMMODATIONS",
  "GASTRONOMY",
  "EVENTS",
  "ELYZIOR PRIVILEGE",
  "EXPERIENCES",
];

function NavLink({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <a
      href="#"
      className={`group relative whitespace-nowrap transition-opacity hover:opacity-90 ${className}`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 h-px w-full bg-white origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </a>
  );
}

export function Navigation({ userType }: { userType: UserType }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 80));

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  return (
    <>
      <nav
        className={[
          'z-20 flex items-center justify-between',
          // Desktop
          'sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:top-[16px] sm:w-[1344px] sm:py-2',
          // Mobile
          'max-sm:fixed max-sm:inset-x-0 max-sm:top-0 max-sm:px-4 max-sm:py-3',
          'transition-colors duration-300',
          scrolled ? 'max-sm:bg-[#01040c] max-sm:backdrop-blur-sm' : 'max-sm:bg-transparent',
        ].join(' ')}
        aria-label="Main navigation"
      >
        {/* Left links — desktop only */}
        <div className="flex gap-[40px] items-center max-sm:hidden">
          {["OUR HOTELS", "ACCOMMODATIONS", "GASTRONOMY"].map((item) => (
            <NavLink key={item} className="text-white text-[14px] tracking-[1.12px]">
              {item}
            </NavLink>
          ))}
        </div>

        {/* Logo */}
        <img
          src={logo}
          alt="ELYZIOR"
          className="h-[56px] w-[211px] shrink-0 object-contain max-sm:h-[36px] max-sm:w-[135px]"
        />

        {/* Right links — desktop only */}
        <div className="flex gap-[40px] items-center max-sm:hidden">
          {["EVENTS", "ELYZIOR PRIVILEGE", "EXPERIENCES"].map((item) => (
            <NavLink key={item} className="text-white text-[14px] tracking-[1.12px]">
              {item}
            </NavLink>
          ))}
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="hidden max-sm:flex flex-col gap-[5px] p-2 ml-auto"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open navigation menu"
        >
          <span className="block w-[22px] h-[1.5px] bg-white" />
          <span className="block w-[22px] h-[1.5px] bg-white" />
          <span className="block w-[16px] h-[1.5px] bg-white" />
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-30 bg-black/60 sm:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="fixed inset-y-0 right-0 z-40 w-[75vw] max-w-[300px] flex flex-col sm:hidden"
              style={{ backgroundColor: 'var(--color-bg-inverse-deep)' }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Close */}
              <div className="flex justify-end p-4">
                <button onClick={() => setDrawerOpen(false)} aria-label="Close navigation menu">
                  <i
                    className="ri-close-line text-[24px]"
                    style={{ color: 'var(--color-text-on-inverse)' }}
                  />
                </button>
              </div>

              {/* Gold divider */}
              <div
                style={{
                  height: '1px',
                  backgroundColor: 'var(--color-border-accent)',
                  margin: '0 24px 24px',
                }}
              />

              {/* Links */}
              <nav className="flex flex-col px-6 gap-6">
                {ALL_LINKS.map((item) => (
                  <a
                    key={item}
                    href="#"
                    onClick={() => setDrawerOpen(false)}
                    className="text-[14px] tracking-[2px] hover:opacity-70 transition-opacity"
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: 'var(--color-text-on-inverse)',
                    }}
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
