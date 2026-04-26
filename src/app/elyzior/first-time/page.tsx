import { VariantSwitcher } from "@/components/shared/VariantSwitcher";
import { ElyziorHomepage } from "@/components/elyzior/ElyziorHomepage";

export default function ElyziorFirstTimePage() {
  return (
    <div data-brand="elyzior">
      <ElyziorHomepage userType="first-time" />
      <VariantSwitcher activeBrand="elyzior" activeUserType="first-time" />
    </div>
  );
}
