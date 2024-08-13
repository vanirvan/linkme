import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";

import { AuthProvider } from "@/components/providers/AuthProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { Navbar } from "@/components/Navbar";
import { cn } from "@/lib/utils/cn";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Personalize your link for your needs",
  description: "Linkme provided simple solution to manage your links.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("relative w-full bg-background-500", poppins.className)}
      >
        <AuthProvider>
          <QueryProvider>
            <Navbar />
            {children}
            <Toaster position="top-right" richColors closeButton />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
