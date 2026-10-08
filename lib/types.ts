export type Market = { market: string; division: string; min: number; max: number };

export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: "kg" | "litre" | "dozen" | "piece";
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: { dir: "up" | "down" | "flat"; pct: number };
  markets: Market[];
};

export type Category = { slug: string; nameBn: string; icon: string };

export const UNIT_BN: Record<Product["unit"], string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};