interface ServiceProps {
  name: string;
  username: string;
}

interface ServiceReturn {
  data?: {
    name: string;
    image: string;
    username: string;
  };
  error?: {
    name: string[];
    username: string[];
  };
}

export async function updateUserInfo(
  props: ServiceProps,
): Promise<ServiceReturn> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user`, {
    method: "PATCH",
    body: JSON.stringify(props),
    next: { revalidate: false },
  }).then((res) => res.json());
}
