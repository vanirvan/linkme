interface ServiceReturn {
  data: {
    name: string | null;
    username: string | null;
    image: string | null;
    links: {
      link: string;
      title: string;
      id: number;
      createdAt: Date;
      linkOrders: {
        order: number;
      } | null;
    }[];
    total_link: number | null;
  };
}

export async function getUserPage(): Promise<ServiceReturn> {
  return fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user`, {
    next: { revalidate: false },
  }).then((res) => res.json());
}
