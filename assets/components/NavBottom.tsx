import { StyleSheet, Text, View } from "react-native";

export const NavBottom = () => {
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
    <View style={styles.navBar}>
      <Text style={styles.navItem}>Lookup Bird</Text>
      <Text style={styles.navItem}>Lookup Postcode</Text>
      <Text style={styles.navItem}>Submit Sighting</Text>
    </View>
  );
};
