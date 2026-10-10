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
const [signingOut, setSigningOut] = useState(false);

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

return ( <main className="mx-auto w-full max-w-4xl px-4 py-10"> <h1 className="text-3xl font-bold text-gray-900">
আমার প্রোফাইল </h1>

  <p className="mt-2 text-sm text-gray-500">
    আপনার প্রোফাইলের তথ্য জানুন।
  </p>

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

    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => router.push("/profile/update")}
        className="rounded-lg bg-green-600 px-5 py-2.5 font-semibold text-white transition hover:bg-green-700"
      >
        Update
      </button>

      <button
        type="button"
        onClick={handleSignOut}
        disabled={signingOut}
        className="rounded-lg border border-red-500 px-5 py-2.5 font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {signingOut ? "Signing out..." : "Sign Out"}
      </button>
    </div>
  </section>
</main>


);
}
