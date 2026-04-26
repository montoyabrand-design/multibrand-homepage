import { VariantSwitcher } from "@/components/shared/VariantSwitcher";
import { VibeHomepage } from "@/components/vibe/VibeHomepage";

export default function VibeLoyaltyPage() {
  return (
    <div data-brand="vibe">
      <VibeHomepage userType="loyalty" />
      <VariantSwitcher activeBrand="vibe" activeUserType="loyalty" />
    </div>
  );
}
