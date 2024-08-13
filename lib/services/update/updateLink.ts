interface ServiceProps {
  id: number;
  title: string;
  url: string;
}

export function updateLink(props: ServiceProps) {
  return fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/links/${props.id}`, {
    method: "PATCH",
    body: JSON.stringify(props),
    next: { revalidate: false },
  }).then((res) => res.json());
}
