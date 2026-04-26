import { VariantSwitcher } from "@/components/shared/VariantSwitcher";
import { VibeHomepage } from "@/components/vibe/VibeHomepage";

export default function VibeFirstTimePage() {
  return (
    <div data-brand="vibe">
      <VibeHomepage userType="first-time" />
      <VariantSwitcher activeBrand="vibe" activeUserType="first-time" />
    </div>
  );
}
