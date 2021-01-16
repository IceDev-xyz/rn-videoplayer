import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";

import { AppContext } from "./resources/context";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createStackNavigator();

import VideoScreen from "./screens/video";
import ListScreen from "./screens/list";

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

const demoURL = "https://arcticlab.xyz/demos/rn-videoplayer/";

const videoList = [
  {
    _id: "TBD",
    title: "Switzerland",
    subtitle: "Works fine, subs in EN & ES",
    thumb: `${demoURL}thumb-switzerland.jpg`,
    videoUrl: `${demoURL}switzerland.mp4`,
    subs: [
      {
        title: "English CC",
        language: "en",

        uri: `${demoURL}en.vtt`,
      },
      {
        title: "Español",
        language: "es",
        uri: `${demoURL}es.vtt`,
      },
    ],
  },
  {
    _id: "TBD2",
    title: "Seattle",
    subtitle: "Works fine, subs in only in ES",
    thumb: `${demoURL}thumb-seattle.webp`,
    videoUrl: `${demoURL}seattle.mp4`,
    subs: [
      {
        title: "Español",
        language: "es",
        uri: `${demoURL}es.vtt`,
      },
    ],
  },
  {
    _id: "TBD3",
    title: "Vancouver",
    subtitle: "4K, should take a bit to load.",
    thumb: `${demoURL}thumb_vancouver.jpg`,
    videoUrl: `${demoURL}vancouver.mp4`,
    subs: [],
  },
  {
    _id: "TBD4",
    title: "Oh! Bad video",
    subtitle: "URL wrong, video won't load.",
    thumb: `${demoURL}thumb_not_found.jpg`,
    videoUrl: `${demoURL}not_found.mp4`,
    subs: [],
  },
];
