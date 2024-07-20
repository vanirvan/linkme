import SigninButton from "@/components/SigninButton";
import { TestForm } from "@/components/TestForm";

export default async function Home() {
  return (
    <main className="relative w-full">
      <TestForm />
      <hr />
      <div className="my-16 flex flex-col items-center justify-center">
        <SigninButton />
      </div>
    </main>
  );
}
