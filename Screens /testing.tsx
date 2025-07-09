import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

export default function MovieScreen() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('https://my-movie-api-ylwm.onrender.com/movies')
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error('Error fetching:', err));
  }, []);

  return (
    <FlatList
      data={movies}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.poster }} style={styles.poster} />
          <View style={styles.info}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.genre}</Text>
            <Text>{item.duration}</Text>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    overflow: 'hidden',
  },
  poster: {
    width: 100,
    height: 150,
  },
  info: {
    padding: 10,
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});