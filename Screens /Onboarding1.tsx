import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import responsive from "../component /responsiveui";

const upcomingMovies = [
  { uri: 'https://image.tmdb.org/t/p/w500/2RSirqZG949GuRwN38MYCIGG4Od.jpg' },
  { uri: 'https://image.tmdb.org/t/p/w500/9OYu6oDLIidSOocW3JTGtd2Oyqy.jpg' },
  { uri: 'https://image.tmdb.org/t/p/w500/nrSaXF39nDfAAeLKksRCyvSzI2a.jpg' },
  { uri: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg' },
  { uri: 'https://image.tmdb.org/t/p/w500/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg' },
  { uri: 'https://image.tmdb.org/t/p/w500/6KErczPBROQty7QoIsaa6wJYXZi.jpg' },
  { uri: 'https://image.tmdb.org/t/p/w500/aJn9XeesqsrSLKcHfHP4u5985hn.jpg' },
];

const images = [
  { uri: 'https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg' },
  { uri: 'https://image.tmdb.org/t/p/w500/6agKYU5IQFpuDyUYPu39w7UCRrJ.jpg' },
  { uri: 'https://image.tmdb.org/t/p/w500/tnAuB8q5vv7Ax9UAEje5Xi4BXik.jpg' },
  { uri: 'https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg' },
  { uri: 'https://image.tmdb.org/t/p/w500/4ZocdxnOO6q2UbdKye2wgofLFhB.jpg' },
  { uri: 'https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg' },
  { uri: 'https://image.tmdb.org/t/p/w500/6agKYU5IQFpuDyUYPu39w7UCRrJ.jpg' },
  { uri: 'https://image.tmdb.org/t/p/w500/tnAuB8q5vv7Ax9UAEje5Xi4BXik.jpg' },
  { uri: 'https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg' },
  { uri: 'https://image.tmdb.org/t/p/w500/4ZocdxnOO6q2UbdKye2wgofLFhB.jpg' },
  { uri: 'https://image.tmdb.org/t/p/w500/aQvJ5WPzZgYVDrxLX4R6cLJCEaQ.jpg' },
  { uri: 'https://image.tmdb.org/t/p/w500/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg' },
  { uri: 'https://image.tmdb.org/t/p/w500/zGGWYpiKNwjpKxelPxOMqJnUgDs.jpg' },
];

export default function Onboarding1({ navigation }) {
  return (
    <LinearGradient
      style={styles.linearGradient}
      colors={['#1F1F1F', '#121011']}
    >
      <View>
        <Pressable onPress={() => navigation.navigate('homescreen')}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>

        <ScrollView
          style={styles.scrollView}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {images.map((item, index) => (
            <Image key={index} source={item} style={styles.image} />
          ))}
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {upcomingMovies.map((item, index) => (
            <Image key={index} source={item} style={styles.image} />
          ))}
        </ScrollView>

        <View style={styles.bottomContainer}>
          <Text style={styles.txt}>Tell us about your</Text>
          <Text style={styles.txt}>favourite movies genre</Text>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('onboarding2')}
          >
            <Text style={styles.btnText}>Next</Text>
          </TouchableOpacity>
          <View
            style={{
              alignItems: 'center',
              marginTop: responsive.marginTop(25),
              justifyContent: 'center',
                 flexDirection: 'row',
                 gap: responsive.gap(10),
            }}
          >
            <Pressable
              style={{
                height: responsive.height(10),
             
                backgroundColor: 'red',
                width: responsive.width(50),
              }}
            />
            <Pressable
              style={{
                height: responsive.height(10),
                backgroundColor: 'red',
                width: responsive.width(50),
              }}
            />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    
  },
  scrollView: {
    marginTop: responsive.margin(20),
  },
  skipText: {
    fontSize: responsive.fontSize(16),
    textAlign: 'right',
    marginRight: responsive.margin(30),
    marginTop: responsive.margin(30),
    color: '#D4D4D4',
  },
  image: {
    height: responsive.height(182),
    width: responsive.width(133),
    margin: responsive.margin(4),
    borderRadius: responsive.borderRadius(10),
  },
  txt: {
    color: 'white',
    fontSize: responsive.fontSize(20),
    textAlign: 'center',
  },
  bottomContainer: {
    alignContent: 'center',
    marginTop: responsive.margin(80),
  },
  btn: {
    marginTop: responsive.margin(40),
    backgroundColor: '#EB2F3D',
    padding: responsive.padding(12),
    borderRadius: responsive.borderRadius(10),
    marginHorizontal: responsive.margin(20),
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: responsive.fontSize(20),
  },
});
