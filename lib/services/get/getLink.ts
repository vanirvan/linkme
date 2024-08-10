export function getLink() {
  return fetch("http://localhost:3000/api/links", {
    next: { revalidate: false },
  }).then((res) => res.json());
}
