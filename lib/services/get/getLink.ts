export function getLink() {
  return fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/links`, {
    next: { revalidate: false },
  }).then((res) => res.json());
}
