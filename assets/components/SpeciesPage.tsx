import { StyleSheet, Text, View, Image, Button } from "react-native";
import { NavBar } from "./NavBar";
import { NavBottom } from "./NavBottom";
import { useState, useEffect } from "react";
import { getBirdPicture, getBirdSummary } from "../api/wikipedia";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { BirdSound } from "./BirdSound";

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
  });

  const styles = StyleSheet.create({
    summaryView: {
      borderColor: "black",
      borderWidth: 2,
      borderRadius: 10,
      marginBottom: 2.5,
      height: 400,
      marginLeft: 20,
      marginRight: 20,
      marginTop: 75,
      padding: 15,
    },
    speciesView: {
      marginTop: 100,
      marginLeft: 20,
      marginRight: 20,
      justifyContent: "center",
      height: 100,
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
            <Text style={{ fontSize: 24 }}>{birdInfo.comName}</Text>
            <Text
              style={{ textAlign: "center" }}
            >{`(${birdInfo.sciName})`}</Text>
          </View>

          <View style={styles.speciesView}>
            <Image
              source={
                isLoading
                  ? {
                      uri: "https://i2.wp.com/raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif?w=770&is-pending-load=1#038;ssl=1",
                    }
                  : { uri: birdPicture }
              }
              style={{
                width: 225,
                height: 225,
                marginBottom: 20,
                marginLeft: 50,
                marginRight: 50,
                alignSelf: "center",
                borderColor: "black",
                borderWidth: 2,
              }}
              onLoad={() => setTimeout(() => setIsLoading(false), 1000)}
            ></Image>
            <BirdSound />
          </View>

          <ScrollView nestedScrollEnabled={true} style={styles.summaryView}>
            <View>
              <Text>{birdSummary}</Text>
            </View>
          </ScrollView>
          <TouchableOpacity
            style={{ marginTop: 30, width: 200, alignSelf: "center" }}
          >
            <Button
              color={"royalblue"}
              title="Return to Sightings Summary"
              onPress={() => navigation.navigate("Homefeed")}
            ></Button>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
