import axios from "axios";
import { apiKeys } from "../../secretKeys";

const eBirdApi = axios.create({
  baseURL: "https://api.ebird.org/v2/",
  headers: { "X-eBirdApiToken": apiKeys.ebird },
});

export const getBirdsByLocation = (lat: number, lng: number) => {
  return eBirdApi
    .get("data/obs/geo/recent?", { params: { lat, lng } })
    .then((res) => {
      return res;
    });
};

export const getAllRecentBirdsByCountry = () => {
  return eBirdApi.get("data/obs/GB/recent").then((res) => {
    return res;
  });
};

export const getBirdByCommonName = (speciesCode: string) => {
  return eBirdApi.get(`data/obs/GB/recent/${speciesCode}`).then((res) => {
    console.log(speciesCode, "<<<<<<<<<<speciesCode in api");
    console.log(res, "<<<<<<<<<<<<<res in api");
    return res;
  });
};
