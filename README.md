# rn-videoplayer
For demo purposes only. The goal is to build a video player in react native that can work well on both iOS and Android. The player can be based on the package React Native Video (https://github.com/react-native-video/react-native-video).

**The player should support**

- [x]  **Show a thumbnail image while the video is loading**  
Currently is loading images from the same server as the videos, so sometimes the image is loaded and 1 second later the video is ready to play.  
A good CDN (imgix.net) and a proper cache installed in the RN project (FastImage) will render the thumbnails faster. 


- [x]  **Ability to go to full screen mode when users move the device to landscape on both platforms**  
Fullscreen capabilities from the library react-native-video are a bit buggy, decided to showcase a proof of concept of a manual Fullscreen on rotation.


- [x]  **Ability to play/pause/etc**  
Using props by the library.


- [x]  **Ability to send events back when things such as video start, stop and end occur.**  
The best to showcase, play a video, while playing go back, the list will display the time and allow users to resume watching it.


- [x]  **Show a rating control when video ends allowing users to rate the video (doesn’t need to be a pretty UI)**  
Star rating + input for comments added, also example of triggering events when the video is over.


- [x]  **Bonus: Ability to show subtitles over the video**  
Change subtitles on the fly. None, English, Spanish.
