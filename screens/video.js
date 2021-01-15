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
  Modal,
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
import SwipeableRating from "react-native-swipeable-rating";

import { AppContext } from "../resources/context";
import mainStyles, { colors } from "../resources/styles";

export default ({ navigation, route }) => {
  const { context, setContext } = useContext(AppContext);
  const { video, videoIndex } = route.params;
  const [fullScreen, setFullScreen] = useState(false);
  const [subtitles, setSubtitles] = useState(0);
  const [disabledSubtitles, setDisabledSubtitles] = useState([]);
  const [selectedSubtitle, setSelectedSubtitle] = useState("none");
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(5);
  //
  const [isNavigating, setIsNavigating] = useState(true);
  const window = useWindowDimensions();

  // The video library is making navigation between screens slower, this is just a hot fix.
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsNavigating(false);
      if (context[videoIndex]?.progress > 0) {
        this.player.seek(context[videoIndex]?.progress);
      }
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
      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="formSheet"
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView
          style={[
            mainStyles.container,
            { backgroundColor: colors.complementary },
          ]}
        >
          <Header
            barStyle="light-content"
            //placement="left"
            leftComponent={{
              icon: "arrow-downward",
              type: "material",
              color: colors.complementary,
              onPress: () => setModalVisible(false),
            }}
            centerComponent={{
              text: "Feedback",
              style: mainStyles.headerTitle,
            }}
            //rightComponent={{ icon: "home", color: "#fff" }}
            containerStyle={mainStyles.headerContainer}
          />
          <Text style={styles.txt_Feedback}>
            You opinion is very important for us, please rate the video and give
            us your comments, any feedback is appreciated.
          </Text>
          <View
            style={{
              width: window.width,
              height: 50,
              alignItems: "center",
            }}
          >
            <View style={{ width: 200, height: 50 }}>
              <SwipeableRating
                rating={rating}
                size={32}
                gap={10}
                minRating={0}
                onPress={(rating) => setRating(rating)}
                xOffset={window.width / 2 - 100}
              />
            </View>
          </View>
          <Input
            renderErrorMessage={false}
            inputStyle={styles.input}
            inputContainerStyle={styles.inputContainer}
            multiline
          />

          <Button
            title="Save"
            buttonStyle={styles.btn_Feedback}
            onPress={() => [
              alert("Rating not saved, demo purposes only"),
              navigation.goBack(),
            ]}
          />
        </SafeAreaView>
      </Modal>
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
          ref={(ref) => {
            this.player = ref;
          }}
          controls={true}
          poster={video.thumb}
          posterResizeMode={"cover"}
          //fullscreen={true}
          onLoadStart={(info) => console.log(info)}
          onLoad={(info) => console.log(info)}
          onBuffer={(buffer) => console.log(buffer)}
          onProgress={(info) =>
            setContext((prevState) => {
              prevState[videoIndex].duration = info.playableDuration;
              prevState[videoIndex].progress = info.currentTime;
              return [...prevState];
            })
          }
          onError={(error) => alert("We are unable to load this video.")}
          style={fullScreen ? styles.videoFs : styles.video}
          onFullscreenPlayerDidDismiss={() => console.log("FS closed")}
          playInBackground={false}
          onEnd={() => setModalVisible(true)}
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
        <View style={{ flex: 1 }}>
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
          <ScrollView style={{ marginHorizontal: 10 }}>
            <Text style={styles.title}>{video.title}</Text>
            <Text style={styles.subtitle}>{video.subtitle}</Text>
            <Divider style={{ height: 10, backgroundColor: "transparent" }} />
            <Text style={styles.description}>{fake_desc}</Text>
          </ScrollView>
        </View>
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
  title: {
    color: colors.cgpGrey[100],
    fontSize: 18,
  },
  subtitle: {
    color: colors.cgpGrey[100],
    fontSize: 14,
  },
  description: {
    color: colors.cgpGrey[300],
    textAlign: "justify",
  },
  //MODAL
  txt_Feedback: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 20,
    color: colors.cgpGrey[100],
  },
  btn_Feedback: {
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  input: {
    height: 150,
    fontSize: 14,
  },
  inputContainer: {
    backgroundColor: colors.secondary,
    borderBottomColor: "transparent",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
});

const fake_desc =
  "Nunc non magna ligula. In sed est et arcu faucibus elementum nec id odio. Vestibulum cursus lacinia condimentum. Vivamus ac risus vel neque volutpat eleifend. Proin ac sapien hendrerit, sagittis magna in, pretium nunc. Donec ac velit dapibus, aliquam dui vitae, tristique libero. Ut laoreet erat ac placerat pharetra. Aliquam erat volutpat.\n\nNam sed volutpat ante. Suspendisse potenti. Integer pulvinar vehicula vehicula. Aenean ultricies fringilla elit, consequat eleifend tellus congue aliquet. Maecenas non ante sit amet nisl efficitur sollicitudin. Vivamus quis mattis nunc. Morbi ut metus et turpis eleifend auctor in at ipsum. In aliquam diam et ex facilisis, at finibus erat ornare. Nunc sagittis, tellus in maximus dignissim, est lorem commodo nisi, sit amet feugiat ligula elit id velit. Aenean et laoreet ipsum, a fringilla arcu. Vestibulum ut viverra tortor, nec egestas eros. Cras elementum commodo elit, sit amet hendrerit elit eleifend et. Nullam at libero ac ex cursus ultrices.";
