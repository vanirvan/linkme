"use client";

import { getAnalytic } from "@/lib/services";
import { useQuery } from "@tanstack/react-query";

export function AnalyticTotalVisitor() {
  const { data, isPending } = useQuery({
    queryKey: ["Analytics"],
    queryFn: getAnalytic,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div className="flex flex-col items-end gap-2">
      <h1 className="text-muted-foreground text-right text-xs">
        Total Visitors
      </h1>
      <h2 className="text-lg font-bold leading-none sm:text-3xl">
        {data?.data.total_visitor ? data?.data.total_visitor : 0}
      </h2>
    </div>
  );
}
