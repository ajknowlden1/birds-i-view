import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useState } from "react";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

export default function LoginModal(props: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(true);

  function reauth() {
    const credential = EmailAuthProvider.credential(email, password);
    reauthenticateWithCredential(props.user, credential)
      .then(() => {
        setModalVisible(false);
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Please log in again</Text>
          <TextInput
            style={styles.modalText}
            autoCapitalize="none"
            placeholder="email"
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            style={styles.modalText}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="password"
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity onPress={reauth}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
