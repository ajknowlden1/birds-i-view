import { useState, useEffect } from "react";
import {View, StyleSheet, Text, Dimensions} from "react-native" 
import MapView, {PROVIDER_GOOGLE, Heatmap} from 'react-native-maps';
import { getBirdsByLocation } from "../api/ebird";
import * as Location from "expo-location";

export default function Map(){
    

    // function getPosition(){
    //     Location.requestForegroundPermissionsAsync();
    //     let position = Location.getCurrentPositionAsync;
    //     return position
    // }

    // useEffect(() => {
    //     getPosition()
    //     .then((res:any) => {
    //         console.debug(res)
    //     })
    // })

    let points = 
        [{latitude:53.6908, longitude:-1.8191, weight:10},
         {latitude:53.6968, longitude:-1.8191, weight:10},
         {latitude:53.6968, longitude:-1.8191, weight:10},
         {latitude:53.6968, longitude:-1.5491, weight:10},
         {latitude:53.8008, longitude:-1.5491, weight:10},
         {latitude:53.8008, longitude:-1.5491, weight:10},
         {latitude:53.8008, longitude:-1.8107593, weight:10},
         {latitude:53.8008, longitude:-1.3698524, weight:10},
         {latitude:53.8008, longitude:-1.8855123, weight:10},
         {latitude:53.8008, longitude:-1.5491, weight:10}]
    return (
            <View
            style={styles.container}
            >
                <Text style={styles.text}>Sightings Nearby</Text>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude:53.8008,
                        longitude:-1.5491,
                        latitudeDelta: 0.75,
                        longitudeDelta: 0.75,
                    }}
                    showsUserLocation={true}
                    provider={PROVIDER_GOOGLE}
                    >
                <Heatmap
                    points={points}
                    opacity={3}
                    radius={45}
                    />

                </MapView>
            </View>
    )
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