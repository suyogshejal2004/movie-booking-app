import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const API_KEY = '6ac52cb9';

// Longer list for full screen
const moreMovieTitles = [
  'Salaar', 'Flash', 'Aquaman', 'Jawan', 'Pathaan',
  'KGF', 'Avengers', 'Dunki', 'Leo', 'Batman',
  'Pushpa', 'Spider-Man', 'Jailer', 'Oppenheimer', 'RRR',
  'Thor', 'Iron Man', 'Doctor Strange', 'Animal', 'The Marvels'
];

const AllMoviesScreen = () => {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const responses = await Promise.all(
          moreMovieTitles.map(title =>
            axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&t=${title}`)
          )
        );
        const data = responses
          .map(res => res.data)
          .filter(movie => movie && movie.Response !== 'False');
        setMovies(data);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MovieDetailsScreen', { movie: item })}
    >
      <Image
        source={{
          uri:
            item?.Poster && item.Poster !== 'N/A'
              ? item.Poster
              : 'https://via.placeholder.com/100x150?text=No+Image',
        }}
        style={styles.poster}
      />
      <Text style={styles.title} numberOfLines={1}>
        {item.Title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>All Movies</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#f44" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={movies}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.imdbID}-${index}`}
          numColumns={3}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default AllMoviesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  heading: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  grid: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  card: {
    width: 110,
    margin: 8,
    alignItems: 'center',
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  title: {
    color: '#fff',
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
  },
});
