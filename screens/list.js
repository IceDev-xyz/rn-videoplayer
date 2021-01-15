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

import { AppContext } from "../resources/context";
import mainStyles, { colors } from "../resources/styles";

export default ({ navigation }) => {
  const { context, setContext } = useContext(AppContext);

  navigateToVideo = (video, videoIndex) => {
    navigation.navigate("Video", {
      videoIndex: videoIndex,
      video: video,
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
      <ScrollView>
        {context.map((item, index) => (
          <ListItem
            onPress={() => navigateToVideo(item, index)}
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
                {item?.progress}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    backgroundColor: colors.complementary + "50",
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 10,
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
