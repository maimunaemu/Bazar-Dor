"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { banglaDate } from "@/lib/bn";
import type { Category } from "@/lib/types";
import UserMenu, { type NavUser } from "./UserMenu";

const PREVIEW_LOGGED_IN = false;

export default function NavbarClient({
  categories,
  user = null,
}: {
  categories: Category[];
  user?: NavUser | null;
}) {
  const pathname = usePathname();

  const currentUser: NavUser | null = PREVIEW_LOGGED_IN
    ? {
        name: "Pezwan Ahmed",
        email: "pezwan@example.com",
        image: null,
      }
    : user;

  const linkCls = (active: boolean) =>
    `flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition ${
      active
        ? "bg-brand text-white"
        : "text-gray-700 hover:bg-brand-soft"
    }`;

  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Row 1 */}
      <div className="flex items-center justify-between py-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand">
            <Image
              src="/logo-icon.png"
              alt="বাজার দর লোগো"
              width={28}
              height={28}
            />
          </div>

          <div className="leading-tight">
            <p className="text-sm font-bold sm:text-base">বাজার দর</p>

            <p
              className="text-[10px] text-gray-500 sm:text-xs"
              suppressHydrationWarning
            >
              {banglaDate()}
            </p>
          </div>
        </Link>

        {/* Auth */}
        <div className="flex items-center gap-2">
          {currentUser ? (
            <UserMenu
              user={currentUser}
              onSignOut={() => {}}
            />
          ) : (
            <>
              <Link
                href="/signin"
                className="px-3 py-1.5 text-xs font-medium text-black transition hover:text-brand sm:text-sm"
              >
                সাইন ইন
              </Link>

              <Link
                href="/signup"
                className="rounded-md bg-brand px-4 py-1.5 text-xs font-medium text-white transition hover:bg-brand-dark sm:text-sm"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Row 2 - Categories */}
      <nav
        aria-label="ক্যাটাগরি"
        className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 pb-2"
      >
        {categories.map((category) => {
          const href = `/category/${category.slug}`;
          const active = pathname === href;

          return (
            <Link
              key={category.slug}
              href={href}
              aria-current={active ? "page" : undefined}
              className={linkCls(active)}
            >
              <span>{category.icon}</span>
              {category.nameBn}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}