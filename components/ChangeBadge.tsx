import { toBn } from "@/lib/bn";
import type { Product } from "@/lib/types";

export default function ChangeBadge({ change }: { change: Product["change"] }) {
  const { dir, pct } = change;
  const cls =
    dir === "up"
      ? "bg-green-50 text-up"
      : dir === "down"
      ? "bg-red-50 text-down"
      : "bg-gray-100 text-gray-500";
  const icon = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";
  return (
    <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${cls}`}>
      {icon} {toBn(Math.abs(pct))}%
    </span>
  );
}