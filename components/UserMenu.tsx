"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type NavUser = { name: string; email: string; image?: string | null };

export default function UserMenu({
  user,
  onSignOut,
}: {
  user: NavUser;
  onSignOut: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const firstName = user.name.split(" ")[0];
  const initial = user.name.charAt(0).toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-2 rounded-full px-1 py-1 hover:bg-brand-soft"
      >
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.image} alt={user.name} className="h-8 w-8 rounded-full object-cover" />
        ) : (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
            {initial}
          </span>
        )}
        <span className="hidden text-xs font-medium sm:inline">{firstName}</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-200 bg-white p-3 shadow-lg"
        >
          <p className="truncate text-sm font-semibold">{user.name}</p>
          <p className="truncate text-xs text-gray-500">{user.email}</p>
          <div className="my-2 border-t border-gray-100" />
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="block rounded-md px-2 py-1.5 text-xs hover:bg-brand-soft"
          >
            আমার প্রোফাইল
          </Link>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onSignOut();
            }}
            className="mt-1 w-full rounded-md px-2 py-1.5 text-left text-xs font-medium text-down hover:bg-red-50"
          >
            সাইন আউট
          </button>
        </div>
      )}
    </div>
  );
}