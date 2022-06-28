import { StyleSheet, Text, View, Image } from "react-native";
import { NavBar } from "./NavBar";
import { NavBottom } from "./NavBottom";
import { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { getRecentBirdsByLocation } from "../api/ebird";
import { getImageByBirdName } from "../api/pexel";

export default function Homefeed() {
  interface IBirds {
    speciesCode: string;
    comName: string;
    sciName: string;
    locId: string;
    locName: string;
    obsDt: string;
    howMany: number;
    lat: number;
    lng: number;
    obsValid: boolean;
    obsReviewed: boolean;
    locationPrivate: boolean;
    subId: string;
  }
  const [birds, setBirds] = useState<IBirds[] | []>([]);

  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [imgUrls, setImgUrls] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const birdsNames: string[] = [];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(Math.trunc(position.coords.latitude));
      setLng(Math.trunc(position.coords.longitude));
    });

    if (lat !== 0 && lng !== 0) {
      getRecentBirdsByLocation(lat, lng).then((res: any) => {
        setBirds(res.data);
      });
    }
  }, [lat, lng]);

  birds.forEach((bird) => {
    birdsNames.push(bird.comName);
  });

  useEffect(() => {
    setIsLoading(true);
    birdsNames.forEach((birdName) => {
      getImageByBirdName(birdName, 1).then((res: any) => {
        setImgUrls((previous: any) => [
          ...previous,
          res.data.photos[0].src.original,
        ]);
        setIsLoading(false);
      });
    });
  }, []);

  const styles = StyleSheet.create({
    localFeed: {
      borderColor: "black",
      borderWidth: 2,
      borderStyle: "solid",
      backgroundColor: "darkblue",
      marginBottom: "2.5%",
      height: 50,

      marginLeft: 20,
      marginRight: 20,
    },
    listItem: {
      flex: 1,
      flexDirection: "row",
      marginTop: 2.5,
      marginBottom: 2.5,
      borderColor: "black",
      borderWidth: 1,
      borderStyle: "solid",
      paddingLeft: 2.5,
      paddingRight: 2.5,
      backgroundColor: "royalblue",
    },
  });

  if (isLoading)
    return (
      <View>
        <Text>Loading data, please wait...</Text>
      </View>
    );
  return (
    <>
      <NavBar></NavBar>
      <Text style={{ padding: 10 }}>Sightings Summary</Text>
      <ScrollView style={styles.localFeed} nestedScrollEnabled={true}>
        <View>
          {birds.map((bird, index) => {
            return (
              <>
                <View style={styles.listItem}>
                  <Image
                    source={{
                      uri: imgUrls[index],
                    }}
                    style={{ width: "50px", height: "50px", padding: 2.5 }}
                  ></Image>
                  <Text>{`${bird.howMany} ${bird.comName} at ${bird.locName}`}</Text>
                </View>
              </>
            );
          })}
        </View>
      </ScrollView>
      <NavBottom></NavBottom>
    </>
  );
}
