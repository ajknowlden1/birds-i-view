import {View, StyleSheet, Text} from "react-native" 

export default function Map(){
    return (
    <View
                style={StyleSheet.container}
            >
                <Text style={StyleSheet.text}>Hello</Text>
            </View>
    )
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