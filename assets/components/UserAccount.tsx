import { auth } from "./firebase/config";
import { updateEmail, updateProfile } from "firebase/auth";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import LoginModal from "./LoginModal";

export default function UserAccount() {
  const [user, setUser] = useState<any | null>({});
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedUsername, setUpdatedUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [createdAt, setCreatedAt] = useState("");
  const [modalVisible, setModalVisibile] = useState(false);

  useEffect(() => {
    setUser(auth.currentUser);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user.metadata) {
      const date = new Date(parseInt(user.metadata.createdAt));
      setCreatedAt(
        `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
      );
    }
  }, [user]);

  function updateUserEmail() {
    updateEmail(user, updatedEmail)
      .then(() => {
        Alert.alert("Email updated");
        setUpdatedEmail("");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          Alert.alert("Invalid email");
        } else if (error.code === "auth/email-already-in-use") {
          Alert.alert("Email already in use");
        } else if (error.code === "auth/requires-recent-login") {
          setModalVisibile(true);
        } else {
          alert(error);
        }
      });
  }

  function updateUserUsername() {
    updateProfile(user, {
      displayName: updatedUsername,
    })
      .then(() => {
        Alert.alert("Username updated");
        setUpdatedUsername("");
      })
      .catch((error) => {
        alert(error);
      });
  }

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      {modalVisible ? <LoginModal user={user} /> : null}
      <Text style={styles.title}>Account Details</Text>
      <Text style={styles.text}>Username:</Text>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={styles.textInfo}
          placeholder={user.displayName}
          onChangeText={setUpdatedUsername}
          value={updatedUsername}
        ></TextInput>
        <TouchableOpacity style={styles.updateBtn} onPress={updateUserUsername}>
          <Text>Update</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>Registered email:</Text>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={styles.textInfo}
          placeholder={user.email}
          onChangeText={setUpdatedEmail}
          value={updatedEmail}
        ></TextInput>
        <TouchableOpacity style={styles.updateBtn} onPress={updateUserEmail}>
          <Text>Update</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>Member Since {createdAt}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 25,
    textDecorationLine: "underline",
  },
  text: {
    fontSize: 18,
    textAlign: "left",
    marginLeft: 15,
    margin: 10,
  },
  textInfo: {
    flex: 1,
    fontSize: 17,
    marginLeft: 30,
    textAlign: "left",
  },
  updateBtn: {
    backgroundColor: "#9cbedb",
    width: 70,
    borderRadius: 15,
    margin: 5,
    marginRight: 30,
    padding: 5,
    alignItems: "center",
    alignSelf: "flex-end",
  },
});
