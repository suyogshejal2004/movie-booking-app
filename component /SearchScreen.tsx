import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const API_KEY = '6ac52cb9';

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (text) => {
    setSearchQuery(text);

    if (text.length < 3) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${text}`);
      if (response.data.Search) {
        setSearchResults(response.data.Search);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const fetchMovieDetailsAndNavigate = async (title) => {
    try {
      const res = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&t=${title}`);
      if (res.data && res.data.Response !== 'False') {
        navigation.navigate('MovieDetailsScreen', { movie: res.data });
      }
    } catch (err) {
      console.error('Details fetch error:', err);
    }
  };

  const renderSearchCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => fetchMovieDetailsAndNavigate(item.Title)}>
      <Image source={{ uri: item.Poster }} style={styles.poster} />
      <Text style={styles.title}>{item.Title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Top Search Bar */}
      <View style={styles.searchBarContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <TextInput
          placeholder="Search"
          placeholderTextColor="#999"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearch}
        />

        <TouchableOpacity>
          <Icon name="options-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search Results */}
      <Text style={styles.recentText}>Search Results</Text>

      <FlatList
        data={searchResults}
        horizontal
        renderItem={renderSearchCard}
        keyExtractor={(item, index) => `${item.imdbID}-${index}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 10 }}
      />

      {/* No Results UI */}
      {searchResults.length === 0 && searchQuery.length >= 3 && (
        <Text style={{ color: '#888', textAlign: 'center', marginTop: 20 }}>
          No movies found.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingTop: 50 },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
    marginHorizontal: 10,
    borderRadius: 50,
    paddingHorizontal: 15,
    height: 45,
    justifyContent: 'space-between',
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    marginHorizontal: 10,
    fontSize: 16,
  },
  recentText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 14,
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    width: 140,
    marginRight: 12,
    alignItems: 'center',
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
});

export default SearchScreen;
