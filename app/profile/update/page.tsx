"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
const router = useRouter();
const [name, setName] = useState("");
const [updating, setUpdating] = useState(false);

async function handleUpdate() {
const trimmedName = name.trim();


if (!trimmedName) {
  toast.error("নাম লিখুন");
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
  router.push("/profile");
  router.refresh();
} catch {
  toast.error("কিছু একটা সমস্যা হয়েছে");
} finally {
  setUpdating(false);
}


}

return ( <main className="mx-auto w-full max-w-2xl px-4 py-10"> <h1 className="text-3xl font-bold text-gray-900">
Update Your Information </h1>


  <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
    <label
      htmlFor="profile-name"
      className="mb-2 block text-sm font-medium text-gray-700"
    >
      Name
    </label>

    <input
      id="profile-name"
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="আপনার নাম লিখুন"
      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
    />

    <button
      type="button"
      onClick={handleUpdate}
      disabled={updating}
      className="mt-5 rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {updating ? "আপডেট হচ্ছে..." : "Update Information"}
    </button>

    <button
      type="button"
      onClick={() => router.push("/profile")}
      className="ml-3 mt-5 rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50"
    >
      Back to Profile
    </button>
  </section>
</main>


);
}

