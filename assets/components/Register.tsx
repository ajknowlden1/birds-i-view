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
                style={styles.textPlace} 
                placeholder='email'
                placeholderTextColor="lightgray"
                onChangeText={setEmail}
                value={email}
                />
             <TextInput
                autoCapitalize='none'
                style={styles.textPlace} 
                placeholder='username'
                placeholderTextColor="lightgray"
                onChangeText={setUsername}
                value={username}
                />    
            <TextInput
                autoCapitalize='none'
                secureTextEntry={true}
                style={styles.textPlace} 
                placeholder='password'
                placeholderTextColor="lightgray"
                onChangeText={setPassword}
                value={password}
                />
            <TextInput
                autoCapitalize='none'
                secureTextEntry={true}
                style={styles.textPlace} 
                placeholder='confirm password'
                placeholderTextColor="lightgray"
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
    textPlace:{
        padding: 15,
        fontSize: 25,
        width: Dimensions.get('window').width * 0.75,
        margin: 5,
        textAlign: "center",
        color: "white",
        borderColor: "white",
        borderWidth: 2,
        borderRadius: 10,
    },
    button:{
        backgroundColor: '#1c264d',
        borderRadius: 10,
        marginTop: 5,
        padding: 10,
        fontSize: 35,
        elevation: 20,
        shadowColor: "black",
    },
    logo:{
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').height * 0.2,
    }
})