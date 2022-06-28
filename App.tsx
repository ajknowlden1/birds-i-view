import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "./assets/components/Login";
import Homefeed from "./assets/components/Homefeed";

const Stack = createStackNavigator();

export default function App(){ 
  interface userShape { username: string; }
  const [user, setUser] = useState<userShape | null>(null);

  // useEffect(() => {
  //   setUser({ username: "test" });
  // }, []);


  return (
    <NavigationContainer>
      <Stack.Navigator>
       { user ? (
          <Stack.Screen name="Homefeed" component={Homefeed} />
        ) : ( 
          <Stack.Screen name="Login" component={Login} />
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