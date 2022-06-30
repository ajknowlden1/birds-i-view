
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Login, Homefeed, Register, UserAccount, UserProfile} from "./assets/components/"

const Stack = createStackNavigator();

export default function App(){ 

  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Homefeed" component={Homefeed} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="UserAccount" component={UserAccount} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}11

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
