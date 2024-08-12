"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useQuery } from "@tanstack/react-query";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { getAnalytic } from "@/lib/services/";
import { createAnalyticData } from "@/lib/utils/createAnalyticData";
import { useEffect } from "react";

const chartConfig = {
  visitor: {
    label: "visitor",
    color: "#ffff00",
  },
} satisfies ChartConfig;

export function AnalyticChart() {
  const { data, isPending } = useQuery({
    queryKey: ["Analytics"],
    queryFn: getAnalytic,
    staleTime: 5 * 60 * 1000,
  });

  const formatDate = (date: string) => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    });

    return formatter.format(new Date(date));
  };

  return !isPending ? (
    <ChartContainer
      config={chartConfig}
      className="max-h-96 min-h-[200px] w-full"
    >
      <BarChart
        data={createAnalyticData(
          data?.data.visitors ? data?.data.visitors : [],
        ).map((d) => ({
          date: formatDate(d.date),
          visitor: d.visitor,
        }))}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={"date"}
          tickLine={false}
          tickMargin={12}
          axisLine={false}
          minTickGap={32}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="visitor" fill="#00ff00" radius={4} />
      </BarChart>
    </ChartContainer>
  ) : (
    <LoadingSkeleton />
  );
}

function LoadingSkeleton() {
  return <Skeleton className="h-96 w-full" />;
}
