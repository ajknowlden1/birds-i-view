import axios from "axios";

const eBirdApi = axios.create({
  baseURL: "https://www.xeno-canto.org/api/2/",
});

export const getBirdSound = (commonName: string) => {
  return eBirdApi
    .get(`recordings?query=${commonName}`)
    .then((res: any) => {
      console.log(res, "<<<<<<<res in sound api");
      return res;
    })
    .catch((err) => {
      console.log(err, "<<<<<<<<<<err in api");
    });
};

// export const getBirdSound = (commonName: string) => {
//   return (
//     axios
//       //  used a proxy to get around the CORS policy of the browser if the backend api does not suppot CORS
//       // api returns 200 with error msg tho
//       .get(
//         `https://attach-cors.herokuapp.com/https://www.xeno-canto.org/api/2/recordings?query=${commonName}`
//       )

//       .then((res: any) => {
//         console.log(res, "<<<<<<<res in sound api");
//         return res;
//       })
//       .catch((err) => {
//         console.log(err, "<<<<<<<<<<err in api");
//       })
//   );
// };
