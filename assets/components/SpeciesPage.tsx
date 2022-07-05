import { StyleSheet, Text, View, Image } from "react-native";
import { NavBar } from "./NavBar";
import { NavBottom } from "./NavBottom";
import { useState, useEffect } from "react";
import { getBirdPicture, getBirdSummary } from "../api/wikipedia";

export const SpeciesPage = ({ route }) => {
  const { birdInfo } = route.params;
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
  return (
    <>
      <NavBar></NavBar>
      <View>
        <Text>{birdInfo.comName}</Text>
        <Text>{`(${birdInfo.sciName})`}</Text>
        <View>
          <Image
            source={
              isLoading
                ? {
                    uri: "https://i2.wp.com/raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif?w=770&is-pending-load=1#038;ssl=1",
                  }
                : { uri: birdPicture }
            }
            style={{ width: 250, height: 250 }}
            onLoad={() => setTimeout(() => setIsLoading(false), 1000)}
          ></Image>

          <Text>{birdSummary}</Text>
        </View>
      </View>
    </>
  );
};
