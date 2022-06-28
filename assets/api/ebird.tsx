import axios from "axios";

const eBirdApi = axios.create({
  baseURL: "https://api.ebird.org/v2/",
  headers: {'X-eBirdApiToken': '60cs4036s2ab'}
});

export const getRecentBirdsByLocation = (lat:number, lng:number) => {
  return eBirdApi.get("data/obs/geo/recent?", { params: { lat, lng } })
  .then((res) => {
    return res;
  })
};
