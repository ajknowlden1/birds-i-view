import { StyleSheet, View, TextInput, Button } from "react-native";
import { useState, useEffect } from "react";
import { getBirdByCommonName } from "../api/ebird";

export const BirdLookup = (props: any) => {
  const [speciesCode, setSpeciesCode] = useState("");
  const [commonName, setCommonName] = useState("");

  //function that converts common name to species code
  const handleSubmitBirdLookup = () => {
    //json file to convert to species code
    setSpeciesCode(commonName);
    setCommonName("");
  };

  useEffect(() => {
    getBirdByCommonName(speciesCode)
      .then((res: any) => {
        if (res.data.length === 0) {
          alert("Please type a bird in the UK");
        } else {
          props.setBirds(res.data);
          setCommonName("");
        }
      })
      .catch((err) => {
        alert("Please type a correct bird name");
      });
  }, [speciesCode]);

  const styles = StyleSheet.create({
    handleSubmitBirdLookup: {},
  });

  return (
    <>
      <View>
        <TextInput
          onChangeText={setCommonName}
          value={commonName}
          placeholder="Seach bird"
        ></TextInput>
        <Button
          title="Look Up"
          onPress={() => handleSubmitBirdLookup()}
        ></Button>
      </View>
    </>
  );
};
