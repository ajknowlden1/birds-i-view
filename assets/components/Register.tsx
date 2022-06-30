import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from './firebase/config'
import React, {useState} from "react"
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from "react-native"

export default function Register({navigation}: {navigation: any}){
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [username, setUsername] = React.useState('');

    function register(){
        if (password !== confirmPassword){
            alert("Passwords don't match")
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                updateProfile(userCredential.user, {
                    displayName: username
                  }).then(() =>{
                    Alert.alert("Account created! Enjoy the birds!")
                  })            
            })
            .catch((error) => {
                alert(error)
            })
    }
    
    return (
        <View
            style={styles.container}
        >
            <Text style={styles.text}>Register</Text>

            <TextInput
                autoCapitalize='none'
                style={styles.text} placeholder='email'
                onChangeText={setEmail}
                value={email}
                />
             <TextInput
                autoCapitalize='none'
                style={styles.text} placeholder='Username'
                onChangeText={setUsername}
                value={username}
                />    
            <TextInput
                autoCapitalize='none'
                secureTextEntry={true}
                style={styles.text} placeholder='password'
                onChangeText={setPassword}
                value={password}
                />
            <TextInput
                autoCapitalize='none'
                secureTextEntry={true}
                style={styles.text} placeholder='confirm password'
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                />
            <TouchableOpacity style={styles.button} onPress={register}><Text>Register</Text></TouchableOpacity>
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