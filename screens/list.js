import React, { useContext, useState, useEffect } from "react";
import {
  SafeAreaView,
  Keyboard,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  useWindowDimensions,
  StatusBar,
} from "react-native";
import {
  Avatar,
  Button,
  Divider,
  Header,
  ListItem,
  Input,
  Icon,
} from "react-native-elements";
import Video, { TextTrackType } from "react-native-video";

import mainStyles, { colors } from "../resources/styles";

export default ({ navigation }) => {
  navigateToVideo = (video) => {
    console.log(video);
    navigation.navigate("Video", {
      video: video,
      subs: video.subs,
    });
  };

  return (
    <View style={mainStyles.container}>
      <Header
        barStyle="light-content"
        //placement="left"
        leftComponent={{
          //icon: "settings",
          //type: "material",
          color: colors.secondary,
        }}
        centerComponent={{ text: "Demo", style: mainStyles.headerTitle }}
        //rightComponent={{ icon: "home", color: "#fff" }}
        containerStyle={mainStyles.headerContainer}
      />
      {videoList.map((item, i) => (
        <ListItem
          onPress={() => navigateToVideo(item)}
          underlayColor={"transparent"}
          containerStyle={styles.listItemContainer}
        >
          <Avatar
            rounded
            source={{
              uri: item.thumb,
            }}
          />
          <ListItem.Content>
            <ListItem.Title style={styles.title}>{item.title}</ListItem.Title>
            <ListItem.Title style={styles.subtitle}>
              {item.subtitle}
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    backgroundColor: colors.complementary + "20",
    borderRadius: 10,
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "300",
    color: colors.cgpGrey[100],
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "300",
    color: colors.cgpGrey[400],
  },
});

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
