export async function deleteUser() {
  return fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user`, {
    method: "DELETE",
    next: { revalidate: false },
  }).then((res) => res.json());
}
