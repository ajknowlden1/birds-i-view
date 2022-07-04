import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal } from "react-native"
import { useState } from "react"
import { auth } from "./firebase/config"
import { sendPasswordResetEmail } from 'firebase/auth';

export default function ResetPassModal(){
    const [email, setEmail] = useState('');
    const [modalVisible, setModalVisible] = useState(true);

    function resetPass(){
        sendPasswordResetEmail(auth, email).then(() => {
            alert("Password reset email sent")
            setModalVisible(false);
        })
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Please enter the email you signed up with</Text>
                    <TextInput
                    style={styles.modalText}
                    autoCapitalize='none'
                    placeholder='email'
                    onChangeText={setEmail}
                    value={email}
                    />
                    <TouchableOpacity onPress={resetPass}><Text>Submit</Text></TouchableOpacity>
                </View>
                </View>
        </Modal> 
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
    modalView: {
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 100,
        paddingVertical: 80,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})