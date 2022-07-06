import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from './firebase/config'
import React, {useState} from "react"
import ResetPassModal from "./ResetPassModal";
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions} from "react-native"
import { useTheme } from '@react-navigation/native';

export default function Login({navigation}: {navigation: any}) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const { colors } = useTheme();

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
    
    function resetModal(){
        setShowModal(!showModal)
    }

    function register(){
        navigation.navigate('Register')
    }
    
    return (
        <View style={styles.container}>
            { showModal ? <ResetPassModal /> : null }
            <Image source={require('../logos/biv-logo.jpeg')} style={styles.logo}></Image>
            <Text style={styles.text}>Login</Text>
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
                secureTextEntry={true}
                style={styles.textPlace} 
                placeholder='password'
                placeholderTextColor="lightgray"
                onChangeText={setPassword}
                value={password}
                />
            <TouchableOpacity style={styles.button} onPress={submit}><Text style={{color: colors.text}}>Login</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={resetModal}><Text style={{color: colors.text}}>Reset Password</Text></TouchableOpacity>
            <Text style={styles.text}>New to us?</Text>
            <TouchableOpacity style={styles.button} onPress={register}><Text style={{color: colors.text}}>Make an account here</Text></TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginTop: 20,
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