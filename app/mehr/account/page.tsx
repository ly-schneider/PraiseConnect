import BackButton from "@/components/BackButton";
import { Metadata } from "next";
import { Suspense } from "react";
import { getSession } from "@/lib/Session";
import RegisterForm from "@/components/RegisterForm"; // Assume this component displays account settings
import { headers } from "next/headers";
import { AccountDTO } from "@/model/Account";
import SkeletonChatsDisplay from "@/components/skeletons/SkeletonChatsDisplay";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Account | PraiseConnect",
  };
}

async function fetchAccountData(): Promise<AccountDTO | null> {
  const headersList = await headers();
  const hostname = headersList.get("x-forwarded-host");
  const protocol = headersList.get("x-forwarded-proto");
  const url = `${protocol}://${hostname}`;

  const session = await getSession();

  if (!session) return null;

  const res = await fetch(`${url}/api/accounts/id/${session.user._id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (!res.ok) {
    console.error("Fehler beim Laden des Accounts");
    return null;
  }

  const data = await res.json();

  if (data.success) {
    return data.data;
  } else {
    console.error("Fehler beim Laden des Accounts");
    return null;
  }
}

export default function AccountPage() {
  const accountDataPromise = fetchAccountData();

  return (
    <div className="flex flex-col mb-32 mt-2">
      <BackButton />
      <h1 className="title text-4xl mt-4">Account</h1>
      <Suspense fallback={<SkeletonChatsDisplay />}>
        <AccountContent accountDataPromise={accountDataPromise} />
      </Suspense>
    </div>
  );
}

async function AccountContent({
  accountDataPromise,
}: {
  accountDataPromise: Promise<AccountDTO | null>;
}) {
  const account = await accountDataPromise;

  if (!account) {
    return <p className="text-center text mt-8">Fehler beim Laden des Accounts.</p>;
  }

  const session = await getSession();

  return (
    <RegisterForm account={account} session={session} />
  );
}
