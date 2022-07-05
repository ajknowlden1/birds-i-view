import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useTheme } from '@react-navigation/native';

export const NavBar = (props: any) => {
  const { colors } = useTheme();
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
      color: colors.text
    },
  });


  function userProfileNav() {
    props.navigation.navigate("UserProfile");
  }

  function mapNav() {
    props.navigation.navigate("Map", { postcode: props.postcode });
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

