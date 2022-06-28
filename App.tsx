import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Login, Homefeed, Register} from "./assets/components/";

const Stack = createStackNavigator();

export default function App(){ 
  interface userShape { username: string; }
  const [user, setUser] = useState<userShape | null>(null);


  return (
    <NavigationContainer>
      <Stack.Navigator>
       { user ? (
          <Stack.Screen name="Homefeed" component={Homefeed} />
        ) : (
          <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Homefeed" component={Homefeed} />
          </>
        )}

      </Stack.Navigator>
    </NavigationContainer>
  );
}11

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});