import axios from "axios";

const eBirdApi = axios.create({
  baseURL: "https://api.ebird.org/v2/",
  headers: API TOKEN
});

export const getRecentBirdsByLocation = (lat:number, lng:number) => {
  return eBirdApi.get("data/obs/geo/recent?", { params: { lat, lng } })
  .then((res) => {
    return res;
  })
};
