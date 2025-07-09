import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const seatsPerRow = 10;

const generateSeats = () => {
  const seats = [];
  rows.forEach(row => {
    for (let i = 1; i <= seatsPerRow; i++) {
      seats.push({
        id: `${row}${i}`,
        status: Math.random() < 0.1 ? 'reserved' : 'available',
      });
    }
  });
  return seats;
};

const SeatSelectionScreen = ({ navigation }) => {
  const [seats, setSeats] = useState(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = seatId => {
    const seatIndex = seats.findIndex(seat => seat.id === seatId);
    const seat = seats[seatIndex];

    if (seat.status === 'reserved') return;

    const isSelected = selectedSeats.includes(seatId);
    const updatedSelection = isSelected
      ? selectedSeats.filter(id => id !== seatId)
      : [...selectedSeats, seatId];

    setSelectedSeats(updatedSelection);
  };

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      Alert.alert('No seat selected', 'Please select at least one seat.');
      return;
    }

    // Update seat statuses to 'reserved'
    const updatedSeats = seats.map(seat =>
      selectedSeats.includes(seat.id)
        ? { ...seat, status: 'reserved' }
        : seat
    );

    setSeats(updatedSeats);

    navigation.navigate('PaymentScreen', {
      selectedSeats: selectedSeats,
      totalAmount: selectedSeats.length * 49, // Rs.49 per ticket
    });

    // Clear selection after navigating
    setSelectedSeats([]);
  };

  const renderSeat = ({ item }) => {
    const isSelected = selectedSeats.includes(item.id);
    let backgroundColor = '#333';
    if (item.status === 'reserved') backgroundColor = '#111';
    if (isSelected) backgroundColor = '#FFD700';

    return (
      <TouchableOpacity
        onPress={() => toggleSeat(item.id)}
        style={[styles.seat, { backgroundColor }]}
        disabled={item.status === 'reserved'}
      >
        <Text style={{ color: '#fff', fontSize: 10 }}>{item.id}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Select Your Seats</Text>

      <FlatList
        data={seats}
        numColumns={seatsPerRow}
        keyExtractor={item => item.id}
        renderItem={renderSeat}
        contentContainerStyle={styles.seatGrid}
        scrollEnabled={false}
      />

      {/* Legends */}
      <View style={styles.legendRow}>
        <Legend color="#333" label="Available" />
        <Legend color="#111" label="Reserved" />
        <Legend color="#FFD700" label="Selected" />
      </View>

      {/* Selected Seats Info */}
      <Text style={styles.selectionText}>
        Selected: {selectedSeats.join(', ') || 'None'}
      </Text>

      {/* Total Price */}
      {selectedSeats.length > 0 && (
        <Text style={styles.selectionText}>
          Total: ₹{selectedSeats.length * 49}
        </Text>
      )}

      {/* Continue Button */}
      <TouchableOpacity onPress={handleContinue} style={styles.bookButton}>
        <Text style={styles.bookText}>Continue to Payment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const Legend = ({ color, label }) => (
  <View style={styles.legend}>
    <View style={[styles.legendBox, { backgroundColor: color }]} />
    <Text style={{ color: '#fff' }}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingTop: 50,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  seatGrid: {
    alignItems: 'center',
  },
  seat: {
    width: 28,
    height: 28,
    margin: 4,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  selectionText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  bookButton: {
    backgroundColor: '#EB2F3D',
    padding: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 40,
    marginHorizontal: 40,
  },
  bookText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SeatSelectionScreen;
