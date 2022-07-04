import { StyleSheet, Text, View, Image } from "react-native";
import { NavBar } from "./NavBar";
import { NavBottom } from "./NavBottom";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";

export default function Homefeed({navigation}: {navigation: any}) {
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
    {
      speciesCode: "eurgol",
      comName: "European Goldfinch",
      sciName: "Carduelis carduelis",
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
      speciesCode: "eurgre1",
      comName: "European Greenfinch",
      sciName: "Chloris chloris",
      locId: "L12907860",
      locName: "Home",
      obsDt: "2022-06-22 06:00",
      howMany: 2,
      lat: 53.6069079,
      lng: -1.3698524,
      obsValid: true,
      obsReviewed: false,
      locationPrivate: true,
      subId: "S113505510",
    },
    {
      speciesCode: "houspa",
      comName: "House Sparrow",
      sciName: "Passer domesticus",
      locId: "L12907860",
      locName: "Home",
      obsDt: "2022-06-22 06:00",
      howMany: 9,
      lat: 53.6069079,
      lng: -1.3698524,
      obsValid: true,
      obsReviewed: false,
      locationPrivate: true,
      subId: "S113505510",
    },
    {
      speciesCode: "wlwwar",
      comName: "Willow Warbler",
      sciName: "Phylloscopus trochilus",
      locId: "L8880299",
      locName: "Soil Hill",
      obsDt: "2022-06-22 05:48",
      howMany: 5,
      lat: 53.7789369,
      lng: -1.8855123,
      obsValid: true,
      obsReviewed: false,
      locationPrivate: false,
      subId: "S113505026",
    },
    {
      speciesCode: "commoo3",
      comName: "Eurasian Moorhen",
      sciName: "Gallinula chloropus",
      locId: "L8880299",
      locName: "Soil Hill",
      obsDt: "2022-06-22 05:48",
      howMany: 2,
      lat: 53.7789369,
      lng: -1.8855123,
      obsValid: true,
      obsReviewed: false,
      locationPrivate: false,
      subId: "S113505026",
    },
    {
      speciesCode: "rinphe",
      comName: "Ring-necked Pheasant",
      sciName: "Phasianus colchicus",
      locId: "L8880299",
      locName: "Soil Hill",
      obsDt: "2022-06-22 05:48",
      howMany: 4,
      lat: 53.7789369,
      lng: -1.8855123,
      obsValid: true,
      obsReviewed: false,
      locationPrivate: false,
      subId: "S113505026",
    },
    {
      speciesCode: "cangoo",
      comName: "Canada Goose",
      sciName: "Branta canadensis",
      locId: "L8880299",
      locName: "Soil Hill",
      obsDt: "2022-06-22 05:48",
      howMany: 13,
      lat: 53.7789369,
      lng: -1.8855123,
      obsValid: true,
      obsReviewed: false,
      locationPrivate: false,
      subId: "S113505026",
    },
    {
      speciesCode: "whiwag",
      comName: "White Wagtail",
      sciName: "Motacilla alba",
      locId: "L8880299",
      locName: "Soil Hill",
      obsDt: "2022-06-22 05:48",
      howMany: 2,
      lat: 53.7789369,
      lng: -1.8855123,
      obsValid: true,
      obsReviewed: false,
      locationPrivate: false,
      subId: "S113505026",
    },
    {
      speciesCode: "lbbgul",
      comName: "Lesser Black-backed Gull",
      sciName: "Larus fuscus",
      locId: "L8880299",
      locName: "Soil Hill",
      obsDt: "2022-06-22 05:48",
      howMany: 5,
      lat: 53.7789369,
      lng: -1.8855123,
      obsValid: true,
      obsReviewed: false,
      locationPrivate: false,
      subId: "S113505026",
    },
    {
      speciesCode: "eurcur",
      comName: "Eurasian Curlew",
      sciName: "Numenius arquata",
      locId: "L8880299",
      locName: "Soil Hill",
      obsDt: "2022-06-22 05:48",
      howMany: 1,
      lat: 53.7789369,
      lng: -1.8855123,
      obsValid: true,
      obsReviewed: false,
      locationPrivate: false,
      subId: "S113505026",
    },
    {
      speciesCode: "grewhi1",
      comName: "Greater Whitethroat",
      sciName: "Curruca communis",
      locId: "L8880299",
      locName: "Soil Hill",
      obsDt: "2022-06-22 05:48",
      howMany: 7,
      lat: 53.7789369,
      lng: -1.8855123,
      obsValid: true,
      obsReviewed: false,
      locationPrivate: false,
      subId: "S113505026",
    },
    {
      speciesCode: "eurjac",
      comName: "Eurasian Jackdaw",
      sciName: "Corvus monedula",
      locId: "L8880299",
      locName: "Soil Hill",
      obsDt: "2022-06-22 05:48",
      howMany: 5,
      lat: 53.7789369,
      lng: -1.8855123,
      obsValid: true,
      obsReviewed: false,
      locationPrivate: false,
      subId: "S113505026",
    },
  ]);

  return (
    <>
      <NavBar navigation={navigation}></NavBar>
      <Text style={{ padding: 10 }}>Sightings Summary</Text>
      <ScrollView style={styles.localFeed} nestedScrollEnabled={true}>
        <View>
          {birds.map((bird) => {
            return (
              <>
                <View style={styles.listItem}>
                  <Image
                    source={{
                      uri: "https://images.pexels.com/photos/70069/pexels-photo-70069.jpeg",
                    }}
                    style={{ width: 50, height: 50, padding: 2.5 }}
                  ></Image>
                  <Text>
                    {bird.howMany
                      ? `${bird.howMany} ${bird.comName} at ${bird.locName}`
                      : `${bird.comName} at ${bird.locName}`}
                  </Text>
                </View>
              </>
            );
          })}
        </View>
      </ScrollView>
      <NavBottom setBirds={setBirds} navigation={navigation}></NavBottom>
    </>
  );
}

const styles = StyleSheet.create({
  localFeed: {
    borderColor: "black",
    borderWidth: 2,
    borderStyle: "solid",
    backgroundColor: "darkblue",
    marginBottom: 2.5,
    height: 400,
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
    padding: 1,
  },
});