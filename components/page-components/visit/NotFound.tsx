import Link from "next/link";

export function VisitNotFoundPage() {
  return (
    <main className="flex h-full min-h-svh w-full flex-col items-center justify-center bg-gradient-to-br from-[#5ee7df] to-[#b490ca] px-4 py-12">
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-9xl font-bold tracking-tight text-white">404</h1>
        {/* <h2 className="text-foreground mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          User not found
        </h2> */}
        <p className="mt-4 text-slate-100">
          The page you&lsquo;re looking for doesn&lsquo;t exist or has been
          removed.
        </p>
      </div>
    </main>
  );
}
