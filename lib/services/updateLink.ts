interface ServiceProps {
  id: number;
  title: string;
  url: string;
}

export function updateLink(props: ServiceProps) {
  return fetch(`http://localhost:3000/api/links/${props.id}`, {
    method: "PATCH",
    body: JSON.stringify(props),
    next: { revalidate: false },
  });
}
