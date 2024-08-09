interface ServiceReturn {
  data: {
    id: number;
    title: string;
    link: string;
    order: number;
    createdAt: Date;
  }[];
}

export async function getLinkList(): Promise<ServiceReturn> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/links`, {
    next: { revalidate: false },
  }).then((res) => res.json());
}
