import http from "../util/httpCommon";

const BACON_IPSUM_URI =
  "https://baconipsum.com/api/?type=all-meat&paras=1&start-with-lorem=1";

export const getBaconIpsum = async () => {
  try {
    const response = await http.get(BACON_IPSUM_URI);
    return response.data;
  } catch (error) {
    return error;
  }
};
