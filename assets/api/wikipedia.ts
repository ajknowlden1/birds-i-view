import axios from "axios";

const wikipediaAPI = axios.create({
  baseURL: "",
  headers: {
    "Api-User-Agent": "axios/0.27.2 ajknowlden1@gmail.com react-native/0.68.2",
  },
});

export const getBirdPicture = (birdName: string) => {
  return axios
    .get(
      `http://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${birdName}&origin=*`
    )
    .then((res) => {
      const { data } = res;
      let pageId = Object.keys(data.query.pages)[0];

      return data.query.pages[pageId].original.source;
    });
};
