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
    const [loading, setLoading] = useState(true);

    interface IPoints {
        latitude: number;
        longitude: number;
        weight: number
    }

    const arr=[];

    useEffect(() => {
        getLocationByPostCode(postcode)
            .then((res) => {
                setLat(res.data.data.latitude);
                setLng(res.data.data.longitude);
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
                    loadingEnabled
                    style={styles.map}
                    initialRegion={{
                        latitude:parseFloat(lat),
                        longitude:parseFloat(lng),
                        latitudeDelta: 0.3,
                        longitudeDelta: 0.3,
                    }}
                    provider={PROVIDER_GOOGLE}
                    >
                <Heatmap
                    points={points}
                    opacity={1}
                    radius={50}
                    gradient={
                        {colors: ['red', 'blue'],
                         startPoints: [0.1, 0.7],
                         colorMapSize: 128}}

                    />

                </MapView>
            </View>
        )
    } else {
        return (
            <View>
                <Text style={styles.text}>Please Enter A Valid Postcode</Text>
            </View>
        )
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