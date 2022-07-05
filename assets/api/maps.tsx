import axios from "axios";
import apiKeys from "../../secretKeys"

const mapsApi = axios.create({
    baseURL: "https://maps.googleapis.com/maps/api/geocode/"
})

export const getAddressByLatLon = (lat: number, lng: number) => {
    return mapsApi.get(`json?latlng=${lat},${lng}&key=${apiKeys.maps}`)
    .then((res) => {
        return res;
    }).catch((err) => {console.log(err)})
}

