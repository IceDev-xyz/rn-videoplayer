import React, { useContext } from "react";
import {
  StyleSheet,
  Pressable,
  View,
  Text,
  useWindowDimensions,
} from "react-native";
import { Divider, Header, Slider, Icon } from "react-native-elements";
import Carousel from "react-native-snap-carousel";
import FastImage from "react-native-fast-image";

import { AppContext } from "../resources/context";
import mainStyles, { colors } from "../resources/styles";

export default ({ navigation }) => {
  const { context, setContext } = useContext(AppContext);
  const window = useWindowDimensions();

  navigateToVideo = (video, videoIndex) => {
    navigation.navigate("Video", {
      videoIndex: videoIndex,
      video: video,
    });
  };

  renderProgress = (e) => {
    let h = Math.floor(e / 3600)
      .toString()
      .padStart(2, "0");
    let m = Math.floor((e % 3600) / 60)
      .toString()
      .padStart(2, "0");
    let s = Math.floor(e % 60)
      .toString()
      .padStart(2, "0");
    return h + ":" + m + ":" + s;
  };

  renderSliderValue = (progress, duration) => {
    return progress / duration;
  };

  renderCarouselItem = ({ item, index }) => {
    return (
      <View
        style={{
          backgroundColor: colors.tertiary,
          borderRadius: 10,
          height: window.width + 100,
          overflow: "hidden",
        }}
      >
        <Pressable onPress={() => navigateToVideo(item, index)}>
          <FastImage source={{ uri: item.thumb }} style={styles.slide}>
            <View style={styles.slideTop}>
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
              </View>
              <View style={{ justifyContent: "center" }}>
                <Icon
                  name="play-circle-outline"
                  size={30}
                  color={colors.secondary}
                />
              </View>
            </View>
            <View style={styles.slideBottom}>
              {item?.progress > 0 && item?.completed != true ? (
                <View>
                  <Slider
                    disabled
                    style={{
                      marginHorizontal: 5,
                      height: 10,
                    }}
                    minimumTrackTintColor={colors.primary}
                    value={renderSliderValue(item.progress, item.duration)}
                    thumbStyle={{ width: 0, height: 0 }}
                  />
                  <Text style={styles.action}>Continue Watching</Text>
                  <Text style={styles.timestamp}>
                    at {renderProgress(item.progress)}
                  </Text>
                </View>
              ) : item?.completed == true ? (
                <Text style={styles.action}>You already watched this</Text>
              ) : (
                <Text style={styles.action}>Start Watching</Text>
              )}
            </View>
          </FastImage>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={mainStyles.container}>
      <Header
        barStyle="light-content"
        centerComponent={{
          text: "Video Player Demo",
          style: mainStyles.headerTitle,
        }}
        containerStyle={mainStyles.headerContainer}
      />
      <Divider style={{ height: 10, backgroundColor: "transparent" }} />
      <Carousel
        data={context}
        renderItem={(item, index) => renderCarouselItem(item, index)}
        sliderWidth={window.width}
        itemWidth={window.width - 100}
      />
      <View style={styles.demoDesc}>
        <Text style={styles.description}>{txt_demo}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
  },
  slideTop: {
    backgroundColor: colors.primary,
    padding: 10,
    flexDirection: "row",
  },
  slideBottom: {
    backgroundColor: colors.secondary,
    height: 80,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    color: colors.cgpGrey[100],
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "400",
    color: colors.cgpGrey[100],
  },
  demoDesc: {
    flex: 2,
  },
  description: {
    color: colors.cgpGrey[100],
    textAlign: "center",
  },
  action: {
    textAlign: "center",
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "400",
  },
  timestamp: {
    textAlign: "center",
    fontSize: 12,
    textTransform: "uppercase",
    fontWeight: "300",
  },
});

const txt_demo =
  "FOR DEMO PURPOSES \n Watch progress resets after killing the app.";
