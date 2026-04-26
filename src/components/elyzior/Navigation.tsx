import type { UserType } from "@/tokens";

const logo = "/elyzior/elizior-logo.svg";

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
  return (
    <nav
      className="absolute z-20 flex items-center justify-between left-1/2 -translate-x-1/2 top-[16px] w-[1344px] py-2"
      aria-label="Main navigation"
    >
      {/* Left nav links */}
      <div className="flex gap-[40px] items-center">
        {["OUR HOTELS", "ACCOMMODATIONS", "GASTRONOMY"].map((item) => (
          <NavLink key={item} className="text-white text-[14px] tracking-[1.12px]">
            {item}
          </NavLink>
        ))}
      </div>

      {/* Logo */}
      <img src={logo} alt="ELYZIOR" className="h-[56px] w-[211px] shrink-0 object-contain" />

      {/* Right nav links */}
      <div className="flex gap-[40px] items-center">
        {["EVENTS", "ELYZIOR PRIVILEGE", "EXPERIENCES"].map((item) => (
          <NavLink key={item} className="text-white text-[14px] tracking-[1.12px]">
            {item}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
