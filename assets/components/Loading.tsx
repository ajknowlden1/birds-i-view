import {View, Text, StyleSheet, ActivityIndicator, Dimensions, Image} from "react-native";

export default function Loading(){
    return (
        <View>
            <Image source={require('../logos/biv-logo.jpeg')} style={styles.logo}></Image>
            <Text style={styles.text}>Loading</Text>
            <ActivityIndicator size="large" color="white"/>
        </View>
    )
}

const styles = StyleSheet.create({
    text:{
        textAlign: "center",
        fontSize: 30,
        color: "white"
    },
    logo:{
        marginTop: Dimensions.get('window').height/5,
        alignSelf: "center",
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').height * 0.2,
    }
})