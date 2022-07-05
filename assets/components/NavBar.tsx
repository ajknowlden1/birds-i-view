import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export const NavBar = (props: any) => {

  function userProfileNav() {
    props.navigation.navigate("UserProfile");
  }

  function mapNav() {
    props.navigation.navigate("Map", { setBirds: props.setBirds, postcode: props.postcode, setPostcode: props.setPostcode });
  }

  function homeNav() {
    props.navigation.navigate("Homefeed");
  }

  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={homeNav}>
        <Text style={styles.navItem}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={mapNav}>
        <Text style={styles.navItem}>Map</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={userProfileNav}>
        <Text style={styles.navItem}>Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flex: 0.125,
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 2.5,
    justifyContent: "center",
    
  },
  navItem: {
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 20,
  },
});