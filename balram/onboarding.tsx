import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// --- Screen 1: Welcome Banner ---
const OnboardingScreen1 = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1659959103870-c4beea371a9b?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} // Sample URI
          style={styles.bannerImage}
        />
        <Text style={styles.title}>Private, Powerful Communication.</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Onboarding2')}>
        <Text style={styles.buttonText}>Get Started →</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// --- Screen 2: Privacy Illustration ---
const OnboardingScreen2 = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1659959103870-c4beea371a9b?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} // Sample URI
          style={styles.illustration}
        />
        <Text style={styles.title}>Privacy at the Core.</Text>
        <Text style={styles.subtitle}>Convenience in Every Tap.</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Onboarding3')}>
        <Text style={styles.buttonText}>Get Started →</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// --- Screen 3: Promises ---
const OnboardingScreen3 = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.mainTitle}>Simple. Secure. All-in-One Communication.</Text>
        <View style={styles.promiseSection}>
          <Text style={styles.promiseTitle}>Our promise:</Text>
          <Text style={styles.promiseText}>
            Your calls, messages, and contacts always stay on your device. We never store your information online or share it with third parties.
          </Text>
        </View>
        <View style={styles.promiseSection}>
          <Text style={styles.promiseTitle}>Your control:</Text>
          <Text style={styles.promiseText}>
            You decide what information to share—Connecto will never access your data without your permission.
          </Text>
        </View>
        <View style={styles.promiseSection}>
          <Text style={styles.promiseTitle}>A better experience:</Text>
          <Text style={styles.promiseText}>
            We use only what’s needed to make your communication simple, secure, and seamless.
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Onboarding4')}>
        <Text style={styles.buttonText}>Get Started →</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};


// --- Screen 4: Terms & Conditions ---
const OnboardingScreen4 = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{ uri: 'https://i.postimg.cc/P5gLg9j6/profile-icon.png' }} // Sample URI
          style={styles.profileIcon}
        />
        <Text style={styles.title}>Welcome to Connecto!</Text>
        <Text style={styles.description}>
          Your privacy and control matter most to us. Before you get started, please take a moment to review and accept our Terms & Conditions and Privacy Policy.
        </Text>
        <Text style={styles.termsText}>
          By tapping “Proceed,” you confirm that you have read, understood, and agree to our Terms & Conditions and Privacy Policy, ensuring a safe and private experience with Connecto.
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('Home')} // Use replace to prevent going back
      >
        <Text style={styles.buttonText}>Proceed →</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// --- Final Home Screen ---
const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to the App!</Text>
      <Text style={styles.subtitle}>Onboarding Complete.</Text>
    </SafeAreaView>
  );
};

// --- Navigator Setup ---
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding1"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Onboarding1" component={OnboardingScreen1} />
        <Stack.Screen name="Onboarding2" component={OnboardingScreen2} />
        <Stack.Screen name="Onboarding3" component={OnboardingScreen3} />
        <Stack.Screen name="Onboarding4" component={OnboardingScreen4} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  // General
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#576DEB',
    paddingVertical: 15,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  // Screen 1
  bannerImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  // Screen 2
  illustration: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 40,
  },
   // Screen 3
   mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
  },
  promiseSection: {
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  promiseTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#576DEB',
    marginBottom: 5,
  },
  promiseText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  // Screen 4
  profileIcon: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 30,
    opacity: 0.6,
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  termsText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default App;