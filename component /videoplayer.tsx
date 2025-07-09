import { StyleSheet, Text, View,Image, Pressable , Button} from "react-native"
import responsive from "./responsiveui";
import Video from 'react-native-video';
import YoutubePlayer from "react-native-youtube-iframe";
import YouTube from 'react-native-youtube';
const Video = ()=>{
    

  
    return (
      <View style={styles.container}>
        <View> <Image
          style={styles.img}
          source={{
            uri: 'https://cdn.marvel.com/content/1x/ae_digital_packshot.jpg'
          }}
        />
        <Pressable><Text>Watch Trailer </Text></Pressable>
       <YoutubePlayer
        height={220}
        play={false}
        videoId={"TcMBFSGVi1c"} // e.g. "TcMBFSGVi1c"
      />
        </View>
      

      </View>
    );
}
export default Video;
const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  img: {
    height: responsive.height(279),
    width: '90%',
  },
});