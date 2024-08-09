"use client";

import { useIsClient } from "usehooks-ts";

import { LoadingSkeleton } from "./LoadingStats";

// TODO: still WIP, after make analytic page, put total visitor here as well
export function TotalVisitorStats() {
  const isClient = useIsClient();

  return isClient ? (
    <div className="flex w-full flex-col gap-4 rounded bg-white p-4 shadow-md">
      <h1>Total Visitors</h1>
      <h2 className="text-2xl font-bold">0</h2>
    </div>
  ) : (
    <LoadingSkeleton />
  );
}
