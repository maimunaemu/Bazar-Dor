
export default function Loading() {
  return (
    <main className="mx-auto max-w-[1120px] px-4 py-8">
      <p className="mb-6 text-gray-600">পণ্য লোড হচ্ছে...</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="animate-pulse rounded-xl border border-gray-200 bg-white p-4"
          >
            <div className="h-36 rounded-lg bg-gray-200" />
            <div className="mt-4 h-5 w-3/4 rounded bg-gray-200" />
            <div className="mt-3 h-4 w-1/2 rounded bg-gray-200" />
            <div className="mt-4 h-8 w-1/3 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </main>
  );
}

