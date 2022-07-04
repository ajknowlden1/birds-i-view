import { auth } from './firebase/config'
import { signOut } from "firebase/auth"
import { View, Text, StyleSheet,TouchableOpacity } from "react-native"

export default function UserAccount({navigation}: {navigation: any}){

    function userAccountNav() {
        navigation.navigate('UserAccount');
      }
    
    function logOut(){
        signOut(auth).then(() => {
            navigation.navigate('Login')
        }).catch((error) => {
            alert(error)
        })
    }

    return (
        <View>
            <TouchableOpacity><Text style={styles.text} onPress={userAccountNav}>Account Details</Text></TouchableOpacity>
            <Text style={styles.text}>My Sightings</Text>
            <Text style={styles.text}>Wishlist of Birds</Text>
            <Text style={styles.text}>Badges</Text>
            <TouchableOpacity><Text style={styles.text} onPress={logOut}>Log out</Text></TouchableOpacity>
        </View>
    ) 
}

const styles = StyleSheet.create({
    text:{
        fontSize: 20,
        margin: 5,
        textAlign: "center"
    }
})