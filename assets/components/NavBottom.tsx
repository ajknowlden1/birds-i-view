import { StyleSheet, Text, View, TouchableOpacity} from "react-native";
import { PostcodeLookup } from "./PostcodeLookup";

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

  function speciesLookupNav(){
    props.navigation.navigate('SpeciesLookup')
  }

  return (
    <>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={speciesLookupNav} style={styles.navItem}><Text style={styles.navBtnText}>Species Lookup</Text></TouchableOpacity>
        <PostcodeLookup setBirds={props.setBirds} postcode={props.postcode} setPostcode={props.setPostcode}></PostcodeLookup>
        <Text style={styles.navItem}>Submit Sighting</Text>
      </View>
    </>
  );
};

// const styles = StyleSheet.create({
//   navBar: {
//     flexDirection: "row",
//     marginLeft: "auto",
//     marginRight: "auto",
//     height: "auto",
//     justifyContent: "center",
//     alignContent: "center",
//     borderColor: "black",
//     borderWidth: 2,
//   },
//   navItem: {
//     paddingLeft: 20,
//     paddingRight: 20,
//     flex: 1,
//     fontSize: 20,
//     textAlign: "center",
//   },
//   navBtnText: {
//     fontSize: 20,
//     textAlign: "center",
//   }
// });