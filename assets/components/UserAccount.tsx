import { auth } from './firebase/config'
import { View, Text, StyleSheet } from "react-native"
import { useState, useEffect } from "react"

export default function UserAccount(){
    interface userConfig {
        createdAt: any,
        displayName: string,
        email: string,
        phoneNumber?: number,
        photoURL?: string,
    }

    const [user, setUser] = useState<userConfig[] | []>([]);

    useEffect(() =>{
        setUser(auth.currentUser)
    }, [])

    return (
        <View>
            <Text style={styles.title}>Account Details</Text>
            <Text style={styles.text}>Username:</Text>
            <Text style={styles.textInfo}>{user.displayName}</Text>
            <Text style={styles.text}>Registered email:</Text>
            <Text style={styles.textInfo}> {user.email}</Text>
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
        margin: 10,
    },
    textInfo:{
        fontSize: 20,
        marginLeft: 30,
        textAlign: "left"
    }
})