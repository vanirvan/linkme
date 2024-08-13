type ServiceProps = {
  id: number;
  title: string;
  link: string;
  order: number;
  createdAt: string;
};

export function changeOrder(props: ServiceProps[]) {
  return fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/links/order`, {
    method: "POST",
    body: JSON.stringify({ links: props }),
    next: { revalidate: false },
  }).then((res) => res.json());
}
