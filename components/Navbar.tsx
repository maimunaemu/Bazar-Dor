
import { getCategories, getProducts } from "@/lib/api";
import { auth } from "@/lib/auth";
import type { Category, Product } from "@/lib/types";
import { headers } from "next/headers";

import NavbarClient from "./NavbarClient";
import Ticker from "./Ticker";

export default async function Navbar() {
  let categories: Category[] = [];
  let products: Product[] = [];

  const [productResult, categoryResult] = await Promise.allSettled([
    getProducts(),
    getCategories(),
  ]);

  if (productResult.status === "fulfilled") {
    products = productResult.value;
  } else {
    console.error("Failed to load navbar products:", productResult.reason);
  }

  if (categoryResult.status === "fulfilled") {
    categories = categoryResult.value;
  } else {
    console.error("Failed to load navbar categories:", categoryResult.reason);
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session
    ? {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image ?? null,
      }
    : null;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <NavbarClient categories={categories} user={user} />
      <Ticker products={products} />
    </header>
  );
}