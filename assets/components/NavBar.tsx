import { StyleSheet, Text, View } from "react-native";

export const NavBar = () => {
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
  return (
    <View style={styles.navBar}>
      <Text style={styles.navItem}>Home</Text>
      <Text style={styles.navItem}>Map</Text>
      <Text style={styles.navItem}>Account</Text>
    </View>
  );
};
