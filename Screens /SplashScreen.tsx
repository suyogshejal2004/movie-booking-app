import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const checkAndNavigate = async () => {
      // Set the splash flag
      await AsyncStorage.setItem("splashViewed", "true");

      setTimeout(() => {
        navigation.replace("onboarding1"); // or your next screen
      }, 3000);
    };

    checkAndNavigate();
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        style={styles.animation}
        source={require("../Src/movie.json")}
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
    backgroundColor: "#EB2F3D",
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    height: 150,
    width: 150,
  },
  versionText: {
    color: "#FFFFFF",
    position: "absolute",
    bottom: 50,
    fontSize: 14,
  },
});
