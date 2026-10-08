import { getCategories, getProducts } from "@/lib/api";
import type { Category, Product } from "@/lib/types";
import NavbarClient from "./NavbarClient";
import Ticker from "./Ticker";

export default async function Navbar() {
  let categories: Category[] = [];
  let products: Product[] = [];
  try {
    products = await getProducts();
    categories = await getCategories();
  } catch {}
  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <NavbarClient categories={categories} />
      <Ticker products={products} />
    </header>
  );
}