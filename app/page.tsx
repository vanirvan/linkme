import { LinkList } from "@/components/LinkList";
import SigninButton from "@/components/SigninButton";
import { TestForm } from "@/components/TestForm";
import { TestUpdateForm } from "@/components/TestUpdateForm";

export default async function Home() {
  return (
    <main className="relative w-full">
      <h1 className="text-4xl font-bold">
        Ini aplikasi nya masih prototype njir, nanti aja design nya~
      </h1>
      <TestForm />
      <TestUpdateForm />
      <hr />
      <LinkList />
      <div className="my-16 flex flex-col items-center justify-center">
        <SigninButton />
      </div>
    </main>
  );
}
