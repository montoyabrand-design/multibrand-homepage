import { VariantSwitcher } from "@/components/shared/VariantSwitcher";
import { ElyziorHomepage } from "@/components/elyzior/ElyziorHomepage";

export default function ElyziorLoyaltyPage() {
  return (
    <div data-brand="elyzior">
      <ElyziorHomepage userType="loyalty" />
      <VariantSwitcher activeBrand="elyzior" activeUserType="loyalty" />
    </div>
  );
}
