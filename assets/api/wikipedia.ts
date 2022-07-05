import axios from "axios";

export const getBirdPicture = (birdName: string) => {
  return axios
    .get(
      `http://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&redirects=true&titles=${birdName}&origin=*`
    )
    .then((res) => {
      const { data } = res;
      let pageId = Object.keys(data.query.pages)[0];

      return data.query.pages[pageId].original.source;
    });
};

export const getBirdSummary = (birdName: string) => {
  return axios
    .get(
      `http://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&explaintext&exintro&exlimit=10&redirects=true&titles=${birdName}&origin=*`
    )
    .then((res) => {
      const { data } = res;

      let pageId = Object.keys(data.query.pages)[0];
      return data.query.pages[pageId].extract;
    });
};
