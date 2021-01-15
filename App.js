import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  LogBox,
} from "react-native";

import { AppContext } from "./resources/context";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createStackNavigator();

import VideoScreen from "./screens/video";
import ListScreen from "./screens/list";

function FakeScreen() {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Under Development</Text>
    </SafeAreaView>
  );
}

const App = () => {
  const [context, setContext] = useState([]);

  useEffect(() => {
    setContext(videoList);
  }, []);

  return (
    <SafeAreaProvider>
      <AppContext.Provider value={{ context, setContext }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" headerMode="none">
            <Stack.Screen name="List" component={ListScreen} />
            <Stack.Screen name="Video" component={VideoScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppContext.Provider>
    </SafeAreaProvider>
  );
};

export default App;

const videoList = [
  {
    _id: "TBD",
    title: "Awesome Video",
    subtitle: "Works fine, subs in EN & ES",
    thumb:
      "https://upload.wikimedia.org/wikipedia/commons/3/35/Neckertal_20150527-6384.jpg",
    videoUrl: "https://arcticlab.xyz/demos/rn-videoplayer/switzerland.mp4",
    subs: [
      {
        title: "English CC",
        language: "en",

        uri: "https://arcticlab.xyz/demos/rn-videoplayer/en.vtt",
      },
      {
        title: "Español",
        language: "es",
        uri: "https://arcticlab.xyz/demos/rn-videoplayer/es.vtt",
      },
    ],
  },
  {
    _id: "TBD2",
    title: "Another nice video",
    subtitle: "Works fine, subs in only in ES",
    thumb:
      "https://upload.wikimedia.org/wikipedia/commons/3/35/Neckertal_20150527-6384.jpg",
    videoUrl: "https://arcticlab.xyz/demos/rn-videoplayer/switzerland.mp4",
    subs: [
      {
        title: "Español",
        language: "es",
        uri: "https://arcticlab.xyz/demos/rn-videoplayer/sintel_es.vtt",
      },
    ],
  },
  {
    _id: "TBD3",
    title: "Oh! Bad video",
    subtitle: "URL wrong, video won't load.",
    thumb:
      "https://upload.wikimedia.org/wikipedia/commons/3/35/Neckertal_20150527-6384.jpg",
    videoUrl: "https://arcticlab.xyz/demos/rn-videoplayer/_switzerland.mp4",
    subs: [],
  },
];
