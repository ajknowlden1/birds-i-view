import { StyleSheet, View, Text, TextInput, Button, ScrollView} from "react-native";
import {useEffect, useState } from "react";
import {getGBSpeciesCodes, getAllBirds} from "../api/ebird";

export default function SpeciesLookup(){
   
    const [loading, setLoading] = useState(true);
    const [codes, setCodes] = useState([]);
    const [response, setResponse] = useState();
    let speciesCodes = ['hello'];
    const britishBirds = [];
    const [stringBirds, setStringBirds] = useState('');

    useEffect(() => {
        getGBSpeciesCodes()
        .then((res: any) => {
            setCodes(res.data)
        })
        .then(() => {
            getAllBirds()
            .then((res : any) => {
                let data = res.data;
                setResponse(data);
                setLoading(false)
                for(let i = 0; i < 16753; i++){
                    if(codes.includes(data[i].speciesCode)){
                        britishBirds.push(
                            {speciesCode: data[i].speciesCode,
                            commonName: data[i].comName})
                    }
                }
                setStringBirds(JSON.stringify(britishBirds))
            })
        })
    }, [])
    
    if(!loading){
        return (
            <ScrollView>
                <Text
                    selectable={true}>{stringBirds}</Text>
            </ScrollView>
        )
    } else {
        return (
            <View>
                <Text>
                    Loading
                </Text>
            </View>
        )
    }

}
