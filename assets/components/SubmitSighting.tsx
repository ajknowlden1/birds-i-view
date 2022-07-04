import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import { useState, useEffect } from "react"
import { auth } from "./firebase/config";
import { db } from "./firebase/config"
import { addDoc, collection } from "firebase/firestore"

export default function SubmitSighting(){
    const [user, setUser] = useState<any | null>({});
    const [name, setName] = useState('');

    useEffect(() => {
        setUser(auth.currentUser);
      }, []);

    function submitSighting(){
        addDoc(collection(db, "sightings"), {name: name, uid: user.uid})
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
        <View>
            <TextInput 
                style={styles.input} 
                placeholder="Common Name" 
                onChangeText={setName}>
            </TextInput>
            <TextInput style={styles.input} placeholder="Scientific Name"></TextInput>
        </View>
        <TextInput style={styles.input} placeholder="Location"></TextInput>
        <TextInput style={styles.input} placeholder="Date of sighting"></TextInput>
        <TextInput style={styles.input} placeholder="Time of sighting"></TextInput>
        <TouchableOpacity onPress={submitSighting}><Text>Submit</Text></TouchableOpacity>
    </View>
    )
}


const styles = StyleSheet.create({
    title: {
      textAlign: "center",
      fontSize: 25,
    },
    text: {
      fontSize: 18,
      textAlign: "left",
      marginLeft: 15,
      margin: 10,
    },
    textInfo: {
      flex: 1,
      fontSize: 17,
      marginLeft: 30,
      textAlign: "left",
    },
    updateBtn: {
      backgroundColor: "#9cbedb",
      width: 70,
      borderRadius: 15,
      margin: 5,
      marginRight: 30,
      padding: 5,
      alignItems: "center",
      alignSelf: "flex-end",
    },
  });