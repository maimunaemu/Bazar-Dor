import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  return (
    <ProfileClient
      name={session.user.name || ""}
      email={session.user.email}
    />
  );
}