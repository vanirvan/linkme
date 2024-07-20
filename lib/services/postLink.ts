interface ServiceProps {
  url: string;
  title: string;
}

export async function postLink({ url, title }: ServiceProps) {
  const f = await fetch("http://localhost:3000/api/links", {
    method: "POST",
    body: JSON.stringify({
      url,
      title,
    }),
  }).then((res) => res.json());

  console.log(f);

  // if (!f.ok) {
  //   throw new Error("ERROR POST LINKS");
  // }

  return f;
}
