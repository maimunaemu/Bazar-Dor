"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

type Props = {
  name: string;
  email: string;
};

export default function ProfileClient({ name, email }: Props) {
  const router = useRouter();
  const [newName, setNewName] = useState(name);
  const [updating, setUpdating] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  async function handleUpdate() {
    const trimmedName = newName.trim();

    if (!trimmedName) {
      toast.error("নাম লিখুন");
      return;
    }

    if (trimmedName === name) {
      toast.error("নামে কোনো পরিবর্তন করেননি");
      return;
    }

    setUpdating(true);

    try {
      const { error } = await authClient.updateUser({
        name: trimmedName,
      });

      if (error) {
        toast.error(error.message || "নাম আপডেট করা যায়নি");
        return;
      }

      toast.success("নাম সফলভাবে আপডেট হয়েছে");
      router.refresh();
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে");
    } finally {
      setUpdating(false);
    }
  }

  async function handleSignOut() {
    setSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error("Sign out করা যায়নি");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে");
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900">
        আমার প্রোফাইল
      </h1>

      <p className="mt-2 text-sm text-gray-500">
        আপনার প্রোফাইলের তথ্য জানুন।
      </p>

      {/* Credentials Frame */}
      <section className="mt-8 flex flex-col justify-between gap-5 rounded-2xl border border-gray-200 bg-white p-6 sm:flex-row sm:items-center">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">নাম</p>
            <p className="mt-1 font-semibold text-gray-900">
              {name || "নাম দেওয়া নেই"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">ইমেইল</p>
            <p className="mt-1 font-medium text-gray-900">
              {email}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          disabled={signingOut}
          className="rounded-lg border border-red-500 px-5 py-2.5 font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {signingOut ? "Signing out..." : "Sign Out"}
        </button>
      </section>

      {/* Information Frame */}
      <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="text-xl font-bold text-gray-900">
          তথ্য
        </h2>

        <div className="mt-5">
          <label
            htmlFor="profile-name"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            নাম
          </label>

          <input
            id="profile-name"
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="আপনার নাম লিখুন"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
          />
        </div>

        <button
          type="button"
          onClick={handleUpdate}
          disabled={updating}
          className="mt-5 rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {updating ? "আপডেট হচ্ছে..." : "Update Information"}
        </button>
      </section>
    </main>
  );
}