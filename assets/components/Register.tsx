import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from './firebase/config'
import React, {useState} from "react"
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Dimensions, Image} from "react-native"
import { useTheme } from '@react-navigation/native';

export default function Register({navigation}: {navigation: any}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const { colors } = useTheme();

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
        <View style={styles.container}>
            <Image source={require('../logos/biv-logo.jpeg')} style={styles.logo}></Image>
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
            <TouchableOpacity style={styles.button} onPress={register}><Text style={{ color: colors.text }}>Register</Text></TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginTop: 50,
        alignItems: 'center'
    },
    text:{
        padding: 15,
        fontSize: 25,
        margin: 5,
        textAlign: "center",
        color: "white",
    },
    button:{
        backgroundColor: '#5f7487',
        borderRadius: 15,
        marginTop: 5,
        padding: 10,
        fontSize: 35,
    },
    logo:{
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').height * 0.2,
    }
})