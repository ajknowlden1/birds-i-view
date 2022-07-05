import { auth } from './firebase/config'
import { signOut } from "firebase/auth"
import { View, Text, StyleSheet,TouchableOpacity } from "react-native"
import { useTheme } from '@react-navigation/native';

export default function UserAccount({navigation}: {navigation: any}){
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        text:{
            fontSize: 20,
            margin: 5,
            textAlign: "center",
            color: colors.text
        }
    })

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

    function userSightingsNav() {
        navigation.navigate('UserSightings');
      }

    return (
        <View>
            <TouchableOpacity onPress={userAccountNav}><Text style={styles.text}>Account Details</Text></TouchableOpacity>
            <TouchableOpacity onPress={userSightingsNav}><Text style={styles.text}>My Sightings</Text></TouchableOpacity>
            <Text style={styles.text}>Wishlist of Birds</Text>
            <Text style={styles.text}>Badges</Text>
            <TouchableOpacity onPress={logOut}><Text style={styles.text}>Log out</Text></TouchableOpacity>
        </View>
    ) 
}

