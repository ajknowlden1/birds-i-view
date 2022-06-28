import { reload, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React from "react"
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions, ScrollView, FlatList, Alert} from "react-native"

export default function Login() {

    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function submit(){
        const newUser = {username: username,
                         email: email,
                         password: password}

        console.debug(newUser)
    }

    return (
        <View
            style={styles.container}
        >
            <Text style={styles.text}>Login</Text>

            <TextInput
                autoCapitalize='none'
                style={styles.text} placeholder='username'
                onChangeText={setUsername}
                value={username}
                />
            <TextInput
                autoCapitalize='none'
                style={styles.text} placeholder='email'
                onChangeText={setEmail}
                value={email}
                />
            <TextInput
                autoCapitalize='none'
                secureTextEntry={true}
                style={styles.text} placeholder='password'
                onChangeText={setPassword}
                value={password}
                />
            <TouchableOpacity style={styles.button} onPress={submit}><Text>Submit</Text></TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginTop: 50,
        alignItems: 'center'},
    text:{
        padding: 15,
        fontSize: 25,
        margin: 5},
    button:{
        backgroundColor: '#9cbedb',
        borderRadius: 15,
        marginTop: 5,
        padding: 10,
        fontSize: 35,
        }})