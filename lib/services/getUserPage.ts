interface ServiceReturn {
  data: {
    name: string | null;
    username: string | null;
    image: string | null;
  };
}

export async function getUserPage(): Promise<ServiceReturn> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user`, {
    next: { revalidate: false },
  }).then((res) => res.json());
}
