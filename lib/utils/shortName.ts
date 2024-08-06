export function shortName(name?: string) {
  if (!name) return;

  const tempName = name.split(" ");
  if (tempName.length == 1) {
    return tempName[0].split("")[0];
  } else {
    return `${tempName[0].split("")[0]} ${tempName[1].split("")[0]}`;
  }
}
