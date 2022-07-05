import { StyleSheet, Text } from "react-native";
import { auth } from "./assets/components/firebase/config";
import React, { useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Login,
  Homefeed,
  Register,
  UserAccount,
  UserProfile,
  Map,
  SubmitSighting,
} from "./assets/components/";
import { SpeciesPage } from "./assets/components/SpeciesPage";

const Stack = createStackNavigator();

export default function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  auth.onAuthStateChanged((user) => {
    setUser(user);
    setLoading(false);
  });

  if (loading) {
    return <Text>Hello</Text>;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
              <>
                <Stack.Screen name="Homefeed" component={Homefeed} />
                <Stack.Screen name="UserProfile" component={UserProfile} />
                <Stack.Screen name="UserAccount" component={UserAccount} /> 
                <Stack.Screen name="SubmitSighting" component={SubmitSighting} />
                <Stack.Screen name="Map" component={Map} />
                <Stack.Screen name="SpeciesPage" component={SpeciesPage} />
              </>
            ) : (
              <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
