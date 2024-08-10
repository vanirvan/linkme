import { AvatarImage } from "@radix-ui/react-avatar";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { viewUserPage } from "@/lib/services/";
import { shortName } from "@/lib/utils/shortName";

export default async function ViewUserPage({
  params,
}: {
  params: { username: string };
}) {
  const data = await viewUserPage(params.username);

  return (
    <main className="flex min-h-svh w-full flex-col items-center bg-gradient-to-br from-[#5ee7df] to-[#b490ca] py-32">
      <div className="flex w-full max-w-sm flex-col items-center">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-32 w-32">
            <AvatarImage src={data.data?.image} alt={data.data?.name} />
            <AvatarFallback>{shortName(data.data?.name!)}</AvatarFallback>
          </Avatar>
          <p className="text-xl font-bold text-white">{data.data?.name}</p>
        </div>

        <div className="mt-12 flex w-full flex-col gap-4">
          {data.data?.links.map((l) => (
            <a
              href={l.link}
              target="_blank"
              key={l.id}
              className="flex w-full cursor-pointer justify-center rounded-md bg-blue-500 px-4 py-2 transition-all duration-200 hover:scale-105"
            >
              <span>{l.title}</span>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
