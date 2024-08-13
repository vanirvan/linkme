export function postLink(props: { url: string; title: string }) {
  return fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/links`, {
    method: "POST",
    body: JSON.stringify(props),
  }).then((res) => res.json());
}
