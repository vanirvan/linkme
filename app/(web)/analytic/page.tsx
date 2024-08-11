import { Metadata } from "next";

import { AnalyticChart } from "@/components/page-components/analytic/AnalyticChart";
import { AnalyticTotalVisitor } from "@/components/page-components/analytic/AnalyticTotalVisitor";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Analytic | Linkme",
};

export default function AnalyticPage() {
  return (
    <main className="relative mt-20 w-full">
      <div className="mx-auto w-full max-w-7xl p-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-6">
              <div>
                <CardTitle>Visitor</CardTitle>
                <CardDescription className="break-words">
                  Showing Visitor from the last 30 days
                </CardDescription>
              </div>
              <AnalyticTotalVisitor />
            </div>
          </CardHeader>
          <CardContent>
            <AnalyticChart />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
