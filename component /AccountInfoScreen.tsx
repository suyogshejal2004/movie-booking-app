import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Sample User & Ticket Data
const user = {
  name: 'Suyog Shejal',
  email: 'suyogshejal2004@gmail.com',
  phone: '+91 9325285808',
  profilePic: 'https://i.pravatar.cc/150?img=5',
};

const bookedTickets = [
  {
    id: '1',
    title: 'Salaar',
    seats: ['B4', 'B5'],
    time: '2025-07-09 04:30 PM',
    poster: 'https://m.media-amazon.com/images/M/MV5BMzAzZWM0MGUtYmUwYi00YjA4LTgxYWEtYmVkNGNiNGE0ZTkxXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg',
  },
  {
    id: '2',
    title: 'Aquaman',
    seats: ['D1', 'D2', 'D3'],
    time: '2025-07-11 02:15 PM',
    poster: 'https://m.media-amazon.com/images/M/MV5BZDQ3NjQ1ZmQtZTZmNC00ZDA1LTk2YTUtY2VjNDVkMzY2NmRkXkEyXkFqcGdeQXVyNjU1OTg4OTM@._V1_SX300.jpg',
  },
];

const AccountInfoScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Profile */}
      <View style={styles.profileContainer}>
        <Image source={{ uri: user.profilePic }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.phone}>{user.phone}</Text>
      </View>

      {/* Actions */}
      <View style={styles.actionContainer}>
        <ActionItem icon="person" label="Edit Profile" onPress={() => {}} />
        <ActionItem icon="key" label="Change Password" onPress={() => {}} />
        <ActionItem icon="log-out" label="Logout" isDanger onPress={() => {}} />
      </View>

      {/* Booked Tickets */}
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
  profileContainer: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 30,
    backgroundColor: '#111',
  },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 12 },
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
