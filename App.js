import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./screens/Home";
import SinglePost from "./screens/SinglePost";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: "#212121",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "600",
              fontSize: 24,
            },
          title: "codeJam",
          }}
        />
        <Stack.Screen
          name="SinglePost"
          component={SinglePost}
          options={{
            headerStyle: {
              backgroundColor: "#212121",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
          title="Post"
        />
      </Stack.Navigator>

      <StatusBar style="light" />
    </NavigationContainer>
  );
};

export default App;

