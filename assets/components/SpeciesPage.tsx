import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import { NavBar } from "./NavBar";
import { NavBottom } from "./NavBottom";
import { useState, useEffect } from "react";
import { getBirdPicture, getBirdSummary } from "../api/wikipedia";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

export const SpeciesPage = ({ route }) => {
  const { birdInfo, navigation } = route.params;
  const [birdPicture, setBirdPicture] = useState("");
  const [birdSummary, setBirdSummary] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let birdWords = birdInfo.comName.split(" ");
    let formattedName = `${birdWords[0]}`;
    if (birdWords.length > 1) {
      for (let i = 1; i < birdWords.length; i++) {
        formattedName += ` ${birdWords[i].toLowerCase()} `;
      }
    }

    getBirdPicture(formattedName).then((res) => {
      setBirdPicture(res);
    });

    getBirdSummary(formattedName).then((res) => {
      setBirdSummary(res);
    });
  }, []);

  const styles = StyleSheet.create({
    summaryView: {
      padding: 15,
      height: 300,
      backgroundColor: "#2c3c7a",
    },
    scrollContainer: {
      borderColor: "#1c264d",
      borderWidth: 3,
      borderRadius: 10,
      marginHorizontal: 20,
      overflow: "hidden",
    },
    speciesView: {
      marginTop: 20,
      marginHorizontal: 20,
      justifyContent: "center",
    },
    speciesImage: {
      width: 225,
      height: 225,
      marginBottom: 20,
      marginLeft: 50,
      marginRight: 50,
      alignSelf: "center",
      borderColor: "#1c264d",
      borderWidth: 2,
      borderRadius: 10,
    },
    scrollText: {
      color: "white",
      fontSize: 18,
    },
    button: {
      backgroundColor: '#1c264d',
      borderRadius: 15,
      margin: 15,
      fontSize: 25,
      elevation: 20,
      shadowColor: "black",
      padding: 10,
      width: 250,
      alignSelf: "center",
    },
  });
  return (
    <>
      <NavBar navigation={navigation}></NavBar>
      <View style={{ marginTop: 10 }}>
        <View>
          <View
            style={{
              alignSelf: "center",
              marginTop: 20,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 24, color: "white", textAlign: "center" }}>{birdInfo.comName}</Text>
            <Text
              style={{ textAlign: "center", color: "white"}}
            >{`(${birdInfo.sciName})`}</Text>
          </View>

          <View style={styles.speciesView}>
            <Image
              source={isLoading ? { uri: "https://cdn.dribbble.com/users/338744/screenshots/2886346/media/bbf63c04dcd46615b991766275c6699b.gif" } : { uri: birdPicture }}
              style={styles.speciesImage}
              onLoad={() => setTimeout(() => setIsLoading(false), 500)}
            ></Image>
          </View>
          <View style={styles.scrollContainer}>
          <ScrollView nestedScrollEnabled={true} style={styles.summaryView}>
              <View style={{marginBottom:30 }}>
                <Text style={styles.scrollText}>{birdSummary}</Text>
              </View>
          </ScrollView>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Homefeed")}
          >
            <Text style={{color: "white", textAlign: "center", fontSize: 16}}>Return to Sightings Summary</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
