import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { PostcodeLookup } from "./PostcodeLookup";
import { useTheme } from '@react-navigation/native';

export const NavBottom = (props: any) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    navBar: {
      flexDirection: "row",
      marginLeft: "auto",
      marginRight: "auto",
      height: "auto",
      justifyContent: "center",
      alignContent: "center",
      borderColor: "#1c264d",
      borderTopWidth: 4,
    },
    navItem: {
      paddingLeft: 20,
      paddingRight: 20,
      flex: 1,
      fontSize: 20,
      textAlign: "center",
      justifyContent: "center",
    },
    navBtnText: {
      fontSize: 20,
      textAlign: "center",
      color: colors.text,
      borderRadius: 10,
      padding: 5,
      backgroundColor: "#1c264d",
      elevation: 20,
      shadowColor: "black",
    }
  });

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

