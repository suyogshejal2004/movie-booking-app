import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import HeaderComponent from '../component /header';
import Highlight from '../component /highlight';
import RecommendedMovies from '../component /Recomended';
const popularMovies = [
  { id: '1', title: 'Inception', image: 'https://image.tmdb.org/t/p/w500//qmDpIHrmpJINaRKAfWQfftjCdyi.jpg' },
  { id: '2', title: 'Interstellar', image: 'https://image.tmdb.org/t/p/w500//gEU2QniE6E77NI6lCU6MxlNBvIx.jpg' },
];

const recommendedMovies = [
  { id: '3', title: 'The Dark Knight', image: 'https://image.tmdb.org/t/p/w500//1hRoyzDtpgMU7Dz4JF22RANzQO7.jpg' },
  { id: '4', title: 'Parasite', image: 'https://image.tmdb.org/t/p/w500//7IiTTgloJzvGI1TAYymCfbfl3vT.jpg' },
];

export default function HomeScreen({ navigation, route }) {
  const username = route?.params?.username || 'Guest';

  return(<View style={styles.container}>

 <HeaderComponent username={username} />
<Highlight/>
<RecommendedMovies/>
   
  </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
 
  },
  header: {
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 10,
  },
  movieCard: {
    marginRight: 16,
    marginBottom: 20,
    width: 120,
  },
  movieImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
  movieTitle: {
    color: '#fff',
    marginTop: 6,
    fontSize: 14,
    fontWeight: '500',
  },
});
