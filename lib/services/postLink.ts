export function postLink(props: { url: string; title: string }) {
  return fetch("http://localhost:3000/api/links", {
    method: "POST",
    body: JSON.stringify(props),
  });
}
