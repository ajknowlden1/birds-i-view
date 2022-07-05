import {View, Text, StyleSheet } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore"
import { auth } from "./firebase/config";
import { db } from "./firebase/config"
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from '@react-navigation/native';
import Loading from "./Loading";

export default function UserSighting(){
    const [currentUID, setCurrentUID] = useState("");
    const [userSightings, setUserSightings] = useState([]);
    const [loading, setLoading] = useState(true);
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        title: {
            textAlign: "center",
            fontSize: 25,
            textDecorationLine: "underline",
            color: colors.text,
        },
        sighting: {
            marginHorizontal: 20,
            marginVertical: 10,
            borderWidth: 3,
            borderColor: colors.text,
        },
        bird: {
            fontSize: 20,
            textAlign: "center",
            margin: 5,
            color: colors.text,
        },
        location: {
            fontSize: 15,
            textAlign: "center",
            marginBottom: 5,
            color: colors.text,
        },
        date: {
            fontSize: 15,
            textAlign: "center",
            flex: 1,
            marginBottom: 5,
            color: colors.text,
        },
      });

    useEffect(() => {
        setCurrentUID(auth.currentUser.uid);
    }, []);

    useEffect(() => {
        setLoading(true)
        const q = query(collection(db, "sightings"), where("uid", "==", currentUID))
        const sightings: Array = []
        getDocs(q).then(res => res.forEach(doc => {sightings.push(doc.data())}))
        .then(() => {
            setUserSightings(sightings)
            setLoading(false)})
    }, [currentUID])    

    if (loading) {
        return (
            <Loading />
        )
    }

    return(
        <View>
            <Text style={styles.title}>Your sightings</Text>
            <ScrollView>
            { userSightings.length > 0 ? 
            userSightings.map((sighting) => {
                return (
                <View style={styles.sighting}>
                    <Text style={styles.bird}>{sighting.howMan} {sighting.comName}</Text>
                    <Text style={styles.location}>{sighting.locNam}</Text>
                    <View style={{ flexDirection: "row" }}>
                    <Text style={styles.date}>Date: {sighting.obsDt}</Text>
                    <Text style={styles.date}>Time: {sighting.obsTm}</Text>
                    </View>
                </View>
                )
            }) : <Text style={styles.bird}>You have no sightings yet!</Text>}
            </ScrollView>
        </View>
    )
}
