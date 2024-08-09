import { TotalLinkStats, TotalVisitorStats, PageInfoStats } from "./stats";

export function DashboardStats() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <TotalLinkStats />
      <TotalVisitorStats />
      <PageInfoStats />
    </div>
  );
}
