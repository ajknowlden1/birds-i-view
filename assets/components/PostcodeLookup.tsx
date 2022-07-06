import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from "react-native";
import { useEffect, useState } from "react";
import { getBirdsByLocation } from "../api/ebird";
import { getLocationByPostCode } from "../api/postcodeConverter";

export const PostcodeLookup = (props: any) => {

  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const handleSubmitPostcode = () => {
    getLocationByPostCode(props.postcode)
      .then((res) => {

        setLat(parseFloat(parseFloat(res.data.data.latitude).toFixed(2)));
        setLng(parseFloat(parseFloat(res.data.data.longitude).toFixed(2)));
      })
      .catch((err) => {
        Alert.alert("Please enter a valid postcode");
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
      textContent: "center",
      marginBottom: 5,
    },
    text: {
      color: "white",
      textAlign: "center",
    },
    textinput: {
      color: "white",
      textAlign: "center",
      borderColor: '#1c264d',
      borderWidth: 2,
      borderRadius: 5,
      marginTop: 5,
    },
    btn: {
      backgroundColor: '#1c264d',
      borderRadius: 10,
      marginTop: 5,
      padding: 10,
      fontSize: 35,
      elevation: 20,
      shadowColor: "black",
    },
  });


  return (
    <>
      <View style={styles.lookupPostcodeField}>
        <TextInput
          onChangeText={props.setPostcode}
          value={props.postcode}
          placeholder="Type Postcode"
          placeholderTextColor="lightgray"
          style={styles.textinput}
        ></TextInput>
        <TouchableOpacity style={styles.btn} onPress={() => handleSubmitPostcode()}><Text style={styles.text}>Submit Postcode</Text></TouchableOpacity>
      </View>
    </>
  );
};
