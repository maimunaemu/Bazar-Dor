"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { banglaDate } from "@/lib/bn";


// top of file
import type { Category } from "@/lib/types";

export default function NavbarClient({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const user: null | { name: string; email: string; image?: string } = null; // TODO: BetterAuth session

  const linkCls = (active: boolean) =>
    `flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium transition ${
      active ? "bg-brand text-white" : "text-gray-700 hover:bg-brand-soft"
    }`;

  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="flex items-center justify-between py-2">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-icon.png" alt="লোগো" width={32} height={32} />
          <div className="leading-tight">
            <p className="text-sm font-bold">বাজার দর</p>
            <p className="text-[10px] text-gray-500" suppressHydrationWarning>
              {banglaDate()}
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {user ? null : (
            <>
              <Link href="/signin" className="btn btn-ghost btn-xs sm:btn-sm">সাইন ইন</Link>
              <Link href="/signup" className="btn btn-xs border-0 bg-brand text-white hover:bg-brand-dark sm:btn-sm">
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      <nav className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-2">
        <Link href="/" className={linkCls(pathname === "/")}>সব</Link>
        // replace the categories.map(...) block
{categories.map((c) => {
  const href = `/category/${c.slug}`;
  return (
    <Link key={c.slug} href={href} className={linkCls(pathname === href)}>
      <span>{c.icon}</span>
      {c.nameBn}
    </Link>
  );
})}
      </nav>
    </div>
  );
}