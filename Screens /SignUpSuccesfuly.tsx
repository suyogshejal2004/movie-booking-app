import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import responsive from '../component /responsiveui';
import { useState } from 'react';

export default function SignUpSuccessfully({ navigation }) {
  const [name, setName] = useState('');

  const handleNavigation = () => {
    navigation.navigate('homescreen', {
      username: name, // ✅ Pass username to HomeScreen
    });
  };

  return (
    <KeyboardAvoidingView
      style={style.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Top Content */}
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
          />
          <TextInput
            placeholder="Your phone number"
            style={style.input}
            inputMode="numeric"
          />
          <TextInput placeholder="Current city" style={style.input} />
        </View>
      </View>

      {/* Bottom Button */}
      <View style={style.container4}>
        <TouchableOpacity onPress={handleNavigation} style={style.button}>
          <Text style={style.btntxt}>Continue</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121011',
  },
  content: {
    flexGrow: 1,
  },
  container2: {
    marginTop: responsive.marginTop(150),
    marginHorizontal: responsive.marginHorizontal(23),
  },
  headingtxt: {
    color: '#FFFFFF',
    fontSize: responsive.fontSize(22),
  },
  heading2txt: {
    color: '#979797',
    marginTop: responsive.marginTop(10),
    fontSize: responsive.fontSize(14),
  },
  container3: {
    gap: responsive.gap(10),
    marginTop: responsive.marginTop(12),
  },
  input: {
    borderColor: '#575757',
    borderRadius: 10,
    borderWidth: 1,
    padding: 12,
    marginHorizontal: responsive.marginHorizontal(23),
    color: '#fff',
  },
  container4: {
    paddingBottom: responsive.paddingBottom(30),
  },
  button: {
    backgroundColor: '#EB2F3D',
    padding: responsive.padding(10),
    alignItems: 'center',
    marginHorizontal: responsive.marginHorizontal(15),
    borderRadius: 10,
  },
  btntxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
