import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator, // Import ActivityIndicator for loading feedback
} from 'react-native';
import responsive from '../component /responsiveui';
import { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
// AsyncStorage is no longer needed for this component's logic
// import AsyncStorage from '@react-native-async-storage/async-storage'; 

// Import getAuth to find the currently logged-in user
import { getAuth } from '@react-native-firebase/auth';

export default function SignUpSuccessfully({ navigation }) { // route prop is removed as it's no longer needed
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false); // State to handle loading UI

  const handleNavigation = async () => {
    // Get the current user directly from the Firebase Auth service
    const user = getAuth().currentUser;

    // A robust check to ensure a user is actually signed in
    if (!user) {
      Alert.alert(
        'Authentication Error', 
        'No user session found. Please sign in again.'
      );
      // Fallback to send the user back to the sign-in screen
      navigation.replace('SigninSCreen'); 
      return;
    }

    // Validate that all fields are filled
    if (!name || !phone || !city) {
      Alert.alert('Missing Fields', 'Please fill all the details');
      return;
    }

    setLoading(true); // Start loading indicator

    try {
      // Use the authenticated user's unique ID (uid) to create their profile document
      await firestore().collection('users').doc(user.uid).set({
        name,
        phone,
        city,
        email: user.email, // It's good practice to also save the user's email
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      // Once the profile is saved, reset the navigation stack to the home screen.
      // This prevents the user from going back to the profile creation screen.
      navigation.reset({
        index: 0,
        routes: [{ name: 'homescreen' }],
      });
    } catch (error) {
      console.error('Firestore Error:', error);
      Alert.alert('Error', 'Could not save your data. Please try again.');
      setLoading(false); // Stop loading on error
    }
  };

  return (
    <KeyboardAvoidingView
      style={style.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={style.content}>
        <View style={style.container2}>
          <Text style={style.headingtxt}>Sign up Successfully!</Text>
          <Text style={style.heading2txt}>Tell us more about you</Text>
        </View>

        <View style={style.container3}>
          <TextInput
            placeholder="Your name"
            style={style.input}
            value={name}
            onChangeText={setName}
            placeholderTextColor="#575757"
            autoCapitalize="words"
          />
          <TextInput
            placeholder="Your phone number"
            style={style.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholderTextColor="#575757"
          />
          <TextInput
            placeholder="Current city"
            style={style.input}
            value={city}
            onChangeText={setCity}
            placeholderTextColor="#575757"
            autoCapitalize="words"
          />
        </View>
      </View>

      <View style={style.container4}>
        {/* Disable button while loading to prevent multiple presses */}
        <TouchableOpacity 
          onPress={handleNavigation} 
          style={style.button} 
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={style.btntxt}>Continue</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121011' },
  content: { flexGrow: 1 },
  container2: {
    marginTop: responsive.marginTop(150),
    marginHorizontal: responsive.marginHorizontal(23),
  },
  headingtxt: {
    color: '#FFFFFF',
    fontSize: responsive.fontSize(22),
    fontWeight: 'bold',
  },
  heading2txt: {
    color: '#979797',
    marginTop: responsive.marginTop(10),
    fontSize: responsive.fontSize(14),
  },
  container3: {
    gap: responsive.gap(12),
    marginTop: responsive.marginTop(20),
  },
  input: {
    borderColor: '#575757',
    borderRadius: 10,
    borderWidth: 1,
    padding: 12,
    marginHorizontal: responsive.marginHorizontal(23),
    color: '#fff',
    fontSize: 16,
  },
  container4: {
    paddingBottom: responsive.paddingBottom(30),
    paddingHorizontal: responsive.paddingHorizontal(15),
  },
  button: {
    backgroundColor: '#EB2F3D',
    padding: responsive.padding(14),
    alignItems: 'center',
    borderRadius: 12,
    height: 52, // Set a fixed height to prevent layout shift
    justifyContent: 'center',
  },
  btntxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
