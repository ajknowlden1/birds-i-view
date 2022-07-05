import { StyleSheet, View, TextInput, Button } from "react-native";
import { useEffect, useState } from "react";
import { getBirdsByLocation } from "../api/ebird";
import { getLocationByPostCode } from "../api/postcodeConverter";

export const PostcodeLookup = (props: any) => {
  const [postcode, setPostcode] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const handleSubmitPostcode = () => {
    getLocationByPostCode(postcode)
      .then((res) => {
        setLat(Math.trunc(res.data.data.latitude));
        setLng(Math.trunc(res.data.data.longitude));
      })
      .catch((err) => {
        alert("Please enter a valid postcode");
      });
  };

  useEffect(() => {
    if (lat !== 0) {
      getBirdsByLocation(lat, lng).then((res: any) => {
        if (res.data.length) {
          props.setBirds(res.data);
        } else {
          alert("No birds found nearby");
        }
      });
    }
  }, [lat, lng]);

  const styles = StyleSheet.create({
    lookupPostcodeField: {
      fontSize: 14,
      width: 140,
      paddingTop: 1.7,
    },
  });

  return (
    <>
      <View style={styles.lookupPostcodeField}>
        <TextInput
          onChangeText={setPostcode}
          value={postcode}
          placeholder="Insert Postcode"
        ></TextInput>
        <Button title="Look Up" onPress={() => handleSubmitPostcode()}></Button>
      </View>
    </>
  );
};
