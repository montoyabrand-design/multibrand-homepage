"use client";

import { useRouter, usePathname } from "next/navigation";
import type { Brand, UserType } from "@/tokens";

const brands: { id: Brand; label: string }[] = [
  { id: "elyzior", label: "Elyzior" },
  { id: "vibe", label: "Vibe" },
];

const userTypes: { id: UserType; label: string }[] = [
  { id: "first-time", label: "First-time" },
  { id: "loyalty", label: "Loyalty member" },
];

export function VariantSwitcher({
  activeBrand,
  activeUserType,
}: {
  activeBrand: Brand;
  activeUserType: UserType;
}) {
  const router = useRouter();
  const pathname = usePathname();

  function navigate(brand: Brand, userType: UserType) {
    router.push(`/${brand}/${userType}`);
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-white/90 backdrop-blur border border-neutral-200 rounded-full px-5 py-3 shadow-lg shadow-black/10 text-sm font-medium">
      <span className="text-neutral-400 text-xs uppercase tracking-widest pr-1">Brand</span>
      {brands.map((b) => (
        <button
          key={b.id}
          onClick={() => navigate(b.id, activeUserType)}
          className={`px-3 py-1 rounded-full transition-all ${
            activeBrand === b.id
              ? "bg-neutral-900 text-white"
              : "text-neutral-500 hover:text-neutral-800"
          }`}
        >
          {b.label}
        </button>
      ))}
      <div className="w-px h-4 bg-neutral-200 mx-1" />
      <span className="text-neutral-400 text-xs uppercase tracking-widest pr-1">User</span>
      {userTypes.map((u) => (
        <button
          key={u.id}
          onClick={() => navigate(activeBrand, u.id)}
          className={`px-3 py-1 rounded-full transition-all ${
            activeUserType === u.id
              ? "bg-neutral-900 text-white"
              : "text-neutral-500 hover:text-neutral-800"
          }`}
        >
          {u.label}
        </button>
      ))}
    </div>
  );
}
