import {
  
  NavigationContainer,
} from '@react-navigation/native';
import { View } from 'react-native';
import SplashScreen from './SplashScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding1 from './Onboarding1';
import Onboarding2 from './onboard2';
import HomeScreen from './homescreen';
import SignInPage from './SignInpage';
import SignUpPage from './SignUpScreen';

const Stack = createNativeStackNavigator();
export default function NavigationScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="splashscreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="splashscreen" component={SplashScreen} />
        <Stack.Screen name="onboarding1" component={Onboarding1} />
        <Stack.Screen name="onboarding2" component={Onboarding2} />
        <Stack.Screen name="homescreen" component={HomeScreen} />
        <Stack.Screen name="SigninSCreen" component={SignInPage} />
        <Stack.Screen name="SignUpScreen" component={SignUpPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
