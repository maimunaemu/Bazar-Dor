
"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function CategorySort({
  currentSort,
}: {
  currentSort: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSort(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "default") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    const query = params.toString();
    router.push(
      query
        ? `${window.location.pathname}?${query}`
        : window.location.pathname
    );
  }

  return (
    <label className="flex items-center gap-2 text-sm text-gray-700">
      সাজান:
      <select
        value={currentSort}
        onChange={(event) => handleSort(event.target.value)}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2"
      >
        <option value="default">ডিফল্ট</option>
        <option value="low">দাম: কম থেকে বেশি</option>
        <option value="high">দাম: বেশি থেকে কম</option>
      </select>
    </label>
  );
}