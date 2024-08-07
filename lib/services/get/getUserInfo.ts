interface ServiceReturn {
  data: {
    name: string;
    image: string;
    username: string;
  };
}

export async function getUserInfo(): Promise<ServiceReturn> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user`, {
    next: { revalidate: false },
  }).then((res) => res.json());
}
