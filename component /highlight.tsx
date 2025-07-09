import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { WebView } from 'react-native-webview';
import Modal from 'react-native-modal';
import responsive from './responsiveui';

const API_KEY = '6ac52cb9';
const MOVIE_TITLES = ['Evil Dead Rise', 'Jawan', 'KGF', 'Inception', 'Oppenheimer'];

const MovieCard = () => {
  const [movie, setMovie] = useState(null);
  const [nextMovie, setNextMovie] = useState(null);
  const [index, setIndex] = useState(0);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const fetchMovie = async (title) => {
    try {
      const res = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(title)}`);
      return res.data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  const transitionToNextMovie = async () => {
    const nextIdx = (index + 1) % MOVIE_TITLES.length;
    const fetchedMovie = await fetchMovie(MOVIE_TITLES[nextIdx]);
    if (!fetchedMovie || fetchedMovie.Response === 'False') return;

    setNextMovie(fetchedMovie);

    // Fade out current
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      // Update to next movie
      setMovie(fetchedMovie);
      setIndex(nextIdx);
      setNextMovie(null);

      // Fade in new
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  };

  useEffect(() => {
    fetchMovie(MOVIE_TITLES[0]).then(setMovie);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      transitionToNextMovie();
    }, 6000); // every 6 seconds
    return () => clearInterval(interval);
  }, [index]);

  const openTrailer = () => {
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.Title)}+trailer`;
    setTrailerUrl(url);
  };

  const closeTrailer = () => setTrailerUrl(null);

  if (!movie) return null;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Poster Image */}
      <View style={{marginTop:responsive.marginTop(34)}}> <View style={styles.imageContainer}>
        <Image source={{ uri: movie.Poster }} style={styles.poster} />
        <TouchableOpacity onPress={openTrailer} style={styles.trailerButton}>
          <Text style={styles.trailerText}>Watch Trailer</Text>
          <Icon name="chevron-forward" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Bottom Info Card */}
      <View style={styles.infoCard}>
        <View style={styles.leftSection}>
          <Text style={styles.trending}>TRENDING</Text>
          <Text style={styles.title}>{movie.Title}</Text>
          <View style={styles.languageRow}>
            <Text style={styles.adult}>{movie.Rated}</Text>
            <Text style={styles.dot}> • </Text>
            <Text style={styles.lang}>{movie.Language}</Text>
          </View>
          <Text style={styles.genre}>{movie.Genre}</Text>
        </View>

        <View style={styles.rightSection}>
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookText}>Book</Text>
          </TouchableOpacity>
          <Text style={styles.format}>2D.3D.4DX</Text>
        </View>
      </View>

      {/* Trailer Modal */}
      <Modal isVisible={!!trailerUrl} onBackdropPress={closeTrailer}>
        {trailerUrl && (
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={closeTrailer} style={{ alignSelf: 'flex-end', padding: 10 }}>
              <Text style={{ color: 'white', fontSize: 18 }}>✖</Text>
            </TouchableOpacity>
            <WebView source={{ uri: trailerUrl }} />
          </View>
        )}
      </Modal></View>
     
    </Animated.View>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 0,
    backgroundColor:'#000'
  },
  imageContainer: {
    position: 'relative',
  },
  poster: {
    width: 360,
    height: 220,
    borderRadius: 30,
  },
  trailerButton: {
    position: 'absolute',
    bottom: 52,
    right: 12,
    backgroundColor:'#1E1E1E',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 20,
    zIndex: 2,
    elevation: 6,
  },
  trailerText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 6,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: '#1E1E1E',
    width: 340,
    height: 130,
    borderRadius: 60,
    marginTop: -45,
    paddingHorizontal: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
    elevation: 2,
  },
  leftSection: {
    flex: 1,
  },
  trending: {
    color: '#aaa',
    fontSize: 13,
    marginBottom: 4,
  },
  title: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  adult: {
    color: '#FF2E2E',
    fontSize: 14,
    fontWeight: '700',
  },
  dot: {
    color: '#fff',
    marginHorizontal: 4,
  },
  lang: {
    color: '#fff',
    fontSize: 14,
  },
  genre: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
  rightSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookButton: {
    backgroundColor: '#3A3A3A',
    paddingVertical: 7,
    paddingHorizontal: 22,
    borderRadius: 22,
    marginBottom: 6,
  },
  bookText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  format: {
    color: '#ccc',
    fontSize: 13,
  },
});
