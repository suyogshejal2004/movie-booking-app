import {
  TextInput,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import colors from '../component/colors';
import responsive from '../component /responsiveui';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from '@react-native-firebase/auth';

export default function SignUpPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSignUp = async () => {
    if (!email.trim() || !password) {
      alert('Please fill in both email and password.');
      return;
    }

    setLoading(true);
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      // Don't navigate from here; onAuthStateChanged will handle it
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        alert('That email address is invalid!');
      } else {
        alert('An error occurred: ' + error.message);
      }
      setLoading(false); // Stop loading on error
    }
  };

  return (
    <View style={style.container}>
      <Pressable onPress={() => navigation.navigate('signupsc')}>
        <Text style={style.skiptxt}>Skip</Text>
      </Pressable>

      <View style={style.content}>
        <Text style={style.signtxt}>Sign Up</Text>

        <View style={{ alignItems: 'center', marginTop: responsive.marginTop(19) }}>
          <TextInput
            style={style.txtinput}
            placeholder="E-Mail"
            placeholderTextColor="#575757"
            onChangeText={setEmail}
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={style.passwordContainer}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#575757"
            onChangeText={setPassword}
            value={password}
            secureTextEntry={secureText}
            style={style.passwordInput}
          />
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <Icon name={secureText ? 'eye-off' : 'eye'} size={24} color="#404040" />
          </TouchableOpacity>
        </View>

        <View style={style.forgotWrapper}>
          <Pressable>
            <Text style={style.forgottxt}>
              By clicking the "sign up" button, you accept the terms
            </Text>
            <Text style={style.forgottxt}>
              of the
              <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>
                {' '}Privacy Policy
              </Text>
            </Text>
          </Pressable>
        </View>

        <View>
          <Pressable
            style={style.signinButton}
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={style.signinText}>Sign up</Text>
            )}
          </Pressable>
        </View>

        <View style={style.dividerContainer}>
          <View style={style.line} />
          <Text style={style.orText}>or</Text>
          <View style={style.line} />
        </View>

        <View style={style.socialWrapper}>
          <Pressable onPress={() => alert('Facebook Auth not implemented')}>
            <Ionicons name="logo-facebook" color="white" size={24} style={style.logo} />
          </Pressable>
          <Pressable onPress={() => alert('Google Auth not implemented')}>
            <AntDesign name="google" color="white" size={24} style={style.logo} />
          </Pressable>
          <Pressable onPress={() => alert('Apple Auth not implemented')}>
            <AntDesign name="apple1" color="white" size={24} style={style.logo} />
          </Pressable>
        </View>
      </View>

      <View style={style.signupPrompt}>
        <Text style={style.botomtxt}>Already have an account? </Text>
        <Pressable onPress={() => navigation.navigate('SigninSCreen')}>
          <Text style={style.signupLink}>Sign In</Text>
        </Pressable>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#121011',
    flex: 1,
  },
  content: {
    flex: 1,
  },
  signtxt: {
    color: '#FFFFFF',
    fontSize: responsive.fontSize(23),
    marginTop: responsive.marginTop(99),
    marginLeft: responsive.marginLeft(20),
  },
  txtinput: {
    height: responsive.height(48),
    width: responsive.width(336),
    borderWidth: responsive.borderWidth(1),
    borderColor: '#404040',
    padding: responsive.padding(10),
    borderRadius: responsive.borderRadius(18),
    color: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: responsive.borderWidth(1),
    borderColor: '#404040',
    borderRadius: responsive.borderRadius(18),
    width: responsive.width(336),
    paddingHorizontal: 10,
    marginTop: responsive.marginTop(10),
    alignSelf: 'center',
  },
  passwordInput: {
    flex: 1,
    height: responsive.height(48),
    color: '#fff',
    fontSize: 16,
  },
  forgotWrapper: {
    marginTop: responsive.marginTop(10),
    alignSelf: 'center',
    marginRight: responsive.marginRight(20),
  },
  forgottxt: {
    color: '#D4D4D4',
    textAlign: 'center',
  },
  signinButton: {
    backgroundColor: '#EB2F3D',
    padding: responsive.padding(10),
    margin: responsive.margin(23),
    borderRadius: responsive.borderRadius(16),
  },
  signinText: {
    fontSize: responsive.fontSize(16),
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '500',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: responsive.marginHorizontal(20),
    marginTop: responsive.marginTop(10),
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#939392',
  },
  orText: {
    color: '#D4D4D4',
    marginHorizontal: 10,
    fontSize: responsive.fontSize(14),
  },
  socialWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: responsive.marginTop(23),
    gap: 12,
  },
  logo: {
    backgroundColor: '#1e1e1e',
    padding: responsive.padding(10),
    paddingHorizontal: responsive.paddingHorizontal(30),
    borderRadius: responsive.borderRadius(12),
  },
  signupPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsive.marginBottom(30),
  },
  botomtxt: {
    color: '#767576',
  },
  signupLink: {
    color: '#D4D4D4',
    fontWeight: '600',
  },
  skiptxt: {
    color: '#D4D4D4',
    fontSize: responsive.fontSize(16),
    textAlign: 'right',
    marginTop: responsive.marginTop(30),
    marginRight: responsive.marginRight(20),
  },
});
