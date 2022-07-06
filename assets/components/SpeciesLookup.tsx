import { StyleSheet, View, Text, TextInput, Alert, TouchableOpacity} from "react-native";
import {useEffect, useState } from "react";
import { getBirdBySpeciesCode } from "../api/ebird";
import {britBirds} from "../../britBirds";

export default function SpeciesLookup(props:any){
    const [speciesCode, setSpeciesCode] = useState('')
    const [sightings, setSightings] = useState([]);
    const [birdName, setBirdName] = useState('');
    const [birdPicked, setBirdPicked] = useState(false);
    const [bird, setBird] = useState({})

    const commonNames = Object.values(britBirds);
    const speciesCodes = Object.keys(britBirds);
    const navigation = props.navigation;


    function setChoice(){
        if(speciesCode != ''){
            setBirdPicked(true)
        } 
    }

    function mapNav() {
        props.navigation.navigate("Map", { sightings: sightings, navigation: props.navigation});
      }

    function speciesNav(){
        navigation.navigate('SpeciesPage', {
          birdInfo: bird,
          navigation: navigation
        })
      }

    useEffect(() => {
        getBirdBySpeciesCode(speciesCode)
        .then((res: any) => {
            setSightings(res.data)
            setChoice();
        })
      }, [speciesCode]);

    useEffect(() => {
        setBird(sightings[0])
    }, [sightings])

    function submit(){
        let index = commonNames.indexOf(birdName)
        if(index === -1){
            Alert.alert('Please insert a valid bird name.')
        } 
        setSpeciesCode(speciesCodes[index])
    }

    if(!birdPicked){
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Submit Bird Name {"\n"}</Text>
                <TextInput
                    style={styles.text}
                    placeholder='Enter Bird Name'
                    onChangeText={setBirdName}
                    placeholderTextColor="lightgray"
                    value={birdName}
                />
                <TouchableOpacity style={styles.button} onPress={submit}><Text style={{color: "white"}}>Find Bird</Text></TouchableOpacity>
                
            </View>
        )
    } 
    else {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Viewing information for {birdName}:</Text>
                <TouchableOpacity style={styles.button} onPress={speciesNav}><Text style={{color: "white"}}>View Bird Profile</Text></TouchableOpacity>
                <Text style={styles.text}>Recent sightings nationwide: {sightings.length}</Text>
                <TouchableOpacity style={styles.button} onPress={mapNav}><Text style={{color: "white"}}>View on Map</Text></TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        marginTop: 50,
        alignItems: 'center'},
    text:{
        padding: 15,
        fontSize: 25,
        margin: 5,
        textAlign: "center",
        color: "white",
    },
    textError:{
        color: 'red',
        padding: 15,
        fontSize: 25,
        margin: 5,
        textAlign: "center"},
    button:{
        backgroundColor: '#1c264d',
        borderRadius: 10,
        marginTop: 5,
        padding: 10,
        fontSize: 35,
        elevation: 20,
        shadowColor: "black",
        }})