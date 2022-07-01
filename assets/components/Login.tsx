import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from './firebase/config'
import React, {useState} from "react"
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions, ScrollView, FlatList, Alert} from "react-native"

export default function Login({navigation}: {navigation: any}) {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function submit(){
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setLoggedIn(true)
            })
            .catch((error) => {
                alert(error)
                setLoggedIn(false)
            })
    }

    function register(){
        navigation.navigate('Register')
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Login</Text>
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
            <TouchableOpacity style={styles.button} onPress={register}><Text>Make an Account?</Text></TouchableOpacity>
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
        margin: 5,
        textAlign: "center"},
    button:{
        backgroundColor: '#9cbedb',
        borderRadius: 15,
        marginTop: 5,
        padding: 10,
        fontSize: 35,
        }})