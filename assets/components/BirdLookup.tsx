import { StyleSheet, View, TextInput, Button } from "react-native";
import { useState, useEffect } from "react";
import { getBirdByCommonName, getAllRecentBirdsByCountry } from "../api/ebird";

export const BirdLookup = (props: any) => {
  const [speciesCode, setSpeciesCode] = useState("");
  const [commonName, setCommonName] = useState("");
  const [allBirds, setAllBirds] = useState([]);

  useEffect(() => {
    getAllRecentBirdsByCountry().then((res: any) => {
      setAllBirds(res.data);
      props.setBirds(res.data); //put all recent sightings on show when app starts
    });
  }, []);

  useEffect(() => {
    getBirdByCommonName(speciesCode).then((res: any) => {
      props.setBirds(res.data);
    });
  }, [speciesCode]);

  const handleSubmitBirdLookup = () => {
    const birdName = allBirds.filter(
      (bird) => bird.comName.toLowerCase() === commonName.toLowerCase() //allows case insensitive input
    );
    if (!birdName.length) {
      alert("Please enter a correct UK bird name in full");
      setCommonName("");
    } else {
      setSpeciesCode(birdName[0].speciesCode);
      setCommonName("");
    }
  };

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
