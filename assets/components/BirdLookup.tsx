import { StyleSheet, View, TextInput, Button } from "react-native";
import { useState, useEffect } from "react";
import { getBirdByCommonName } from "../api/ebird";
import { common_Names } from "../../common-names";

export const BirdLookup = (props: any) => {
  const [speciesCode, setSpeciesCode] = useState("");
  const [commonName, setCommonName] = useState("");

  //function that converts common name to species code
  const handleSubmitBirdLookup = () => {
    //check if the bird name exists in the bulk data, STRICT MODE, user must input the full correct name for a specific bird
    //if required, can make the search less strict and show all birds types of that species
    const birdName = common_Names.filter(
      (pair) =>
        pair.COMMON_NAME.toLowerCase() === commonName.toLocaleLowerCase() //allows case insensitive input
    );
    if (!birdName.length) {
      alert("Please type a correct bird name in full");
      setCommonName("");
    }
    //convert to species code
    else {
      setSpeciesCode(birdName[0].SPECIES_CODE);
      setCommonName("");
    }
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
