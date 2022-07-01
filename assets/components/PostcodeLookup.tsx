import { StyleSheet, View, TextInput, Button } from "react-native";
import { useEffect, useState } from "react";
import { getBirdsByLocation } from "../api/ebird";
import { getLocationByPostCode } from "../api/postcodeConverter";

export const PostcodeLookup = (props: any) => {

  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const handleSubmitPostcode = () => {
    getLocationByPostCode(props.postcode)
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
    lookupPostcodeButton: {},
  });

  return (
    <>
      <View>
        <TextInput
          onChangeText={props.setPostcode}
          value={props.postcode}
          placeholder="Insert Postcode"
        ></TextInput>
        <Button title="Look Up" onPress={() => handleSubmitPostcode()}></Button>
      </View>
    </>
  );
};
