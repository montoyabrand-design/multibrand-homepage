import type { UserType } from "@/tokens";

const hotels = [
  { city: "London", price: "£89/night", rating: "4.6", tags: ["Free WiFi", "Breakfast"], imageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80" },
  { city: "Berlin", price: "€74/night", rating: "4.5", tags: ["Free WiFi", "Gym"], imageUrl: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80" },
  { city: "Amsterdam", price: "€99/night", rating: "4.7", tags: ["Free WiFi", "Bar"], imageUrl: "https://images.unsplash.com/photo-1534351590666-13e3e96b5702?w=600&q=80" },
  { city: "Barcelona", price: "€85/night", rating: "4.8", tags: ["Pool", "Breakfast"], imageUrl: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&q=80" },
];

export function VibeHomepage({ userType }: { userType: UserType }) {
  return (
    <main
      className="flex flex-col w-full min-h-screen"
      style={{ backgroundColor: "var(--color-bg-page)" }}
    >
      {/* ── NAVIGATION ─────────────────────────────────────── */}
      <nav
        className="flex items-center justify-between px-16 py-4 border-b"
        style={{
          backgroundColor: "var(--color-bg-page)",
          borderColor: "var(--color-border-default)",
        }}
      >
        <span
          className="text-[20px] font-bold tracking-tight"
          style={{ fontFamily: "var(--font-heading)", color: "var(--color-text-primary)" }}
        >
          VIBE
        </span>
        <div className="flex items-center gap-8">
          {["Hotels", "Destinations", "Deals", "About"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-[14px] hover:opacity-70 transition-opacity"
              style={{ fontFamily: "var(--font-body)", color: "var(--color-text-secondary)" }}
            >
              {item}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {userType === "loyalty" && (
            <div
              className="flex items-center gap-2 px-3 py-1 rounded-full text-[13px] font-medium"
              style={{
                backgroundColor: "var(--color-bg-inverse)",
                color: "var(--color-text-on-inverse)",
                fontFamily: "var(--font-body)",
              }}
            >
              <span>⭐</span>
              <span>2,450 pts</span>
            </div>
          )}
          <button
            className="px-4 py-2 rounded-lg text-[14px] font-medium"
            style={{
              backgroundColor: "var(--color-action-primary-bg)",
              color: "var(--color-action-primary-fg)",
              fontFamily: "var(--font-ui)",
            }}
          >
            Sign in
          </button>
        </div>
      </nav>

      {/* ── HERO / BOOKING ─────────────────────────────────── */}
      <section
        className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{
          backgroundColor: "var(--color-bg-inverse)",
          paddingTop: "var(--section-v)",
          paddingBottom: "var(--section-v)",
          minHeight: "420px",
        }}
      >
        {userType === "loyalty" ? (
          <>
            {/* Loyalty: points + quick book */}
            <div
              className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-5 py-2 rounded-full border text-[13px]"
              style={{
                borderColor: "var(--color-text-accent-warm)",
                color: "var(--color-text-accent-warm)",
                fontFamily: "var(--font-body)",
              }}
            >
              <span>⭐ You have 2,450 points — enough for a free night!</span>
            </div>
            <h1
              className="mb-2 font-semibold"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--size-h1)",
                color: "var(--color-text-on-inverse)",
                letterSpacing: "var(--tracking-h1)",
              }}
            >
              Welcome back, Alex
            </h1>
            <p
              className="mb-8 text-[16px]"
              style={{ fontFamily: "var(--font-body)", color: "var(--color-text-on-inverse-muted)" }}
            >
              Your next stay in Berlin is 3 days away.
            </p>
          </>
        ) : (
          <>
            <h1
              className="mb-3 font-semibold"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--size-h1)",
                color: "var(--color-text-on-inverse)",
                letterSpacing: "var(--tracking-h1)",
              }}
            >
              Find your stay
            </h1>
            <p
              className="mb-8 text-[16px]"
              style={{ fontFamily: "var(--font-body)", color: "var(--color-text-on-inverse-muted)" }}
            >
              Great hotels. Great prices. No surprises.
            </p>
          </>
        )}

        {/* Booking bar */}
        <div
          className="flex items-center gap-0 rounded-xl overflow-hidden shadow-xl"
          style={{ backgroundColor: "var(--color-bg-page)" }}
        >
          {[
            { label: "Where to?", placeholder: "City or hotel" },
            { label: "Check-in", placeholder: "Add date" },
            { label: "Check-out", placeholder: "Add date" },
            { label: "Guests", placeholder: "2 guests" },
          ].map((field, i) => (
            <div
              key={field.label}
              className="flex flex-col px-6 py-4 border-r"
              style={{
                borderColor: "var(--color-border-default)",
                minWidth: "180px",
              }}
            >
              <span
                className="text-[11px] font-semibold tracking-[1px] uppercase mb-1"
                style={{ fontFamily: "var(--font-body)", color: "var(--color-text-primary)" }}
              >
                {field.label}
              </span>
              <span
                className="text-[14px]"
                style={{ fontFamily: "var(--font-body)", color: "var(--color-text-secondary)" }}
              >
                {field.placeholder}
              </span>
            </div>
          ))}
          <button
            className="px-8 py-6 text-[15px] font-semibold transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "var(--color-action-primary-bg)",
              color: "var(--color-action-primary-fg)",
              fontFamily: "var(--font-ui)",
            }}
          >
            Search
          </button>
        </div>
      </section>

      {/* ── TRUST SIGNALS (first-time only) ────────────────── */}
      {userType === "first-time" && (
        <div
          className="flex items-center justify-center gap-12 py-6 border-b"
          style={{ borderColor: "var(--color-border-default)" }}
        >
          {[
            { icon: "⭐", text: "4.7 average rating" },
            { icon: "🏨", text: "500+ hotels worldwide" },
            { icon: "🔒", text: "Best price guarantee" },
            { icon: "💬", text: "24/7 support" },
          ].map((trust) => (
            <div key={trust.text} className="flex items-center gap-2">
              <span className="text-lg">{trust.icon}</span>
              <span
                className="text-[13px] font-medium"
                style={{ fontFamily: "var(--font-body)", color: "var(--color-text-secondary)" }}
              >
                {trust.text}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ── LOYALTY: NEXT STAY CARD ─────────────────────────── */}
      {userType === "loyalty" && (
        <section
          className="px-16 py-8"
          style={{ backgroundColor: "var(--color-bg-surface)" }}
        >
          <h2
            className="text-[18px] font-semibold mb-4"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-text-primary)" }}
          >
            Your upcoming stay
          </h2>
          <div
            className="flex items-center gap-6 p-5 rounded-xl border"
            style={{
              backgroundColor: "var(--color-bg-page)",
              borderColor: "var(--color-border-default)",
            }}
          >
            <div
              className="w-24 h-20 rounded-lg bg-cover bg-center shrink-0"
              style={{ backgroundImage: `url(${hotels[1].imageUrl})` }}
            />
            <div className="flex flex-col gap-1">
              <span className="text-[16px] font-semibold" style={{ fontFamily: "var(--font-heading)", color: "var(--color-text-primary)" }}>
                Vibe Berlin
              </span>
              <span className="text-[13px]" style={{ fontFamily: "var(--font-body)", color: "var(--color-text-secondary)" }}>
                Apr 25 – Apr 28 · 2 guests
              </span>
              <span className="text-[13px] font-medium" style={{ fontFamily: "var(--font-body)", color: "var(--color-text-accent)" }}>
                Check-in in 3 days
              </span>
            </div>
            <button
              className="ml-auto px-5 py-2 rounded-lg text-[13px] font-medium border transition-colors"
              style={{
                borderColor: "var(--color-action-primary-bg)",
                color: "var(--color-action-primary-bg)",
                fontFamily: "var(--font-ui)",
              }}
            >
              Manage booking
            </button>
          </div>
        </section>
      )}

      {/* ── HOTELS GRID ────────────────────────────────────── */}
      <section
        className="px-16"
        style={{
          paddingTop: "var(--section-v)",
          paddingBottom: "var(--section-v)",
        }}
      >
        <h2
          className="text-[24px] font-semibold mb-6"
          style={{ fontFamily: "var(--font-heading)", color: "var(--color-text-primary)" }}
        >
          {userType === "loyalty" ? "Based on your past stays" : "Popular destinations"}
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {hotels.map((hotel) => (
            <article
              key={hotel.city}
              className="flex flex-col rounded-xl overflow-hidden border transition-shadow hover:shadow-lg"
              style={{ borderColor: "var(--color-border-default)", backgroundColor: "var(--color-bg-page)" }}
            >
              <div
                className="h-44 bg-cover bg-center"
                style={{ backgroundImage: `url(${hotel.imageUrl})` }}
              />
              <div className="p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h3
                    className="text-[16px] font-semibold"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--color-text-primary)" }}
                  >
                    {hotel.city}
                  </h3>
                  <span
                    className="text-[13px] flex items-center gap-1"
                    style={{ fontFamily: "var(--font-body)", color: "var(--color-text-secondary)" }}
                  >
                    ⭐ {hotel.rating}
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {hotel.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: "var(--color-bg-surface)",
                        color: "var(--color-text-secondary)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p
                  className="text-[15px] font-semibold mt-1"
                  style={{ fontFamily: "var(--font-body)", color: "var(--color-text-primary)" }}
                >
                  {hotel.price}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer
        className="flex items-center justify-between px-16 py-6 border-t text-[12px]"
        style={{
          borderColor: "var(--color-border-default)",
          fontFamily: "var(--font-body)",
          color: "var(--color-text-secondary)",
        }}
      >
        <span>© 2026 Vibe Hotels. Part of Skyline Group.</span>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Cookies", "Help"].map((l) => (
            <a key={l} href="#" className="hover:opacity-80 transition-opacity">{l}</a>
          ))}
        </div>
      </footer>
    </main>
  );
}
