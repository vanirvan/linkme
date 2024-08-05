import { ClaimLinksForm } from "@/components/page-components/home/ClaimLinkForm";

export default async function Home() {
  return (
    <main className="relative w-full">
      <section
        id="hero"
        className="mx-auto flex h-svh w-full max-w-7xl flex-col justify-center gap-2 p-4"
      >
        <h1 className="text-4xl font-bold transition-colors duration-200 sm:text-5xl">
          Simple All in One <br />
          <span className="relative">
            Link in Bio
            <div className="absolute bottom-0 left-0 h-1 w-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" />
          </span>
        </h1>
        <h2 className="transition-colors duration-200 sm:text-lg">
          Manage your links easily
        </h2>
        <ClaimLinksForm />
      </section>
    </main>
  );
}
