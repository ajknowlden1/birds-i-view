import { useState, useEffect } from "react";
import {View, StyleSheet, Text, Dimensions} from "react-native" 
import MapView, {PROVIDER_GOOGLE, Heatmap} from 'react-native-maps';
import { getBirdsByLocation } from "../api/ebird";
import { getLocationByPostCode } from "../api/postcodeConverter";
import * as Location from "expo-location";

export default function Map({route}){
    const [points, setPoints] = useState<IPoints[]|[]>([]);
    const {postcode} = route.params

    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [positioned, setPositioned] = useState(false);
    
    // Location.requestForegroundPermissionsAsync();
    //let position = Location.getCurrentPositionAsync;

    interface IPoints {
        latitude: number;
        longitude: number;
        weight: number
    }

    const arr=[];

    useEffect(() => {
        getLocationByPostCode(postcode)
            .then((res) => {
                setLat(Math.trunc(res.data.data.latitude));
                setLng(Math.trunc(res.data.data.longitude));
                setPositioned(true)
                getBirdsByLocation(lat, lng)
                .then((res: any) => {
                    res.data.forEach((bird) => {
                        const {lat, lng, howMany} = bird
                        arr.push({latitude: lat, longitude: lng, weight: howMany})
                    })
                    setPoints(arr)
                })
            })
            .catch((err) => {
            })
    }, [lat, lng, positioned]);

    if(positioned){
        return (
            <View
            style={styles.container}
            >
                <Text style={styles.text}>Sightings Nearby</Text>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude:lat,
                        longitude:lng,
                        latitudeDelta: 0.5,
                        longitudeDelta: 0.5,
                    }}
                    showsUserLocation={true}
                    provider={PROVIDER_GOOGLE}
                    >
                <Heatmap
                    points={points}
                    opacity={4}
                    radius={100}
                    gradient={
                        {colors: ['red', 'blue'],
                         startPoints: [0.1, 0.7],
                         colorMapSize: 128}}

                    />

                </MapView>
            </View>
        )
    } else {
        return null
    } 
}

const styles = StyleSheet.create({
    map:{
        width: Dimensions.get('window').width - 35,
        height: Dimensions.get('window').height - 200,
    },
    container:{
        marginTop: 15,
        alignItems: 'center'},
    text:{
        padding: 15,
        fontSize: 20,
        margin: 5,
        textAlign: "center"},
    button:{
        backgroundColor: '#9cbedb',
        borderRadius: 15,
        marginTop: 5,
        padding: 10,
        fontSize: 35,
        }})