import Link from "next/link";
import { formatPrice } from "@/lib/bn";
import { UNIT_BN, type Product } from "@/lib/types";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="block rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xl">
          {p.image}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold">{p.nameBn}</h3>
          <p className="text-xs text-gray-500">প্রতি {UNIT_BN[p.unit]}</p>
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-[11px] text-gray-500">আজকের দাম</p>
          <p className="text-base font-bold">{formatPrice(p.today)}</p>
        </div>
        <ChangeBadge change={p.change} />
      </div>
    </Link>
  );
}