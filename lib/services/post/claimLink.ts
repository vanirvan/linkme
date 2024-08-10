export async function claimLink(link: string) {
  const f = fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/links/claim`, {
    method: "POST",
    body: JSON.stringify({ linkClaim: link }),
    next: { revalidate: false },
  }).then((res) => res.json());

  return f;
}
