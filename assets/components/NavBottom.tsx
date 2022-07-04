import {useState, useEffect} from "react"
import { StyleSheet, Text, View } from "react-native";
import { PostcodeLookup } from "./PostcodeLookup";
import { BirdLookup } from "./BirdLookup";

export const NavBottom = (props: any) => {
  const styles = StyleSheet.create({
    navBar: {
      flexDirection: "row",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: 5,

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
    },
  });
  return (
    <>
      <View style={styles.navBar}>

        <BirdLookup setBirds={props.setBirds}></BirdLookup>
        

        
        <PostcodeLookup setBirds={props.setBirds} postcode={props.postcode} setPostcode={props.setPostcode}></PostcodeLookup>

        <Text style={styles.navItem}>Submit Sighting</Text>
      </View>
    </>
  );
};
