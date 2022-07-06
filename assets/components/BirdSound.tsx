import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useState, useEffect } from "react";
import { getBirdSound } from "../api/sound";

export const BirdSound = (props: any) => {
  const [soundUrl, setSoundUrl] = useState("");
  const [commonName, setCommonName] = useState("Tinamou");

  useEffect(() => {
    getBirdSound(commonName).then((res: any) => {});
  }, []);

  return (
    <>
      <View>
        <Text>Hello, here would be sound player</Text>
      </View>
    </>
  );
};
