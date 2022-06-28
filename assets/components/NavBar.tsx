import { StyleSheet, Text, View } from "react-native";

export const NavBar = () => {
  const styles = StyleSheet.create({
    navBar: {
      flexDirection: "row",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "5px",
      width: "40%",
      height: "2.5%",
      justifyContent: "center",
    },
    navItem: {
      paddingLeft: "20px",
      paddingRight: "20px",
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
