// App.js

// Your original imports
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StatusBar } from 'react-native'; // Added StatusBar
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Kept for other potential uses, though not for this flow
import NavigationScreen from './Screens /Navigation';

// Added import for Firestore
import firestore from '@react-native-firebase/firestore';

export default function App() {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  useEffect(() => {
    // We remove the check for 'splashViewed' and 'profileIncomplete' from AsyncStorage
    // as our new logic is more reliable.

    const auth = getAuth();
    const subscriber = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // If user exists, check if their profile is created in Firestore
        const userDocument = await firestore()
          .collection('users')
          .doc(currentUser.uid)
          .get();
        setIsProfileComplete(userDocument.exists);
      } else {
        // If no user, profile is obviously not complete
        setIsProfileComplete(false);
      }

      if (initializing) {
        setInitializing(false);
      }
    });

    return subscriber; // Unsubscribe on unmount
  }, [initializing]);

  if (initializing) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#EB2F3D" />
      </View>
    );
  }

  // Pass the user and profile status to the navigator
  return (
    <>
      <StatusBar barStyle="light-content" />
      <NavigationScreen user={user} isProfileComplete={isProfileComplete} />
    </>
  );
}