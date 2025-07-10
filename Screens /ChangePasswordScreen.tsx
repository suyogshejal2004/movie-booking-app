import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import responsive from '../component /responsiveui';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Feather';

export default function ChangePasswordScreen({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureCurrent, setSecureCurrent] = useState(true);
  const [secureNew, setSecureNew] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    const user = getAuth().currentUser;
    
    // Check if user is authenticated
    if (!user) {
      Alert.alert('Authentication Error', 'No user session found. Please sign in again.');
      navigation.replace('SigninSCreen');
      return;
    }

    // Validate input fields
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Missing Fields', 'Please fill all password fields.');
      return;
    }

    // Explicit if-else for password mismatch
    if (newPassword === confirmPassword) {
      // Check password length
      if (newPassword.length < 6) {
        Alert.alert('Error', 'New password must be at least 6 characters long.');
        return;
      }

      setLoading(true);
      try {
        // Re-authenticate user
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);

        // Update password
        await updatePassword(user, newPassword);
        Alert.alert('Success', 'Password updated successfully!');
        navigation.goBack();
      } catch (error) {
        setLoading(false);
        if (error.code === 'auth/wrong-password') {
          Alert.alert('Error', 'Current password is incorrect.');
        } else if (error.code === 'auth/too-many-requests') {
          Alert.alert('Error', 'Too many attempts. Please try again later.');
        } else {
          Alert.alert('Error', error.message);
        }
      }
    } else {
      Alert.alert('Error', 'New password and confirm password do not match.');
      return;
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.content}>
        <View style={styles.container2}>
          <Text style={styles.headingtxt}>Change Password</Text>
          <Text style={styles.heading2txt}>Update your account password</Text>
        </View>

        <View style={styles.container3}>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Current Password"
              style={styles.input}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholderTextColor="#575757"
              secureTextEntry={secureCurrent}
            />
            <TouchableOpacity onPress={() => setSecureCurrent(!secureCurrent)}>
              <Icon name={secureCurrent ? 'eye-off' : 'eye'} size={24} color="#404040" />
            </TouchableOpacity>
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="New Password"
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholderTextColor="#575757"
              secureTextEntry={secureNew}
            />
            <TouchableOpacity onPress={() => setSecureNew(!secureNew)}>
              <Icon name={secureNew ? 'eye-off' : 'eye'} size={24} color="#404040" />
            </TouchableOpacity>
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Confirm New Password"
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholderTextColor="#575757"
              secureTextEntry={secureConfirm}
            />
            <TouchableOpacity onPress={() => setSecureConfirm(!secureConfirm)}>
              <Icon name={secureConfirm ? 'eye-off' : 'eye'} size={24} color="#404040" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.container4}>
        <TouchableOpacity
          onPress={handleChangePassword}
          style={styles.button}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.btntxt}>Save Password</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121011' },
  content: { flexGrow: 1 },
  container2: {
    marginTop: responsive.marginTop(100),
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
    alignItems: 'center',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: responsive.borderWidth(1),
    borderColor: '#404040',
    borderRadius: responsive.borderRadius(18),
    width: responsive.width(336),
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: responsive.height(48),
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
    height: 52,
    justifyContent: 'center',
  },
  btntxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});