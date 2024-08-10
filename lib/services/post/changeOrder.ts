type ServiceProps = {
  id: number;
  title: string;
  link: string;
  order: number;
  createdAt: string;
};

export function changeOrder(props: ServiceProps[]) {
  return fetch("http://localhost:3000/api/links/order", {
    method: "POST",
    body: JSON.stringify({ links: props }),
    next: { revalidate: false },
  }).then((res) => res.json());
}
