import { SigninButton } from "@/components/SigninButton";
import Link from "next/link";

export function Navbar() {
  return (
    <section
      id="navbar"
      className="fixed left-0 top-0 z-10 w-full backdrop-blur-sm"
    >
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between gap-4 p-4">
        <Link
          href={"/"}
          className="text-2xl font-bold transition-colors duration-200"
        >
          Linkme
        </Link>
        <div className="flex items-center gap-2">
          <SigninButton />
        </div>
      </div>
    </section>
  );
}
