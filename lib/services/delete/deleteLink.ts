export function deleteLink(id: number) {
  return fetch(`http://localhost:3000/api/links/${id}`, {
    method: "DELETE",
    next: { revalidate: false },
  }).then((res) => res.json());
}
