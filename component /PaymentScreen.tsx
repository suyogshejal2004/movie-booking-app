import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';

const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { movie, totalAmount = 49 } = route.params || {}; // fallback amount

  const handleUPIPayment = () => {
    const upiID = 'suyogshejal20041@ybl'; // Replace with your real UPI ID
    const name = 'Suyog Shejal';
    const note = `Booking for ${movie?.Title || 'Movie'}`;
    const url = `upi://pay?pa=${upiID}&pn=${name}&am=${totalAmount}&cu=INR&tn=${note}`;

    Linking.openURL(url)
      .then(() => {
        console.log('Redirected to UPI app');
      })
      .catch(() => {
        Alert.alert('Error', 'UPI App not found or failed to open.');
      });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.label}>Movie</Text>
        <Text style={styles.value}>{movie?.Title || 'Movie Title'}</Text>

        <Text style={styles.label}>Total Amount</Text>
        <Text style={styles.amount}>₹{totalAmount}</Text>

        <TouchableOpacity style={styles.payBtn} onPress={handleUPIPayment}>
          <Text style={styles.payText}>Pay with UPI</Text>
        </TouchableOpacity>

        <Text style={styles.note}>
          This is a demo payment using UPI deep linking. No actual confirmation
          is received in app.
        </Text>
      </View>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
    marginTop: 30,
  },
  label: {
    color: '#999',
    fontSize: 14,
    marginTop: 20,
  },
  value: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 4,
  },
  amount: {
    color: '#0f0',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  payBtn: {
    backgroundColor: '#00b894',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 30,
    alignItems: 'center',
  },
  payText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  note: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 20,
    lineHeight: 18,
    textAlign: 'center',
  },
});
