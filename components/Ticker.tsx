import { formatPrice, toBn } from "@/lib/bn";
import { UNIT_BN, type Product } from "@/lib/types";

export default function Ticker({ products }: { products: Product[] }) {
  if (!products.length) return null;
  const items = [...products, ...products]; // doubled for a seamless loop
  return (
    <div className="overflow-hidden border-t border-gray-100 bg-white py-1.5">
      <div className="marquee-track flex w-max gap-6 px-4 text-xs">
        {items.map((p, i) => {
          const { dir, pct } = p.change;
          return (
            <span key={i} className="flex items-center gap-1 whitespace-nowrap">
              <span>{p.image}</span>
              <span className="font-medium">{p.nameBn}</span>
              <span className="text-gray-600">
                {formatPrice(p.today)}/{UNIT_BN[p.unit]}
              </span>
              <span className={dir === "up" ? "text-up" : dir === "down" ? "text-down" : "text-gray-400"}>
                {dir === "up" ? "▲" : dir === "down" ? "▼" : "—"} {toBn(Math.abs(pct))}%
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}