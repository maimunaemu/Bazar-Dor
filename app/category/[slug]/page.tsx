
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getProducts } from "@/lib/api";
import type { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import CategorySort from "./CategorySort";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
};

export default async function CategoryPage({
  params,
  searchParams,
}: Props) {
  const { slug } = await params;
  const { sort } = await searchParams;

  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  let categoryProducts = products.filter(
    (product) => product.category === slug
  );

  if (sort === "low") {
    categoryProducts = [...categoryProducts].sort(
      (a, b) => a.today - b.today
    );
  } else if (sort === "high") {
    categoryProducts = [...categoryProducts].sort(
      (a, b) => b.today - a.today
    );
  }

  return (
    <main className="mx-auto w-full max-w-[1120px] space-y-6 px-4 py-8">
      <section className="rounded-2xl border border-gray-200 bg-white p-6">
        <p className="text-3xl">{category.icon}</p>
        <h1 className="mt-2 text-2xl font-bold text-gray-900">
          {category.nameBn}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {categoryProducts.length}টি পণ্য
        </p>
      </section>

      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-gray-900">
            পণ্যের তালিকা
          </h2>
          <CategorySort currentSort={sort ?? "default"} />
        </div>

        {categoryProducts.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
            <p className="text-gray-600">এই ক্যাটাগরিতে কোনো পণ্য নেই।</p>
            <Link
              href="/"
              className="mt-4 inline-block rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categoryProducts.map((product: Product) => (
              <ProductCard key={product.id} p={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}