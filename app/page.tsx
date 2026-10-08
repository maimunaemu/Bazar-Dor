import { getProducts } from "@/lib/api";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import SectionHeader from "@/components/SectionHeader";

export default async function Home() {
  const products = await getProducts();

  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct) // most negative first
    .slice(0, 6);

  return (
    <>
      <Hero />
      <div className="mx-auto max-w-6xl space-y-10 px-4 pb-12">
        <section>
          <SectionHeader title="আজ দাম বেড়েছে ▲" subtitle="সবচেয়ে বেশি দাম বেড়েছে এমন ৬টি পণ্য" />
          <ProductGrid products={risers} />
        </section>

        <section>
          <SectionHeader title="আজ দাম কমেছে ▼" subtitle="সবচেয়ে বেশি দাম কমেছে এমন ৬টি পণ্য" />
          <ProductGrid products={fallers} />
        </section>

        <section>
          <SectionHeader
            id="সব-পণ্য"
            title="সব পণ্য"
            subtitle="সব প্রয়োজনীয় পণ্যের আজকের দাম"
          />
          <ProductGrid products={products} />
        </section>
      </div>
    </>
  );
}