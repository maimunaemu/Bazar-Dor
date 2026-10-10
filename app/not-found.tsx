
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-brand">404</h1>

      <h2 className="mt-4 text-2xl font-bold">
        দুঃখিত! পেজটি খুঁজে পাওয়া যায়নি।
      </h2>

      <p className="mt-3 text-gray-500">
        আপনি যে পেজটি খুঁজছেন, সেটি হয়তো নেই অথবা সরিয়ে ফেলা হয়েছে।
      </p>

      <Link
        href="/"
        className="mt-6 rounded-lg bg-brand px-6 py-3 font-semibold text-black transition hover:opacity-80"
      >
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}

