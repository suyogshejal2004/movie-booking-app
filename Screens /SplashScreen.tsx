import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('onboarding1'); // Navigate after 3 sec
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        style={styles.animation}
        source={require('../Src/movie.json')}
        autoPlay
        loop
      />
      <Text style={styles.versionText}>Version 1.0.1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EB2F3D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    height: 150,
    width: 150,
  },
  versionText: {
    color: '#FFFFFF',
    position: 'absolute',
    bottom: 50,
    fontSize: 14,
  },
});
