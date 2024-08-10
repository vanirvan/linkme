export async function deleteProfileImage(image: string) {
  await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/upload`, {
    method: "DELETE",
    body: JSON.stringify({ image }),
  });
}
