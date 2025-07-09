import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

const API_KEY = '6ac52cb9';
const movieTitles = ['Salaar', 'Flash', 'Aquaman'];

const RecommendedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const results = await Promise.all(
          movieTitles.map(title =>
            axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&t=${title}`)
          )
        );
        const data = results.map(res => res.data);
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const openTrailer = (title) => {
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(title)}+trailer`;
    setTrailerUrl(url);
  };

  const closeTrailer = () => setTrailerUrl(null);

  const renderMovieCard = ({ item }) => (
    <View style={styles.card}>
      {/* Navigate to movie details on image click */}
      <TouchableOpacity onPress={() => navigation.navigate('MovieDetailsScreen', { movie: item })}>
        <Image source={{ uri: item.Poster }} style={styles.poster} />
      </TouchableOpacity>

      {/* Open trailer on ▶ button click */}
      <TouchableOpacity onPress={() => openTrailer(item.Title)} style={styles.playButton}>
        <Text style={{ color: 'white', fontSize: 16 }}>▶</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{item.Title} ({item.Year})</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.recommended}>Recommended Movies</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All ></Text>
        </TouchableOpacity>
      </View>

      {/* Movie list */}
      <FlatList
        horizontal
        data={movies}
        renderItem={renderMovieCard}
        keyExtractor={(item, index) => `${item.imdbID}-${index}`}
        showsHorizontalScrollIndicator={false}
      />

      {/* Optional filter button */}
  {   /* <TouchableOpacity style={styles.filterIcon}>
        <Text style={styles.filterText}>🔍</Text>
      </TouchableOpacity>*/}

      {/* Modal for Trailer */}
      <Modal visible={!!trailerUrl} animationType="slide">
        <View style={{ flex: 1 }}>
          <Pressable onPress={closeTrailer} style={styles.closeButton}>
            <Text style={{ fontSize: 18, color: 'white' }}>✖ Close</Text>
          </Pressable>
          <WebView source={{ uri: trailerUrl }} />
        </View>
      </Modal>
    </View>
  );
};

export default RecommendedMovies;

const styles = StyleSheet.create({
  container: { paddingTop: 20, paddingLeft: 10, backgroundColor: '#000', flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginRight: 20 },
  recommended: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  seeAll: { color: 'red', marginTop: 2 },
  card: {
    width: 140,
    marginRight: 12,
    alignItems: 'center',
    position: 'relative',
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  title: {
    color: '#fff',
    marginTop: 6,
    textAlign: 'center',
    fontSize: 12,
  },
  playButton: {
    position: 'absolute',
    top: 110,
    left: 90,
    backgroundColor: '#000a',
    borderRadius: 20,
    padding: 6,
    zIndex: 2,
  },
  filterIcon: {
    position: 'absolute',
    bottom: 240,
    right: 20,
    backgroundColor: '#f44',
    borderRadius: 20,
    padding: 10,
  },
  filterText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#222',
    padding: 10,
    alignItems: 'flex-end',
  },
});
