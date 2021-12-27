export const getMemberImage = (name: String): URL => {
  const imageUrl = new URL(`/${name}`, `https://robohash.org`);
  imageUrl.searchParams.append("set", "set2");
  return imageUrl;
};
