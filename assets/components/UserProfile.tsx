import { View, Text, StyleSheet,TouchableOpacity } from "react-native"

export default function UserAccount({navigation}: {navigation: any}){

    function userAccountNav() {
        navigation.navigate('UserAccount');
      }

    return (
        <View>
            <TouchableOpacity><Text style={styles.text} onPress={userAccountNav}>Account Details</Text></TouchableOpacity>
            <Text style={styles.text}>My Sightings</Text>
            <Text style={styles.text}>Wishlist of Birds</Text>
            <Text style={styles.text}>Badges</Text>
            <Text style={styles.text}>Log out</Text>
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