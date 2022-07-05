import { StyleSheet, View, Text, TextInput, Button, ScrollView, TouchableOpacity} from "react-native";
import {useEffect, useState } from "react";
import {getBirdBySpeciesCode} from "../api/ebird";
import {britBirds} from "../../britBirds";

export default function SpeciesLookup(props:any){

    const [speciesCode, setSpeciesCode] = useState('brant')
    const [sightings, setSightings] = useState([]);
    const [birdName, setBirdName] = useState('');
    const [birdPicked, setBirdPicked] = useState(false);

    const commonNames = Object.values(britBirds);
    const speciesCodes = Object.keys(britBirds);

   


    useEffect(() => {
        getBirdBySpeciesCode(speciesCode)
        .then((res: any) => {
            console.log(res.data)
            setSightings(res.data)
            setBirdPicked(true)
        });
      }, [birdPicked]);

    function submit(){
        let index = commonNames.indexOf(birdName)
        setSpeciesCode(speciesCodes[index])
        
    }

    if(!birdPicked){
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Submit Bird Name</Text>
                <TextInput
                    style={styles.text}
                    placeholder='Enter Bird Name'
                    onChangeText={setBirdName}
                    value={birdName}
                />
                <TouchableOpacity style={styles.button} onPress={submit}><Text>Find Bird</Text></TouchableOpacity>
                
            </View>
        )
    } else {
        return (
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
    button:{
        backgroundColor: '#9cbedb',
        borderRadius: 15,
        marginTop: 5,
        padding: 10,
        fontSize: 35,
        }})