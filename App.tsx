import { SafeAreaView, ScrollView, View } from 'react-native';
import SplashScreen from './Screens /SplashScreen';
import Navigation from './Screens /Navigation';
import { NavigationContainer } from '@react-navigation/native';
import NavigationScreen from './Screens /Navigation';
import onboarding1 from './Screens /Onboarding1';
import Onboarding1 from './Screens /Onboarding1';


export default function App() {
  return (
<SafeAreaView style={{flex:1}}>
  <Navigation/>
</SafeAreaView>

    
  );
}
