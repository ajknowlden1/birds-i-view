import { StyleSheet, Text, View, Image } from "react-native";
import { NavBar } from "./NavBar";
import { NavBottom } from "./NavBottom";
import { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { getBirdPicture } from "../api/wikipedia";
import { useTheme } from '@react-navigation/native';
import { getBirdBySpeciesCode } from "../api/ebird";


export default function Homefeed({route, navigation}, props: any) {
  const [postcode, setPostcode] = useState("");
  const { colors } = useTheme();

  const [birds, setBirds] = useState([])

  useEffect(() => {
    getBirdBySpeciesCode("eurspa1").then((res) => {
      setBirds(res.data)
    })
  }, [])

  const speciesPageNav = (bird: any) => {
    navigation.navigate("SpeciesPage", {
      birdInfo: bird,
      navigation: navigation,
    });
  };

  useEffect(() => {
    if(route.params.sightings){
      setBirds(route.params.sightings)
    }
  },[route.params])

  const styles = StyleSheet.create({
    title: {
      fontSize: 25,
      textAlign: "center",
      color: "white",
    },
    localFeed: {
      marginHorizontal: 20,
    },
    listItem: {
      flex: 1,
      flexDirection: "row",
      margin: 3,
      borderWidth: 2,
      borderColor: "#1c264d",
      padding: 15,
      borderRadius: 10,
      shadowColor: "white",
      elevation: 1,
    },
    listItemText: {
      borderRadius: 10,
      color: colors.text,
      fontSize: 15,
      fontWeight: "bold",
    },
    logo: {
      marginTop: 35,
      width: 100,
      height: 100,
      alignSelf: "center",
    }
  });


  return (
    <>
      <NavBar
        postcode={postcode}
        setPostcode={setPostcode}
        navigation={navigation}
      ></NavBar>
      <Image source={require('../logos/biv-logo.jpeg')} style={styles.logo}></Image>
      <Text style={styles.title}>Sightings Summary</Text>
      <ScrollView style={styles.localFeed} nestedScrollEnabled={true}>
        <View>
          {birds.map((bird) => {
            return (
              <TouchableOpacity onPress={() => speciesPageNav(bird)}>
                <>
                  <View style={styles.listItem}>
                    <Text style={styles.listItemText}>
                      {bird.howMany
                        ? `${bird.howMany} ${bird.comName} at ${bird.locName}`
                        : `${bird.comName} at ${bird.locName}`}
                    </Text>
                  </View>
                </>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <NavBottom
        postcode={postcode}
        setPostcode={setPostcode}
        setBirds={setBirds}
        navigation={navigation}
      ></NavBottom>
    </>
  );
}



