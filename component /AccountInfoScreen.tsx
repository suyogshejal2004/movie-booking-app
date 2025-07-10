import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getAuth, signOut } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const AccountInfoScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [bookedTickets, setBookedTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = getAuth().currentUser;
    if (!user) {
      navigation.replace('SigninSCreen');
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch user profile
        const userDoc = await firestore().collection('users').doc(user.uid).get();
        if (userDoc.exists) {
          setUserData(userDoc.data());
        } else {
          setError('User profile not found.');
        }

        // Fetch booked tickets
        const ticketsSnapshot = await firestore()
          .collection('bookedTickets')
          .where('userId', '==', user.uid)
          .get();
        const tickets = ticketsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookedTickets(tickets);
      } catch (err) {
        console.error('Firestore Error:', err);
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigation]);

  const handleLogout = () => {
    signOut(getAuth())
      .then(() => {
        console.log('User signed out!');
        navigation.replace('SigninSCreen');
      })
      .catch(error => {
        console.error('Logout Error:', error);
        setError('Failed to log out. Please try again.');
      });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#EB2F3D" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>No user data available.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.email}>{userData.email}</Text>
        <Text style={styles.phone}>{userData.phone}</Text>
      </View>

      <View style={styles.actionContainer}>
        <ActionItem
          icon="person"
          label="Edit Profile"
          onPress={() => navigation.navigate('EditProfileScreen')}
        />
        <ActionItem
          icon="key"
          label="Change Password"
          onPress={() => navigation.navigate('ChangePasswordScreen')}
        />
        <ActionItem icon="log-out" label="Logout" isDanger onPress={handleLogout} />
      </View>

      <View style={styles.ticketContainer}>
        <Text style={styles.ticketHeader}>🎟️ Booked Tickets</Text>
        {bookedTickets.length === 0 ? (
          <Text style={styles.noTicketText}>No tickets booked yet.</Text>
        ) : (
          <FlatList
            data={bookedTickets}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.ticketCard}>
                <Image source={{ uri: item.poster }} style={styles.ticketPoster} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.movieTitle}>{item.title}</Text>
                  <Text style={styles.ticketText}>Seats: {item.seats.join(', ')}</Text>
                  <Text style={styles.ticketText}>Time: {item.time}</Text>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </ScrollView>
  );
};

const ActionItem = ({ icon, label, onPress, isDanger = false }) => (
  <TouchableOpacity style={styles.actionItem} onPress={onPress}>
    <Icon name={icon} size={22} color={isDanger ? '#EB2F3D' : '#fff'} />
    <Text style={[styles.actionText, isDanger && { color: '#EB2F3D' }]}>{label}</Text>
    <Icon name="chevron-forward" size={20} color="#888" style={{ marginLeft: 'auto' }} />
  </TouchableOpacity>
);

export default AccountInfoScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#EB2F3D',
    fontSize: 16,
    textAlign: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 30,
    backgroundColor: '#111',
  },
  name: { fontSize: 22, color: '#fff', fontWeight: 'bold' },
  email: { fontSize: 14, color: '#ccc', marginTop: 4 },
  phone: { fontSize: 14, color: '#ccc', marginTop: 2 },
  actionContainer: { marginTop: 20, paddingHorizontal: 20 },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  actionText: { color: '#fff', fontSize: 16, marginLeft: 16 },
  ticketContainer: {
    marginTop: 30,
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  ticketHeader: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  noTicketText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
  ticketCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: 'center',
  },
  ticketPoster: {
    width: 70,
    height: 100,
    borderRadius: 6,
  },
  movieTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ticketText: {
    color: '#ccc',
    fontSize: 13,
    marginTop: 4,
  },
});