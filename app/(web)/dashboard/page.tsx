import { Metadata } from "next";

import { DashboardLinkLists } from "@/components/page-components/dashboard/DashboardLinkLists";
import { DashboardStats } from "@/components/page-components/dashboard/DashboardStats";

export const metadata: Metadata = {
  title: "Dashboard | Linkme",
};

export default function DashboardPage() {
  return (
    <main className="relative w-full">
      <div className="mx-auto mb-8 mt-20 flex w-full max-w-7xl flex-col gap-4 px-4">
        <DashboardStats />
        <DashboardLinkLists />
      </div>
    </main>
  );
}
