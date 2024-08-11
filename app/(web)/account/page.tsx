import { Metadata } from "next";

import { AccountSettingForm } from "@/components/page-components/account/AccountSettingForm";

export const metadata: Metadata = {
  title: "Account Settings | Linkme",
};

export default function AccountPage() {
  return (
    <main className="relative w-full">
      <div className="mx-auto mt-20 flex w-full max-w-7xl flex-col gap-4 p-4">
        <div className="flex w-full flex-col gap-4 rounded bg-white p-4 shadow-md">
          <h1 className="text-xl font-bold">Account Settings</h1>
          <AccountSettingForm />
        </div>
      </div>
    </main>
  );
}
