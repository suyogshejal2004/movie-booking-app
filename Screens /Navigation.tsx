// Screens /Navigation.js

// Your original imports
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './SplashScreen';
import Onboarding1 from './Onboarding1';
import Onboarding2 from './onboard2';
import HomeScreen from './homescreen';
import SignInPage from './SignInpage';
import SignUpPage from './SignUpScreen';
import SignUpSuccessfully from './SignUpSuccesfuly';
import SearchScreen from '../component /SearchScreen';
import MovieDetailsScreen from '../component /MovieDetailsScreen';
import BookTicketsScreen from './BookTicketsScreen';
import PaymentScreen from '../component /PaymentScreen';
import AllMoviesScreen from '../component / AllMoviesScreen';
import AccountInfoScreen from '../component /AccountInfoScreen';
import PhoneNumber from '../component /phonesignin';
import ChangePasswordScreen from './ChangePasswordScreen';
const Stack = createNativeStackNavigator();

// Stack for users who are NOT logged in
const AuthStack = () => (
  <Stack.Navigator 
    initialRouteName="splashscreen"
    screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
  >
    <Stack.Screen name="splashscreen" component={SplashScreen} />
    <Stack.Screen name="onboarding1" component={Onboarding1} />
    <Stack.Screen name="onboarding2" component={Onboarding2} />
    <Stack.Screen name="SigninSCreen" component={SignInPage} />
    <Stack.Screen name="SignUpScreen" component={SignUpPage} />
    <Stack.Screen name="callsignin" component={PhoneNumber} />
  </Stack.Navigator>
);

// Stack for users who ARE logged in
const AppStack = ({ isProfileComplete }) => (
  <Stack.Navigator
    // If profile is not complete, the first screen is SignUpSuccessfully.
    // Otherwise, it's the HomeScreen.
    initialRouteName={isProfileComplete ? "homescreen" : "signupsc"}
    screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
  >
    {/* These screens are only accessible when logged in */}
    <Stack.Screen name="signupsc" component={SignUpSuccessfully} />
    <Stack.Screen name="homescreen" component={HomeScreen} />
    <Stack.Screen name="SearchScreen" component={SearchScreen} />
    <Stack.Screen name="MovieDetailsScreen" component={MovieDetailsScreen} />
    <Stack.Screen name="Bokking" component={BookTicketsScreen} />
    <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
    <Stack.Screen name="AllMoviesScreen" component={AllMoviesScreen} />
    <Stack.Screen name="AccountInfoScreen" component={AccountInfoScreen} />
    <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
  </Stack.Navigator>
);

// The main navigator now decides which stack to show
export default function NavigationScreen({ user, isProfileComplete }) {
  return (
    <NavigationContainer>
      {user ? <AppStack isProfileComplete={isProfileComplete} /> : <AuthStack />}
    </NavigationContainer>
  );
}