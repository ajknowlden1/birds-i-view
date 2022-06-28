import { StyleSheet, Text, View } from "react-native";
import { NavBar } from "./NavBar";
import { NavBottom } from "./NavBottom";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";

export default function Homefeed() {
  const [birds, setBirds] = useState([
    {
      speciesCode: "eurrob1",
      comName: "European Robin",
      sciName: "Erithacus rubecula",
      locId: "L2578311",
      locName: "Cromwell Bottom NR",
      obsDt: "2022-06-22 08:29",
      howMany: 2,
      lat: 53.6967238,
      lng: -1.8107593,
      obsValid: true,
      obsReviewed: false,
      locationPrivate: false,
      subId: "S113506184",
    },
    {
      speciesCode: "mallar3",
      comName: "Mallard",
      sciName: "Anas platyrhynchos",
      locId: "L2578311",
      locName: "Cromwell Bottom NR",
      obsDt: "2022-06-22 08:29",
      howMany: 7,
      lat: 53.6967238,
      lng: -1.8107593,
      obsValid: true,
      obsReviewed: false,
      locationPrivate: false,
      subId: "S113506184",
    },
    {
      speciesCode: "cowpig1",
      comName: "Common Wood-Pigeon",
      sciName: "Columba palumbus",
      locId: "L2578311",
      locName: "Cromwell Bottom NR",
      obsDt: "2022-06-22 08:29",
      howMany: 1,
      lat: 53.6967238,
      lng: -1.8107593,
      obsValid: true,
      obsReviewed: false,
      locationPrivate: false,
      subId: "S113506184",
    },
    {
      speciesCode: "eurmag1",
      comName: "Eurasian Magpie",
      sciName: "Pica pica",
      locId: "L2578311",
      locName: "Cromwell Bottom NR",
      obsDt: "2022-06-22 08:29",
      howMany: 1,
      lat: 53.6967238,
      lng: -1.8107593,
      obsValid: true,
      obsReviewed: false,
      locationPrivate: false,
      subId: "S113506184",
    },
    {
      speciesCode: "eurcoo",
      comName: "Eurasian Coot",
      sciName: "Fulica atra",
      locId: "L2578311",
      locName: "Cromwell Bottom NR",
      obsDt: "2022-06-22 08:29",
      howMany: 1,
      lat: 53.6967238,
      lng: -1.8107593,
      obsValid: true,
      obsReviewed: false,
      locationPrivate: false,
      subId: "S113506184",
    },
    {
      speciesCode: "winwre4",
      comName: "Eurasian Wren",
      sciName: "Troglodytes troglodytes",
      locId: "L2578311",
      locName: "Cromwell Bottom NR",
      obsDt: "2022-06-22 08:29",
      howMany: 1,
      lat: 53.6967238,
      lng: -1.8107593,
      obsValid: true,
      obsReviewed: false,
      locationPrivate: false,
      subId: "S113506184",
    },
    {
      speciesCode: "gretit1",
      comName: "Great Tit",
      sciName: "Parus major",
      locId: "L2578311",
      locName: "Cromwell Bottom NR",
      obsDt: "2022-06-22 08:29",
      howMany: 2,
      lat: 53.6967238,
      lng: -1.8107593,
      obsValid: true,
      obsReviewed: false,
      locationPrivate: false,
      subId: "S113506184",
    },
    {
      speciesCode: "eurbla",
      comName: "Eurasian Blackbird",
      sciName: "Turdus merula",
      locId: "L2578311",
      locName: "Cromwell Bottom NR",
      obsDt: "2022-06-22 08:29",
      howMany: 2,
      lat: 53.6967238,
      lng: -1.8107593,
      obsValid: true,
      obsReviewed: false,
      locationPrivate: false,
      subId: "S113506184",
    },
    {
      speciesCode: "lottit1",
      comName: "Long-tailed Tit",
      sciName: "Aegithalos caudatus",
      locId: "L2578311",
      locName: "Cromwell Bottom NR",
      obsDt: "2022-06-22 08:29",
      howMany: 2,
      lat: 53.6967238,
      lng: -1.8107593,
      obsValid: true,
      obsReviewed: false,
      locationPrivate: false,
      subId: "S113506184",
    },
    {
      speciesCode: "carcro1",
      comName: "Carrion Crow",
      sciName: "Corvus corone",
      locId: "L2578311",
      locName: "Cromwell Bottom NR",
      obsDt: "2022-06-22 08:29",
      howMany: 2,
      lat: 53.6967238,
      lng: -1.8107593,
      obsValid: true,
      obsReviewed: false,
      locationPrivate: false,
      subId: "S113506184",
    },
    {
      speciesCode: "sonthr1",
      comName: "Song Thrush",
      sciName: "Turdus philomelos",
      locId: "L12907860",
      locName: "Home",
      obsDt: "2022-06-22 06:00",
      howMany: 1,
      lat: 53.6069079,
      lng: -1.3698524,
      obsValid: true,
      obsReviewed: false,
      locationPrivate: true,
      subId: "S113505510",
    },
    {
      speciesCode: "blutit",
      comName: "Eurasian Blue Tit",
      sciName: "Cyanistes caeruleus",
      locId: "L12907860",
      locName: "Home",
      obsDt: "2022-06-22 06:00",
      howMany: 1,
      lat: 53.6069079,
      lng: -1.3698524,
      obsValid: true,
      obsReviewed: false,
      locationPrivate: true,
      subId: "S113505510",
    },
  ]);
  const styles = StyleSheet.create({
    localFeed: {
      height: "80%",
      borderColor: "black",
      borderWidth: 2,
      borderStyle: "solid",

      marginLeft: 20,
      marginRight: 20,
    },
    listItem: {
      marginTop: 2.5,
      marginBottom: 2.5,
      borderColor: "black",
      borderWidth: 1,
      borderStyle: "solid",
      paddingLeft: 2.5,
      paddingRight: 2.5,
    },
  });
  return (
    <>
      <NavBar></NavBar>
      <ScrollView style={styles.localFeed}>
        {birds.map((bird) => {
          return (
            <>
              <View style={styles.listItem}>
                <Text>{`${bird.howMany} ${bird.comName}`}</Text>
                <Text>{bird.locName}</Text>
              </View>
            </>
          );
        })}
      </ScrollView>
      <NavBottom></NavBottom>
    </>
  );
}
