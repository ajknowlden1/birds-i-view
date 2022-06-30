import { auth } from './firebase/config'
import { updateEmail, updateProfile  } from 'firebase/auth';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import { useState, useEffect } from "react"
import dayjs from "dayjs"

export default function UserAccount(){
    interface userConfig {
        createdAt: any,
        displayName: string,
        email: string,
        phoneNumber?: number,
        photoURL?: string,
    }

    const [user, setUser] = useState<any | null>({});
    const [update, setUpdate] = useState(false);
    const [updatedEmail, setUpdatedEmail] = useState('');
    const [updatedUsername, setUpdatedUsername] = useState('');
    const [loading, setLoading] = useState(true);
    const [createdAt , setCreatedAt] = useState('');


    useEffect(() =>{
        setUser(auth.currentUser)
        setLoading(false)
    }, [])

    useEffect(() =>{
    if (user.metadata){
        const date = new Date(parseInt(user.metadata.createdAt))
        setCreatedAt(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`)
    }}, [user])

    function updateUserEmail(){
        updateEmail(auth.currentUser, updatedEmail).then(() => {
            alert("Email updated")
            setUpdatedEmail("")
        })
    }

    function updateUserUsername(){
        updateProfile(auth.currentUser, {
            displayName: updatedUsername
        }).then(() => {
            alert("Username updated")
            setUpdatedUsername("")
        })
    }

    if (loading){
        return <Text>Loading...</Text>
    }

    return (
        <View>
            <Text style={styles.title}>Account Details</Text>
            <Text style={styles.text}>Username:</Text>
            <View style={{flexDirection: "row"}}>
                <TextInput 
                    style={styles.textInfo} 
                    placeholder={user.displayName}
                    onChangeText={setUpdatedUsername}
                    value={updatedUsername} 
                   >
                </TextInput>
                <TouchableOpacity 
                    style={styles.updateBtn} 
                    onPress={updateUserUsername}>
                <Text>Update</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.text}>Registered email:</Text>
            <View style={{flexDirection: "row"}}>
                <TextInput 
                    style={styles.textInfo} 
                    placeholder={user.email}  
                    onChangeText={setUpdatedEmail}
                    value={updatedEmail}
                ></TextInput>
                <TouchableOpacity 
                    style={styles.updateBtn} 
                    onPress={updateUserEmail}>
                <Text>Update</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.text}>Member Since {createdAt}</Text>
        </View>
    ) 
}

const styles = StyleSheet.create({
    title:{
        textAlign: 'center',
        fontSize: 25,
        textDecorationLine: 'underline',
    },
    text:{
        fontSize: 18,
        textAlign: 'left',
        marginLeft: 15,
        margin: 10,
    },
    textInfo:{
        flex: 1,
        fontSize: 17,
        marginLeft: 30,
        textAlign: "left"
    },
    updateBtn:{
        backgroundColor: '#9cbedb',
        width: 70,
        borderRadius: 15,
        margin: 5,
        marginRight: 30,
        padding: 5,
        alignItems: "center",
        alignSelf: "flex-end"
    }
})