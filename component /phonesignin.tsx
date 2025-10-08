import {
  TextInput,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import responsive from './responsiveui'; // Assuming this file exists in the same directory
import auth from '@react-native-firebase/auth';
import { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function PhoneNumberSignIn({ navigation }) {
  // State for the phone number input
  const [phoneNumber, setPhoneNumber] = useState('');
  // State for the confirmation object from Firebase
  const [confirm, setConfirm] = useState(null);
  // State for the OTP code input
  const [code, setCode] = useState('');
  // State for loading indicators
  const [loading, setLoading] = useState(false);

  // Sign in with phone number
  async function signInWithPhoneNumber(number) {
    if (!number || number.length < 10) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid phone number.');
      return;
    }
    setLoading(true);
    try {
      // Format number to E.164 format
      const formattedNumber = `+91${number}`; 
      const confirmation = await auth().signInWithPhoneNumber(formattedNumber);
      setConfirm(confirmation);
      Alert.alert('OTP Sent', `An OTP has been sent to ${formattedNumber}`);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  // Confirm the OTP code
  async function confirmCode() {
    if (!code || code.length < 6) {
        Alert.alert('Invalid Code', 'Please enter the 6-digit OTP.');
        return;
    }
    setLoading(true);
    try {
      await confirm.confirm(code);
      Alert.alert('Success', 'Phone number verified successfully!');
      // Navigate to home screen on successful verification
      navigation.navigate('homescreen'); 
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Invalid code. Please try again.');
    } finally {
        setLoading(false);
    }
  }

  return (
    <View style={style.container}>
       <Pressable style={style.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#D4D4D4" />
      </Pressable>
      
      <View style={style.content}>
        <Text style={style.title}>Sign In with Phone</Text>
        <Text style={style.subtitle}>
          { !confirm ? 'Enter your phone number to receive a verification code.' : 'Enter the 6-digit code sent to your phone.'}
        </Text>

        {!confirm ? (
          <>
            {/* Phone Number Input View */}
            <View style={style.inputContainer}>
              <Text style={style.countryCode}>+91</Text>
              <TextInput
                style={style.txtinput}
                placeholder="Phone Number"
                placeholderTextColor="#575757"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                maxLength={10}
              />
            </View>
            <Pressable 
                style={style.actionButton} 
                onPress={() => signInWithPhoneNumber(phoneNumber)}
                disabled={loading}
            >
              {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={style.actionButtonText}>Send Code</Text>}
            </Pressable>
          </>
        ) : (
          <>
            {/* OTP Input View */}
            <View style={[style.inputContainer, { justifyContent: 'center' }]}>
              <TextInput
                style={[style.txtinput, {textAlign: 'center', letterSpacing: 10}]}
                placeholder="------"
                placeholderTextColor="#575757"
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
                maxLength={6}
              />
            </View>
            <Pressable 
                style={style.actionButton} 
                onPress={() => confirmCode()}
                disabled={loading}
            >
              {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={style.actionButtonText}>Verify Code</Text>}
            </Pressable>
            <Pressable onPress={() => setConfirm(null)}>
                <Text style={style.changeNumberText}>Entered the wrong number?</Text>
            </Pressable>
          </>
        )}
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
    paddingHorizontal: responsive.paddingHorizontal(20),
  },
  backButton: {
    position: 'absolute',
    top: responsive.marginTop(30),
    left: responsive.marginLeft(20),
    zIndex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: responsive.fontSize(23),
    fontWeight: 'bold',
    marginTop: responsive.marginTop(99),
    marginBottom: responsive.marginBottom(10),
  },
  subtitle: {
    color: '#D4D4D4',
    fontSize: responsive.fontSize(14),
    marginBottom: responsive.marginBottom(30),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: responsive.borderWidth(1),
    borderColor: '#404040',
    borderRadius: responsive.borderRadius(18),
    width: '100%',
    paddingHorizontal: 15,
    marginBottom: responsive.marginBottom(20),
  },
  countryCode: {
    color: '#fff',
    fontSize: responsive.fontSize(16),
    marginRight: responsive.marginRight(10),
  },
  txtinput: {
    flex: 1,
    height: responsive.height(48),
    color: '#fff',
    fontSize: responsive.fontSize(16),
  },
  actionButton: {
    backgroundColor: '#EB2F3D',
    padding: responsive.padding(14),
    borderRadius: responsive.borderRadius(16),
    alignItems: 'center',
    justifyContent: 'center',
    height: responsive.height(52)
  },
  actionButtonText: {
    fontSize: responsive.fontSize(16),
    color: '#FFFFFF',
    fontWeight: '500',
  },
  changeNumberText: {
    color: '#D4D4D4',
    textAlign: 'center',
    marginTop: responsive.marginTop(20),
  }
});
