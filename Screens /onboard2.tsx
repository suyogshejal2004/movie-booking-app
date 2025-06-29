import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function Onboarding2({ navigation }) {
  return (
    <SafeAreaView style={{flex:1}}>   <View style={styles.container}>
      <Text>Onboarding 2 </Text>
    </View>
  </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  },
});
