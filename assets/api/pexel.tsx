import axios from "axios";

const pexelApi = axios.create({
  baseURL: "https://api.pexels.com/v1/",
  headers: {
    Authorization: "API TOKEN",
  },
});

export const getImageByBirdName = (query: string, per_page: number) => {
  return pexelApi
    .get("search?", { params: { query, per_page } })
    .then((res) => {
      return res;
    });
};
