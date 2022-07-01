import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export const NavBar = (props: any) => {
  const styles = StyleSheet.create({
    navBar: {
      flex: 0.125,
      flexDirection: "row",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: 2.5,

      height: 2.5,
      justifyContent: "center",
    },
    navItem: {
      paddingLeft: 20,
      paddingRight: 20,
    },
  });

  function userProfileNav() {
    props.navigation.navigate('UserProfile');
  }

  function mapNav(){

    props.navigation.navigate('Map', {postcode: props.postcode})
  }

  return (
    <View style={styles.navBar} >
      <Text style={styles.navItem}>Home</Text>
      <TouchableOpacity style={styles.navItem} onPress={mapNav}><Text>Map</Text></TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={userProfileNav}><Text>Account</Text></TouchableOpacity>
    </View>
  );
};
