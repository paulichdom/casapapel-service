import http from "../util/httpCommon";

const HeistURI = {
  FETCH_ALL: "heist/all",
  VIEW_HEIST_DETAILS: (heistId: number) => `/heist/${heistId}`,
};

class HeistService {
  fetchAllHeists() {
    return http.get(HeistURI.FETCH_ALL);
  }

  viewHeistDetails(heistId: number) {
    return http.get(HeistURI.VIEW_HEIST_DETAILS(heistId));
  }
}

export default new HeistService();
