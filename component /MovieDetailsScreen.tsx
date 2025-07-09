import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Modal,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

const MovieDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { movie } = route.params;

  const [trailerVisible, setTrailerVisible] = useState(false);

  const openTrailer = () => {
    setTrailerVisible(true);
  };

  const closeTrailer = () => {
    setTrailerVisible(false);
  };

  if (!movie) {
    return (
      <Text style={{ color: 'white', marginTop: 100, textAlign: 'center' }}>
        Movie not found
      </Text>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Poster Banner */}
      <ImageBackground
        source={{ uri: movie.Poster }}
        style={styles.poster}
        resizeMode="cover"
      >
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="ellipsis-vertical" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Details Card */}
      <View style={styles.detailsCard}>
        {/* Header Title + Trailer */}
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.movieTitle}>{movie.Title}</Text>
            <Text style={styles.subtitle}>
              {movie.Genre?.toUpperCase()} 2D.3D.4DX
            </Text>
          </View>
          <TouchableOpacity style={styles.trailerBtn} onPress={openTrailer}>
            <Text style={styles.trailerText}>Watch Trailer</Text>
            <Icon name="chevron-forward" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Info Grid */}
        <View style={styles.infoRow}>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>Censor Rating</Text>
            <Text style={styles.infoText}>{movie.Rated || 'N/A'}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>Duration</Text>
            <Text style={styles.infoText}>{movie.Runtime || 'N/A'}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>Release Date</Text>
            <Text style={styles.infoText}>{movie.Released || 'N/A'}</Text>
          </View>
        </View>

        {/* Language */}
        <Text style={styles.langText}>
          Available in language’s {'\n'}
          <Text style={{ fontWeight: 'bold' }}>{movie.Language}</Text>
        </Text>

        <View style={styles.divider} />

        {/* Plot */}
        <Text style={styles.storyLabel}>Story Plot</Text>
        <Text style={styles.plotText}>{movie.Plot}</Text>

        {/* Cast */}
        <Text style={styles.storyLabel}>Cast</Text>
        <FlatList
          data={movie.Actors?.split(', ') || []}
          horizontal
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={({ item }) => (
            <View style={styles.castAvatar}>
              <Icon name="person-circle-outline" size={50} color="#fff" />
              <Text style={styles.castName}>{item}</Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 10 }}
        />

        {/* Book Now */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Bokking', { movie })}
          style={styles.bookBtn}
        >
          <Text style={styles.bookText}>Book Tickets</Text>
        </TouchableOpacity>
      </View>

      {/* Trailer Modal */}
      <Modal visible={trailerVisible} animationType="slide">
        <View style={{ flex: 1 }}>
          <Pressable onPress={closeTrailer} style={styles.closeButton}>
            <Text style={{ fontSize: 18, color: 'white' }}>✖ Close</Text>
          </Pressable>
          <WebView
            source={{
              uri: `https://www.youtube.com/results?search_query=${encodeURIComponent(
                movie.Title,
              )}+trailer`,
            }}
            startInLoadingState
          />
        </View>
      </Modal>
    </ScrollView>
  );
};

export default MovieDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  poster: {
    height: 350,
    justifyContent: 'space-between',
    padding: 20,
  },
  topBar: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsCard: {
    backgroundColor: '#1e1e1e',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -40,
    padding: 20,
  },
  movieTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#ccc',
    marginTop: 4,
    fontSize: 13,
  },
  trailerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  trailerText: {
    color: '#fff',
    marginRight: 6,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 22,
  },
  infoBlock: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    color: '#aaa',
    fontSize: 13,
  },
  infoText: {
    color: '#fff',
    fontWeight: '600',
    marginTop: 2,
  },
  langText: {
    color: '#ccc',
    marginTop: 16,
    fontSize: 13,
  },
  divider: {
    height: 1,
    backgroundColor: '#444',
    marginVertical: 20,
  },
  storyLabel: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 6,
  },
  plotText: {
    color: '#ccc',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 20,
  },
  castAvatar: {
    alignItems: 'center',
    marginRight: 12,
  },
  castName: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 4,
  },
  bookBtn: {
    backgroundColor: '#EB2F3D',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 30,
  },
  bookText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#222',
    padding: 10,
    alignItems: 'flex-end',
  },
});
