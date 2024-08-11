interface ServiceReturn {
  message: string;
  data: {
    name: string;
    username: string;
    image: string;
    links: {
      id: number;
      title: string;
      link: string;
    }[];
  } | null;
}

export async function viewUserPage(username: string): Promise<ServiceReturn> {
  const f = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/visit/${username}`,
    {
      cache: "no-store",
    },
  ).then((res) => res.json());

  return f;
}
