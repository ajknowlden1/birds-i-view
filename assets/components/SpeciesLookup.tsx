import { StyleSheet, View, Text, TextInput, Button, ScrollView, TouchableOpacity} from "react-native";
import {useEffect, useState } from "react";
import {getBirdBySpeciesCode} from "../api/ebird";
import {britBirds} from "../../britBirds";
import SpeciesPage from "./SpeciesPage"
export default function SpeciesLookup(props:any){

    const [speciesCode, setSpeciesCode] = useState('')
    const [sightings, setSightings] = useState([]);
    const [birdName, setBirdName] = useState('');
    const [birdPicked, setBirdPicked] = useState(false);
    const [birdError, setBirdError] = useState('');
    const [bird, setBird] = useState({})

    const commonNames = Object.values(britBirds);
    const speciesCodes = Object.keys(britBirds);
    const navigation = props.navigation;
    
    function returnBirdError(){
        return birdError
    }

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
            setBird(sightings[0])
            setChoice();
        });
      }, [speciesCode, setBirdPicked]);

    function submit(){
        let index = commonNames.indexOf(birdName)
        if(index === -1){
            setBirdError('Please insert a valid bird name.')
        }
        setSpeciesCode(speciesCodes[index])
    }

    if(!birdPicked){
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Submit Bird Name</Text>
                <Text style={styles.textError}>{birdError}</Text>
                <TextInput
                    style={styles.text}
                    placeholder='Enter Bird Name'
                    onChangeText={setBirdName}
                    value={birdName}
                />
                <TouchableOpacity style={styles.button} onPress={submit}><Text>Find Bird</Text></TouchableOpacity>
                
            </View>
        )
    } 
    else {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Viewing information for {birdName}:</Text>
                <TouchableOpacity style={styles.button} onPress={speciesNav}><Text styles={styles.text}>View Bird Profile</Text></TouchableOpacity>
                <Text style={styles.text}>Recent sightings nationwide: {sightings.length}</Text>
                <TouchableOpacity style={styles.button} onPress={mapNav}><Text styles={styles.text}>View on Map</Text></TouchableOpacity>
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
        textAlign: "center"},
    textError:{
        color: 'red',
        padding: 15,
        fontSize: 25,
        margin: 5,
        textAlign: "center"},
    button:{
        backgroundColor: '#9cbedb',
        borderRadius: 15,
        marginTop: 5,
        padding: 10,
        fontSize: 35,
        }})