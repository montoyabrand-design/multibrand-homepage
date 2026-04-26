const logo = "/elyzior/elizior-logo.svg";

const columns = [
  {
    heading: "DESTINATIONS",
    links: ["New York", "Paris", "Milano", "Monaco", "Prague"],
  },
  {
    heading: "DISCOVER",
    links: ["Our Hotels", "Accommodations", "Gastronomy", "Experiences", "Events"],
  },
  {
    heading: "ELYZIOR",
    links: ["Our Story", "Elyzior Privilege", "Press", "Careers"],
  },
  {
    heading: "CONTACT",
    links: ["Chat with us", "Call us", "Write us"],
  },
];

export function Footer() {
  return (
    <footer
      className="w-full flex flex-col"
      style={{
        backgroundColor: "var(--color-bg-inverse-deepest)",
        paddingTop: "80px",
        paddingLeft: "100px",
        paddingRight: "100px",
        paddingBottom: "40px",
      }}
    >
      {/* Main row */}
      <div
        className="flex items-start justify-between pb-[61px] border-b mb-0"
        style={{ borderColor: "var(--color-border-emphasis)" }}
      >
        {/* Brand */}
        <div className="flex flex-col gap-1">
          <img src={logo} alt="ELYZIOR" className="h-[56px] w-[211px] object-contain" />
          <span
            className="text-[16px] tracking-[0.72px] italic"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-text-on-inverse)",
            }}
          >
            By Skyline Hotels
          </span>
        </div>

        {/* Link columns */}
        <div className="flex gap-16">
          {columns.map((col) => (
            <div key={col.heading} className="flex flex-col gap-6">
              <span
                className="text-[14px] tracking-[2px] italic"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text-accent)",
                }}
              >
                {col.heading}
              </span>
              <ul className="flex flex-col gap-4">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[14px] leading-5 tracking-[1.68px] hover:opacity-70 transition-opacity"
                      style={{
                        fontFamily: "var(--font-body)",
                        color: "var(--color-text-on-inverse)",
                      }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Legal row */}
      <div
        className="flex items-center justify-between text-[12px] tracking-[0.72px] py-8"
        style={{
          fontFamily: "var(--font-body)",
          color: "var(--color-border-default)",
        }}
      >
        <span>© 2026 Elyzior Hotels &amp; Resorts. All rights reserved.</span>
        <span>Privacy · Terms · Cookies</span>
      </div>
    </footer>
  );
}
