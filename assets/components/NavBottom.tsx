
import {useState, useEffect} from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { PostcodeLookup } from "./PostcodeLookup";

export const NavBottom = (props: any) => {

  function submitSightingNav() {
    props.navigation.navigate('SubmitSighting');
  }

  return (
    <>
      <View style={styles.navBar}>
        <Text style={styles.navItem}>Lookup Bird</Text>
        <PostcodeLookup setBirds={props.setBirds} postcode={props.postcode} setPostcode={props.setPostcode}></PostcodeLookup>
        <TouchableOpacity onPress={submitSightingNav} style={styles.navItem}><Text style={styles.navBtnText}>Submit Sighting</Text></TouchableOpacity>      
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: "auto",
    height: "auto",
    justifyContent: "center",
    alignContent: "center",
    borderColor: "black",
    borderWidth: 2,
  },
  navItem: {
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    fontSize: 20,
    textAlign: "center",
  },
  navBtnText: {
    fontSize: 20,
    textAlign: "center",
  }
});