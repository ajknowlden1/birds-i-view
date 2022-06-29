import axios from "axios";

const postcodeApi = axios.create({
  baseURL: "http://api.getthedata.com/postcode/",
});

export const getLocationByPostCode = (postcode: string) => {
  return postcodeApi.get(postcode).then((res) => {
    return res;
  });
};
