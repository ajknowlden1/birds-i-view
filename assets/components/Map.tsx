import { useState, useEffect } from "react";
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native";
import MapView, { PROVIDER_GOOGLE, Heatmap } from "react-native-maps";
import { getBirdsByLocation } from "../api/ebird";
import { getLocationByPostCode } from "../api/postcodeConverter";
import * as Location from "expo-location";
import { NavBottom } from "./NavBottom";

export default function Map({ route }) {
  const [points, setPoints] = useState<IPoints[] | []>([]);
  const { postcode, setPostcode, sightings, setBirds, navigation } = route.params;
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [delta, setDelta] = useState(0.3);
  const [positioned, setPositioned] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bird, setBird] = useState({});

  interface IPoints {
    latitude: number;
    longitude: number;
    weight: number;
  }

  const arr = [];

  function homeNav(){
    navigation.navigate('Homefeed', {sightings: sightings})
  }

  function speciesNav(){
    navigation.navigate('SpeciesPage', {
      birdInfo: bird,
      navigation: navigation
    })
  }
  
  useEffect(() => {
    if(!postcode){
      setLat(53.8008)
      setLng(-1.5491)
      setDelta(5);
      setBird(sightings[0])
      sightings.forEach((bird: any) => {
        const { lat, lng, howMany } = bird;
        arr.push({ latitude: lat, longitude: lng, weight: howMany });
        setPositioned(true);
      });
      setPoints(arr);
    } else {
      getLocationByPostCode(postcode)
      .then((res) => {
        setLat(res.data.data.latitude);
        setLng(res.data.data.longitude);
        getBirdsByLocation(lat, lng).then((res: any) => {
          res.data.forEach((bird: any) => {
            const { lat, lng, howMany } = bird;
            arr.push({ latitude: lat, longitude: lng, weight: howMany });
            setPositioned(true);
          });
          setPoints(arr);
        });
      })
      .catch((err) => {});
    }

  }, [lat, lng, positioned]);

  if (positioned && points.length > 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Sightings Heatmap</Text>
        <MapView
          loadingEnabled
          style={styles.map}
          initialRegion={{
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),
            latitudeDelta: delta,
            longitudeDelta: delta,
          }}
          provider={PROVIDER_GOOGLE}
        >
        <Heatmap
            points={points}
            opacity={1}
            radius={50}
            gradient={{
              colors: ["red", "blue"],
              startPoints: [0.1, 0.7],
              colorMapSize: 128,
            }}
          />
        </MapView>
        <View style={styles.navBar}>
        <TouchableOpacity style={styles.button}><Text style={styles.text} onPress={homeNav}>Summary of Sightings</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button}><Text style={styles.text} onPress={speciesNav}>Bird Info Page</Text></TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <Text style={styles.text}>Please Enter A Valid Postcode</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width - 35,
    height: Dimensions.get("window").height - 200,
  },
  container: {
    marginTop: 15,
    alignItems: "center",
  },
  text: {
    padding: 15,
    fontSize: 15,
    margin:5,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#9cbedb",
    borderRadius: 15,
    margin: 15,
    fontSize: 25,
  },
  navBar: {
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: "auto",
    height: "auto",
    justifyContent: "center",
    alignContent: "center",
  },
});
