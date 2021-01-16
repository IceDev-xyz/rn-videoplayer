# rn-videoplayer
For demo purposes only. 

**The player should support**

- [x]  **Show a thumbnail image while the video is loading**  
Using FastImage for cache and quick display of thumbnails, using cover prop by the library.


- [x]  **Ability to go to full screen mode when users move the device to landscape on both platforms**  
Fullscreen capabilities from the library react-native-video are a bit buggy, decided to showcase a proof of concept of a manual Fullscreen on rotation.


- [x]  **Ability to play/pause/etc**  
Using props by the library.


- [x]  **Ability to send events back when things such as video start, stop and end occur.**  
The best way to showcase: Play a video, while playing go back, the list will now display the timestamp and allow users to resume watching it.


- [x]  **Show a rating control when video ends allowing users to rate the video (doesn’t need to be a pretty UI)**  
Star rating + input for comments added, also example of triggering events when the video is over.


- [x]  **Bonus: Ability to show subtitles over the video**  
Change subtitles on the fly. None, English, Spanish.


**Brief:** The goal is to build a video player in react native that can work well on both iOS and Android. The player can be based on the package React Native Video (https://github.com/react-native-video/react-native-video).
