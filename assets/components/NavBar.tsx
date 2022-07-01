import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export const NavBar = ({navigation}: {navigation: any}) => {
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

  function userProfileNav() {
    navigation.navigate('UserProfile');
  }

  return (
    <View style={styles.navBar} >
      <Text style={styles.navItem}>Home</Text>
      <Text style={styles.navItem}>Map</Text>
      <TouchableOpacity onPress={userProfileNav}><Text style={styles.navItem}>Account</Text></TouchableOpacity>
    </View>
  );
};
