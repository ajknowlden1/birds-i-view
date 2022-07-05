import { Image, Dimensions } from "react-native";
import { auth } from "./assets/components/firebase/config";
import React, { useState } from "react";

import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Login,
  Homefeed,
  Register,
  UserAccount,
  UserProfile,
  Map,
  SubmitSighting,
  UserSightings,
  SpeciesLookup
} from "./assets/components/";
import { SpeciesPage } from "./assets/components/SpeciesPage";

const Stack = createStackNavigator();

const navTheme = DefaultTheme;
navTheme.colors.background = "#0E67B4";
navTheme.colors.text = "white";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  auth.onAuthStateChanged((user) => {
    setUser(user);
    setLoading(false);
  });

  if (loading) {
    return <Image source={require('./assets/logos/biv-logo.jpeg')} style={{width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').height * 0.2}}></Image>;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#0E67B4"}}>
        <NavigationContainer theme={navTheme}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
              <>
                <Stack.Screen name="Homefeed" component={Homefeed} initialParams={[]} />
                <Stack.Screen name="UserProfile" component={UserProfile} />
                <Stack.Screen name="UserAccount" component={UserAccount} /> 
                <Stack.Screen name="SubmitSighting" component={SubmitSighting} />
                <Stack.Screen name="Map" component={Map} />
                <Stack.Screen name="SpeciesLookup" component={SpeciesLookup} />
                <Stack.Screen name="SpeciesPage" component={SpeciesPage} />
                <Stack.Screen name="UserSightings" component={UserSightings} />
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
