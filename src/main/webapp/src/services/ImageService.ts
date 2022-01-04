import http from "../util/httpCommon";

export const getMemberImage = (name: String): URL => {
  const imageUrl = new URL(`/${name}`, `https://robohash.org`);
  imageUrl.searchParams.append("set", "set2");
  return imageUrl;
};

export const getCityImage = (): Promise<any> => {
  return http
    .get("https://source.unsplash.com/1600x900/?city")
    .then((response) => response.data);
};
