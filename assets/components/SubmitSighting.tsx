import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native"
import { useState, useEffect } from "react"
import { auth } from "./firebase/config";
import { db } from "./firebase/config"
import { addDoc, collection } from "firebase/firestore"
import Autocomplete from "react-native-autocomplete-input"
import * as Location from 'expo-location';
import { getAddressByLatLon } from "../api/maps";


export default function SubmitSighting({navigation}: {navigation: any}){
    const [user, setUser] = useState<any | null>({});
    const [nameCommon, setNameCommon] = useState('');
    const [numberOfBirds, setNumberOfBirds] = useState<number| string>(1);
    const [location, setLocation] = useState<any | null>(null);
    const [errorMsg, setErrorMsg] = useState<string| null>(null);
    const [lat, setLat] = useState<number| null>(null);
    const [lng, setLng] = useState<number| null>(null);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [filteredBirds, setFilteredBirds] = useState<any>([]);


    const birdsArray = [{
        speciesCode: "eurrob1",
        comName: "European Robin",
        sciName: "Erithacus rubecula",
        locId: "L2578311",
        locName: "Cromwell Bottom NR",
        obsDt: "2022-06-22 08:29",
        howMany: 2,
        lat: 53.6967238,
        lng: -1.8107593,
        obsValid: true,
        obsReviewed: false,
        locationPrivate: false,
        subId: "S113506184",
      },
      {
        speciesCode: "mallar3",
        comName: "Mallard",
        sciName: "Anas platyrhynchos",
        locId: "L2578311",
        locName: "Cromwell Bottom NR",
        obsDt: "2022-06-22 08:29",
        howMany: 7,
        lat: 53.6967238,
        lng: -1.8107593,
        obsValid: true,
        obsReviewed: false,
        locationPrivate: false,
        subId: "S113506184",
      },
      {
        speciesCode: "cowpig1",
        comName: "Common Wood-Pigeon",
        sciName: "Columba palumbus",
        locId: "L2578311",
        locName: "Cromwell Bottom NR",
        obsDt: "2022-06-22 08:29",
        howMany: 1,
        lat: 53.6967238,
        lng: -1.8107593,
        obsValid: true,
        obsReviewed: false,
        locationPrivate: false,
        subId: "S113506184",
      },
      {
        speciesCode: "eurmag1",
        comName: "Eurasian Magpie",
        sciName: "Pica pica",
        locId: "L2578311",
        locName: "Cromwell Bottom NR",
        obsDt: "2022-06-22 08:29",
        howMany: 1,
        lat: 53.6967238,
        lng: -1.8107593,
        obsValid: true,
        obsReviewed: false,
        locationPrivate: false,
        subId: "S113506184",
      },
      {
        speciesCode: "eurcoo",
        comName: "Eurasian Coot",
        sciName: "Fulica atra",
        locId: "L2578311",
        locName: "Cromwell Bottom NR",
        obsDt: "2022-06-22 08:29",
        howMany: 1,
        lat: 53.6967238,
        lng: -1.8107593,
        obsValid: true,
        obsReviewed: false,
        locationPrivate: false,
        subId: "S113506184",
      },
      {
        speciesCode: "winwre4",
        comName: "Eurasian Wren",
        sciName: "Troglodytes troglodytes",
        locId: "L2578311",
        locName: "Cromwell Bottom NR",
        obsDt: "2022-06-22 08:29",
        howMany: 1,
        lat: 53.6967238,
        lng: -1.8107593,
        obsValid: true,
        obsReviewed: false,
        locationPrivate: false,
        subId: "S113506184",
      },
      {
        speciesCode: "gretit1",
        comName: "Great Tit",
        sciName: "Parus major",
        locId: "L2578311",
        locName: "Cromwell Bottom NR",
        obsDt: "2022-06-22 08:29",
        howMany: 2,
        lat: 53.6967238,
        lng: -1.8107593,
        obsValid: true,
        obsReviewed: false,
        locationPrivate: false,
        subId: "S113506184",
      },
      {
        speciesCode: "eurbla",
        comName: "Eurasian Blackbird",
        sciName: "Turdus merula",
        locId: "L2578311",
        locName: "Cromwell Bottom NR",
        obsDt: "2022-06-22 08:29",
        howMany: 2,
        lat: 53.6967238,
        lng: -1.8107593,
        obsValid: true,
        obsReviewed: false,
        locationPrivate: false,
        subId: "S113506184",
      },
      {
        speciesCode: "lottit1",
        comName: "Long-tailed Tit",
        sciName: "Aegithalos caudatus",
        locId: "L2578311",
        locName: "Cromwell Bottom NR",
        obsDt: "2022-06-22 08:29",
        howMany: 2,
        lat: 53.6967238,
        lng: -1.8107593,
        obsValid: true,
        obsReviewed: false,
        locationPrivate: false,
        subId: "S113506184",
      },
      {
        speciesCode: "carcro1",
        comName: "Carrion Crow",
        sciName: "Corvus corone",
        locId: "L2578311",
        locName: "Cromwell Bottom NR",
        obsDt: "2022-06-22 08:29",
        howMany: 2,
        lat: 53.6967238,
        lng: -1.8107593,
        obsValid: true,
        obsReviewed: false,
        locationPrivate: false,
        subId: "S113506184",
      },
      {
        speciesCode: "sonthr1",
        comName: "Song Thrush",
        sciName: "Turdus philomelos",
        locId: "L12907860",
        locName: "Home",
        obsDt: "2022-06-22 06:00",
        howMany: 1,
        lat: 53.6069079,
        lng: -1.3698524,
        obsValid: true,
        obsReviewed: false,
        locationPrivate: true,
        subId: "S113505510",
      },
      {
        speciesCode: "blutit",
        comName: "Eurasian Blue Tit",
        sciName: "Cyanistes caeruleus",
        locId: "L12907860",
        locName: "Home",
        obsDt: "2022-06-22 06:00",
        howMany: 1,
        lat: 53.6069079,
        lng: -1.3698524,
        obsValid: true,
        obsReviewed: false,
        locationPrivate: true,
        subId: "S113505510",
      },
      {
        speciesCode: "eurgol",
        comName: "European Goldfinch",
        sciName: "Carduelis carduelis",
        locId: "L12907860",
        locName: "Home",
        obsDt: "2022-06-22 06:00",
        howMany: 1,
        lat: 53.6069079,
        lng: -1.3698524,
        obsValid: true,
        obsReviewed: false,
        locationPrivate: true,
        subId: "S113505510",
      },
      {
        speciesCode: "eurgre1",
        comName: "European Greenfinch",
        sciName: "Chloris chloris",
        locId: "L12907860",
        locName: "Home",
        obsDt: "2022-06-22 06:00",
        howMany: 2,
        lat: 53.6069079,
        lng: -1.3698524,
        obsValid: true,
        obsReviewed: false,
        locationPrivate: true,
        subId: "S113505510",
      },
      {
        speciesCode: "houspa",
        comName: "House Sparrow",
        sciName: "Passer domesticus",
        locId: "L12907860",
        locName: "Home",
        obsDt: "2022-06-22 06:00",
        howMany: 9,
        lat: 53.6069079,
        lng: -1.3698524,
        obsValid: true,
        obsReviewed: false,
        locationPrivate: true,
        subId: "S113505510",
      },
      {
        speciesCode: "wlwwar",
        comName: "Willow Warbler",
        sciName: "Phylloscopus trochilus",
        locId: "L8880299",
        locName: "Soil Hill",
        obsDt: "2022-06-22 05:48",
        howMany: 5,
        lat: 53.7789369,
        lng: -1.8855123,
        obsValid: true,
        obsReviewed: false,
        locationPrivate: false,
        subId: "S113505026",
      },
      {
        speciesCode: "commoo3",
        comName: "Eurasian Moorhen",
        sciName: "Gallinula chloropus",
        locId: "L8880299",
        locName: "Soil Hill",
        obsDt: "2022-06-22 05:48",
        howMany: 2,
        lat: 53.7789369,
        lng: -1.8855123,
        obsValid: true,
        obsReviewed: false,
        locationPrivate: false,
        subId: "S113505026",
      },
      {
        speciesCode: "rinphe",
        comName: "Ring-necked Pheasant",
        sciName: "Phasianus colchicus",
        locId: "L8880299",
        locName: "Soil Hill",
        obsDt: "2022-06-22 05:48",
        howMany: 4,
        lat: 53.7789369,
        lng: -1.8855123,
        obsValid: true,
        obsReviewed: false,
        locationPrivate: false,
        subId: "S113505026",
      },
      {
        speciesCode: "cangoo",
        comName: "Canada Goose",
        sciName: "Branta canadensis",
        locId: "L8880299",
        locName: "Soil Hill",
        obsDt: "2022-06-22 05:48",
        howMany: 13,
        lat: 53.7789369,
        lng: -1.8855123,
        obsValid: true,
        obsReviewed: false,
        locationPrivate: false,
        subId: "S113505026",
      },
      {
        speciesCode: "whiwag",
        comName: "White Wagtail",
        sciName: "Motacilla alba",
        locId: "L8880299",
        locName: "Soil Hill",
        obsDt: "2022-06-22 05:48",
        howMany: 2,
        lat: 53.7789369,
        lng: -1.8855123,
        obsValid: true,
        obsReviewed: false,
        locationPrivate: false,
        subId: "S113505026",
      },
      {
        speciesCode: "lbbgul",
        comName: "Lesser Black-backed Gull",
        sciName: "Larus fuscus",
        locId: "L8880299",
        locName: "Soil Hill",
        obsDt: "2022-06-22 05:48",
        howMany: 5,
        lat: 53.7789369,
        lng: -1.8855123,
        obsValid: true,
        obsReviewed: false,
        locationPrivate: false,
        subId: "S113505026",
      },
      {
        speciesCode: "eurcur",
        comName: "Eurasian Curlew",
        sciName: "Numenius arquata",
        locId: "L8880299",
        locName: "Soil Hill",
        obsDt: "2022-06-22 05:48",
        howMany: 1,
        lat: 53.7789369,
        lng: -1.8855123,
        obsValid: true,
        obsReviewed: false,
        locationPrivate: false,
        subId: "S113505026",
      },
      {
        speciesCode: "grewhi1",
        comName: "Greater Whitethroat",
        sciName: "Curruca communis",
        locId: "L8880299",
        locName: "Soil Hill",
        obsDt: "2022-06-22 05:48",
        howMany: 7,
        lat: 53.7789369,
        lng: -1.8855123,
        obsValid: true,
        obsReviewed: false,
        locationPrivate: false,
        subId: "S113505026",
      },
      {
        speciesCode: "eurjac",
        comName: "Eurasian Jackdaw",
        sciName: "Corvus monedula",
        locId: "L8880299",
        locName: "Soil Hill",
        obsDt: "2022-06-22 05:48",
        howMany: 5,
        lat: 53.7789369,
        lng: -1.8855123,
        obsValid: true,
        obsReviewed: false,
        locationPrivate: false,
        subId: "S113505026",
      },]

    const findBird = (query: any) => {
        if (query) {
          setFilteredBirds(
            birdsArray.filter((bird) => bird.comName.includes(query))
          );
        } else {
          setFilteredBirds([]);
        }
      };

    function addZero(i: number | string) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    useEffect(() => {
        setUser(auth.currentUser);
        const dateToday = new Date(Date.now());
        setDate(`${addZero(dateToday.getDate())}/${addZero(dateToday.getMonth() + 1)}/${addZero(dateToday.getFullYear())}`)
        setTime(`${addZero(dateToday.getHours())}:${addZero(dateToday.getMinutes())}`)
      }, []);

      useEffect(() => {
        Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest})
        .then((res) => {
          setLat(res.coords.latitude);
          setLng(res.coords.longitude);
          getAddressByLatLon(res.coords.latitude, res.coords.longitude)
          .then((address: any) => {setLocation(address.data.results[0].formatted_address)})
        })
      }, []);

      let locat = 'Getting location...';
      if (errorMsg) {
        locat = errorMsg;
      } else if (location) {
        locat = JSON.stringify(location);
      }

    function submitSighting(){
      if(nameCommon === ""){
        Alert.alert("Please enter a birdname for your sighting") 
      } else if (lat === null || lng === null){
        Alert.alert("Please wait for your location to be determined or enter your location") 
      } else if (/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/g.test(date) === false) {
        Alert.alert("Please enter a date in the format DD/MM/YYYY")
      } else if (/[0-9]{2}:[0-9]{2}/g.test(time) === false) {
        Alert.alert("Please enter a time in the format HH:MM")
      } else {
        const bird = birdsArray.filter((bird) => {return bird.comName === nameCommon})
        const data = {
            uid: user.uid,
            speciesCode: bird[0].speciesCode,
            comName: nameCommon,
            sciName: bird[0].sciName,
            howMan: numberOfBirds,
            locNam: location,
            obsDt: date,
            obsTm: time,
            lat: lat,
            lng: lng,
            obsValid: true,
            obsReviewed: false,
            locationPrivate: true,
        }
        addDoc(collection(db, "sightings"), data)
            .then((res) => {
                Alert.alert('Sighting added successfully!')
                navigation.navigate('Homefeed')
            })
            .catch((err) => {
                Alert.alert(err);
            })}
    }

    return(
    <View>
        <Text style={styles.title}>Submit Sighting</Text>
        <View style={styles.sectionTop}>
            <Text style={styles.inputName} >Bird Species {"\n\n\n"}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.inputName}>Number of birds</Text>
          <TextInput style={styles.input} placeholder={`${numberOfBirds}`} onChangeText={setNumberOfBirds} keyboardType="numeric"></TextInput>
        </View>
        <View style={styles.section}>
          <Text style={styles.inputName}>Location</Text>
          <TextInput style={styles.input} placeholder={locat}></TextInput>
        </View>
        <View style={styles.section}>
          <Text style={styles.inputName}>Date & Time of sighting</Text>
          <View style={{ flexDirection: "row" }}>
              <TextInput style={styles.inputFlex} placeholder={date} onEndEditing={() => setDate}></TextInput>
              <TextInput style={styles.inputFlex} placeholder={time} onEndEditing={() => setTime}></TextInput>
          </View>
        </View>
        <TouchableOpacity onPress={submitSighting} style={styles.submitBtn}><Text>Submit</Text></TouchableOpacity>
        <View style={styles.autocompleteContainer}>
            <Autocomplete 
            data={filteredBirds}
            value={nameCommon}
            onChangeText={(text) => {findBird(text); setNameCommon(text)}}
            placeholder="Common Name"
            flatListProps={{
                renderItem: ({ item }) => 
                <TouchableOpacity onPress={() => {setNameCommon(item.comName); setFilteredBirds([])}}>
                    <Text style={styles.dropdown}>{item.comName}</Text>
                </TouchableOpacity>
            }}
            />
        </View>
    </View>
    )
}


const styles = StyleSheet.create({
    title: {
      textAlign: "center",
      fontSize: 25,
    },
    sectionTop: {
      borderColor: "black",
      borderBottomWidth: 3,
      borderTopWidth: 3,
      margin: 20,
      padding: 5,
    },
    section: {
        borderColor: "black",
        borderBottomWidth: 3,
        marginTop: 0,
        margin: 20,
        padding: 5,
    },
    input: {
      textAlign: "center",
      fontSize: 18,
      padding: 10,
    },
    inputFlex: {
      fontSize: 18,
      flex: 1,
    },
    inputName:{
        textAlign: "left",
        marginLeft: 20,
        fontSize: 18,
    },
    submitBtn: {
      backgroundColor: "#9cbedb",
      width: 70,
      borderRadius: 15,
      padding: 5,
      alignItems: "center",
      alignSelf: "center",
    },
    autocompleteContainer: {
        flex: 1,
        left: 0,
        right: 0,
        top: 75,
        zIndex: 1,
        position: 'absolute',
        margin: 20,
        marginHorizontal: 50,
      },
      dropdown: {
        fontSize: 16,
        backgroundColor: "#9cbedb",
      }

  });