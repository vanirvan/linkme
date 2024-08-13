export function deleteLink(id: number) {
  return fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/links/${id}`, {
    method: "DELETE",
    next: { revalidate: false },
  }).then((res) => res.json());
}
