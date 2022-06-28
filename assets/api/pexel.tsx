import axios from "axios";

const pexelApi = axios.create({
  baseURL: "https://api.pexels.com/v1/",
  headers: {
    Authorization: "563492ad6f91700001000001025a49c8f2e84e5ab257d5b8512ad78f",
  },
});

export const getImageByBirdName = (query: string, per_page: number) => {
  return pexelApi
    .get("search?", { params: { query, per_page } })
    .then((res) => {
      return res;
    });
};
