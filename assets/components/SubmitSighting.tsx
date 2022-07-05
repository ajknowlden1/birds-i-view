import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import { useState, useEffect } from "react"
import { auth } from "./firebase/config";
import { db } from "./firebase/config"
import { addDoc, collection } from "firebase/firestore"
import Autocomplete from "react-native-autocomplete-input"
import { getBirdsByLocation } from "../api/ebird";


export default function SubmitSighting(){
    const [user, setUser] = useState<any | null>({});
    const [nameCommon, setNameCommon] = useState('');
    const [numberOfBirds, setNumberOfBirds] = useState(1);
    const [nameSci, setNameSci] = useState('');
    const [location, setLocation] = useState('');
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const [query, setQuery] = useState('');
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


    const findBird = (query) => {
        if (query) {
          setFilteredBirds(
            birdsArray.filter((bird) => bird.comName.includes(query))
          );
        } else {
          setFilteredBirds([]);
        }
      };

    useEffect(() => {
        setUser(auth.currentUser);
        const dateToday = new Date(parseInt(Date.now()));
        setDate(`${dateToday.getDate()}/${dateToday.getMonth() + 1}/${dateToday.getFullYear()}`)
        setTime(`${dateToday.getHours()}:${dateToday.getMinutes()}`)
      }, []);

    function submitSighting(){
        const data = {
            uid: user.uid,
            speciesCode: bird.speciesCode,
            comName: nameCommon,
            sciName: nameSci,
            howMan: numberOfBirds,
            locNam: location,
            obsDt: Date,
            lat: lat,
            lng: lng,
            obsValid: true,
            obsReviewed: false,
            locationPrivate: true,
        }
        addDoc(collection(db, "sightings"), data)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }



    return(
    <View>
        <Text style={styles.title}>Submit Sighting</Text>

        <View style={styles.section}>
            <Text style={styles.inputName}>Bird Species</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Common Name" 
                onChangeText={setNameCommon}>
            </TextInput>
            <Text style={styles.input}>OR</Text>
            <TextInput style={styles.input} placeholder="Scientific Name"></TextInput>
        </View>

        <TextInput style={styles.input} placeholder="Number of birds"></TextInput>
        <TextInput style={styles.input} placeholder="Location"></TextInput>


        <Text style={styles.inputName}>Date & Time of sighting</Text>
        <View >
            <TextInput style={styles.input} placeholder={date} onChangeText={setDate}></TextInput>
            <TextInput style={styles.input} placeholder={time} onChangeText={setTime}></TextInput>
        </View>

        <TouchableOpacity onPress={submitSighting} style={styles.submitBtn}><Text>Submit</Text></TouchableOpacity>
        <View style={styles.autocompleteContainer}>
            <Autocomplete 
            data={filteredBirds}
            value={nameCommon}
            onChangeText={(text) => {findBird(text); setNameCommon(text)}}
            placeholder="Common Name"
            flatListProps={{
                // keyExtractor: (_, idx) => idx,
                renderItem: ({ item }) => 
                <TouchableOpacity onPress={() => {setNameCommon(item.comName); setFilteredBirds([])}}>
                    <Text>{item.comName}</Text>
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
    section: {
        borderColor: "black",
        borderBottomWidth: 1,
        borderTopWidth: 1,
        margin: 20,
    },
    input: {
      textAlign: "center",
      fontSize: 18,
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
        top: 350,
        zIndex: 1,
        position: 'absolute',
        margin: 20
      },
    datePickerStyle: {
      width: 200,
      marginTop: 20,
      alignSelf: "center",
    },
  });