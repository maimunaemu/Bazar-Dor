
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { getProduct } from "@/lib/api";
import { UNIT_BN } from "@/lib/types";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailsPage({ params }: Props) {
  // Check whether the user is signed in
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // If not signed in, redirect to the sign-in page
  if (!session) {
    redirect("/signin");
  }

  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const prices = product.markets.flatMap((market) => [
    market.min,
    market.max,
  ]);

  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;

  const avgPrice = prices.length
    ? Math.round(
        prices.reduce((sum, price) => sum + price, 0) / prices.length
      )
    : 0;

  const priceDifference = product.today - product.yesterday;

  const changePercent =
    product.yesterday !== 0
      ? Math.abs((priceDifference / product.yesterday) * 100)
      : 0;

  const priceUp = priceDifference > 0;
  const priceDown = priceDifference < 0;

  const changeColor = priceUp
    ? "text-red-600"
    : priceDown
      ? "text-green-600"
      : "text-gray-500";

  const changeBadge = priceUp
    ? "bg-red-50 text-red-600"
    : priceDown
      ? "bg-green-50 text-green-600"
      : "bg-gray-100 text-gray-500";

  const arrow = priceUp ? "↑" : priceDown ? "↓" : "→";

  return (
    <div className="mx-auto w-full max-w-[1120px] space-y-6 px-4 py-8">
      {/* Product Header */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-3xl">
              {product.categoryIcon}
            </div>

            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-gray-900">
                {product.nameBn}
              </h1>

              <p className={`mt-2 text-sm font-semibold ${changeColor}`}>
                {priceUp
                  ? `গতকালের থেকে ৳${priceDifference} বেড়েছে`
                  : priceDown
                    ? `গতকালের থেকে ৳${Math.abs(priceDifference)} কমেছে`
                    : "গতকালের থেকে দাম অপরিবর্তিত"}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                  {product.categoryNameBn}
                </span>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                  প্রতি {UNIT_BN[product.unit]}
                </span>
              </div>
            </div>
          </div>

          <div className="flex h-[132px] w-[117.6px] shrink-0 flex-col justify-between rounded-xl border border-gray-200 bg-white p-3">
            <p className="text-xs text-gray-500">আজকের দাম</p>

            <p className="text-2xl font-bold text-gray-900">
              ৳{product.today}
            </p>

            <p className="text-xs text-gray-500">
              প্রতি {UNIT_BN[product.unit]} {product.nameBn}
            </p>

            <div
              className={`flex w-fit items-center gap-1 rounded-full px-2 py-1 ${changeBadge}`}
            >
              <span className="text-xs font-bold">{arrow}</span>
              <span className="text-xs font-semibold">
                {changePercent.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Price Summary and Market Table */}
      <section className="min-h-[847px] w-full rounded-2xl border border-gray-200 bg-white p-6">
        {/* Price Summary */}
        <h2 className="mb-4 text-lg font-bold text-gray-900">
          দামের সারসংক্ষেপ
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>
            <p className="mt-2 text-xl font-bold text-green-700">
              ৳{minPrice}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">সর্বোচ্চ দাম</p>
            <p className="mt-2 text-xl font-bold text-red-600">
              ৳{maxPrice}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">গড় দাম</p>
            <p className="mt-2 text-xl font-bold text-gray-900">
              ৳{avgPrice}
            </p>
          </div>
        </div>

        {/* Market-wise Price Table */}
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full min-w-[700px] border-collapse text-left text-sm">
              <thead className="bg-green-50 text-gray-700">
                <tr>
                  <th className="px-5 py-4 font-semibold">বাজার</th>
                  <th className="px-5 py-4 font-semibold">বিভাগ</th>
                  <th className="px-5 py-4 font-semibold">সর্বনিম্ন</th>
                  <th className="px-5 py-4 font-semibold">সর্বোচ্চ</th>
                  <th className="px-5 py-4 font-semibold">গড়</th>
                </tr>
              </thead>

              <tbody>
                {product.markets.map((market, index) => (
                  <tr
                    key={`${market.market}-${index}`}
                    className="border-t border-gray-200 transition hover:bg-green-50/50"
                  >
                    <td className="px-5 py-4 font-medium text-gray-900">
                      {market.market}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {market.division}
                    </td>

                    <td className="px-5 py-4 text-green-700">
                      ৳{market.min}
                    </td>

                    <td className="px-5 py-4 text-red-600">
                      ৳{market.max}
                    </td>

                    <td className="px-5 py-4 font-semibold text-gray-900">
                      ৳{Math.round((market.min + market.max) / 2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-xs text-gray-500">
            সব দাম প্রতি {UNIT_BN[product.unit]} হিসেবে দেখানো হয়েছে।
          </p>
        </div>
      </section>
    </div>
  );
}

