import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { getBirdByCommonName, getAllRecentBirdsByCountry } from "../api/ebird";
import Autocomplete from "react-native-autocomplete-input";

export const BirdLookup = (props: any) => {
  const [speciesCode, setSpeciesCode] = useState("");
  const [commonName, setCommonName] = useState("");
  const [allBirds, setAllBirds] = useState([]);
  const [filteredBirds, setFilteredBirds] = useState<any>([]);

  const findBird = (input) => {
    if (input) {
      setFilteredBirds(
        allBirds.filter((bird) =>
          bird.comName.toLowerCase().includes(input.toLowerCase())
        )
      );
    } else {
      setFilteredBirds([]);
    }
  };

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
        <Autocomplete
          data={filteredBirds}
          value={commonName}
          onChangeText={(text) => {
            findBird(text);
            setCommonName(text);
          }}
          placeholder="Seach bird"
          flatListProps={{
            renderItem: ({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setCommonName(item.comName);
                  setFilteredBirds([]);
                }}
              >
                <Text>{item.comName}</Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Button
          title="Look Up"
          onPress={() => handleSubmitBirdLookup()}
        ></Button>
      </View>
    </>
  );
};
