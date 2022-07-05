import { StyleSheet, Text, View, Image } from "react-native";
import { NavBar } from "./NavBar";
import { NavBottom } from "./NavBottom";
import { useState, useEffect } from "react";
import { getBirdPicture } from "../api/wikipedia";

export const SpeciesPage = ({ route }) => {
  const { birdInfo } = route.params;
  const [birdPicture, setBirdPicture] = useState("");

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
  });
  return (
    <>
      <NavBar></NavBar>
      <View>
        <Text>{birdInfo.comName}</Text>
        <Text>{`(${birdInfo.sciName})`}</Text>
        <View>
          <Image
            source={{ uri: birdPicture }}
            style={{ width: 250, height: 250 }}
          ></Image>
        </View>
      </View>
    </>
  );
};
