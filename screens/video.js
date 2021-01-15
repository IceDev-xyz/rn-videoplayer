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
  ButtonGroup,
  Button,
  Divider,
  Header,
  ListItem,
  Input,
  Icon,
} from "react-native-elements";
import Video, { TextTrackType } from "react-native-video";

import mainStyles, { colors } from "../resources/styles";

export default ({ navigation, route }) => {
  const { video } = route.params;
  const window = useWindowDimensions();
  const [fullScreen, setFullScreen] = useState(false);
  const [subtitles, setSubtitles] = useState(0);
  const [disabledSubtitles, setDisabledSubtitles] = useState([]);
  const [selectedSubtitle, setSelectedSubtitle] = useState("none");
  //
  const [isNavigating, setIsNavigating] = useState(true);

  // The video library is making navigation between screens slower, this is just a hot fix.
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // I'm not proud about this function, just wanted to show a bit of functionality.
  useEffect(() => {
    let disabled = [];
    let sub_en = video.subs.findIndex((element) => element.language == "en");
    if (sub_en == -1) {
      disabled.push(1);
    }
    let sub_es = video.subs.findIndex((element) => element.language == "es");
    if (sub_es == -1) {
      disabled.push(2);
    }
    setDisabledSubtitles(disabled);
  }, []);

  useEffect(() => {
    let isLandscape;
    if (window.width > window.height) {
      isLandscape = true;
    } else {
      isLandscape = false;
    }
    setFullScreen(isLandscape);
  }, [window.width]);

  useEffect(() => {
    let newSubtitle;
    switch (subtitles) {
      case 0:
        newSubtitle = "none";
        break;
      case 1:
        newSubtitle = "en";
        break;
      case 2:
        newSubtitle = "es";
        break;
    }
    setSelectedSubtitle(newSubtitle);
  }, [subtitles]);

  return (
    <View style={mainStyles.container}>
      <Header
        barStyle="light-content"
        //placement="left"
        leftComponent={{
          icon: "arrow-back",
          type: "material",
          color: colors.secondary,
          onPress: () => navigation.goBack(),
        }}
        centerComponent={{ text: video.title, style: mainStyles.headerTitle }}
        //rightComponent={{ icon: "home", color: "#fff" }}
        containerStyle={mainStyles.headerContainer}
      />
      {isNavigating ? (
        <View style={styles.video} />
      ) : (
        <Video
          source={{
            uri: video.videoUrl,
          }}
          // ref={(ref) => {
          //   this.player = ref;
          // }}
          controls={true}
          poster={video.thumb}
          //fullscreen={true}
          onLoadStart={(info) => console.log(info)}
          onLoad={(info) => console.log(info)}
          onBuffer={(buffer) => console.log(buffer)}
          onEnd={(info) => console.log(info)}
          onError={(error) => alert("We are unable to load this video.")}
          style={fullScreen ? styles.videoFs : styles.video}
          onFullscreenPlayerDidDismiss={() => console.log("FS closed")}
          playInBackground={false}
          onEnd={(info) => console.log(info)}
          ///
          resizeMode={"cover"}
          textTracks={video.subs}
          selectedTextTrack={{
            type: "language",
            value: selectedSubtitle,
          }}
        />
      )}
      {!fullScreen && (
        <ButtonGroup
          onPress={(index) => setSubtitles(index)}
          disabled={disabledSubtitles}
          selectedIndex={subtitles}
          buttons={["No Subtitles", "English", "Español"]}
          containerStyle={mainStyles.btnGroupContainer}
          innerBorderStyle={mainStyles.btnGroupBorder}
          textStyle={mainStyles.btnGroupText}
          buttonStyle={mainStyles.btnGroupButton}
          selectedButtonStyle={mainStyles.btnGroupSelected}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: 200,
  },
  videoFs: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

const image = { uri: "https://reactjs.org/logo-og.png" };
