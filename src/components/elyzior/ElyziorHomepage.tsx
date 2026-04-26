import type { UserType } from "@/tokens";
import { HeroSection } from "./HeroSection";
import { BookingWidget } from "./BookingWidget";
import { HotelsCarousel } from "./HotelsCarousel";
import { StorySection } from "./StorySection";
import { ExperiencesSection } from "./ExperiencesSection";
import { PrivilegeSection } from "./PrivilegeSection";
import { Footer } from "./Footer";

export function ElyziorHomepage({ userType }: { userType: UserType }) {
  return (
    <main className="flex flex-col w-full">
      <HeroSection userType={userType} />
      <BookingWidget />
      <HotelsCarousel userType={userType} />

      <StorySection
        eyebrow="ACCOMMODATIONS"
        heading={["A Room", "That Breathes"]}
        body="Every suite is a private sanctuary, with unique design. Natural materials, curated light, and silence that restores. This is not a room you stay in. It is a room that stays with you."
        ctaLabel="DISCOVER OUR SUITES"
        imageUrl="/elyzior/accomodations.png"
        imageRight={false}
      />

      <ExperiencesSection />

      <StorySection
        eyebrow="SANTUARIO / NEW YORK BY"
        heading={["Antoine", "Gasseau"]}
        body='"An unforgettable experience. Each dish felt like a personal retreat, crafted with fresh, natural ingredients that delighted the senses."'
        ctaLabel="EXPLORE MENU"
        imageUrl="/elyzior/antoine.png"
        imageRight={true}
        quote={true}
      />

      <PrivilegeSection userType={userType} />
      <Footer />
    </main>
  );
}
