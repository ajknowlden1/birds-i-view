
import {useState, useEffect} from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { PostcodeLookup } from "./PostcodeLookup";
import { SpeciesLookup } from "./SpeciesLookup"
export const NavBottom = (props: any) => {

  function submitSightingNav() {
    props.navigation.navigate('SubmitSighting');
  }

  function speciesLookupNav(){
    props.navigation.navigate('SpeciesLookup', {navigation: props.navigation})
  }
  
  return (
    <>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={speciesLookupNav} setBirds={props.setBirds} style={styles.navItem}><Text style={styles.navBtnText}>Species Lookup</Text></TouchableOpacity>
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