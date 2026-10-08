import type { Category, Product } from "./types";

const BASES = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function api<T>(path: string): Promise<T> {
  let lastErr: unknown;
  for (const base of BASES) {
    try {
      const res = await fetch(base + path, { next: { revalidate: 300 } });
      if (!res.ok) throw new Error(String(res.status));
      return (await res.json()) as T;
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
}

export async function getProducts(): Promise<Product[]> {
  const json = await api<any>("/products");
  return Array.isArray(json) ? json : json?.data ?? [];
}

export async function getCategories(): Promise<Category[]> {
  const products = await getProducts();
  const map = new Map<string, Category>();
  for (const p of products) {
    if (!map.has(p.category)) {
      map.set(p.category, { slug: p.category, nameBn: p.categoryNameBn, icon: p.categoryIcon });
    }
  }
  return [...map.values()];
}

export async function getProduct(slug: string) {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) ?? null;
}